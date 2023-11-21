import type { OrderItem, Order, OrderStatus } from '@prisma/client'
import type { Request, Response } from 'express'
import type { ExpoPushTicket } from 'expo-server-sdk'
import { Expo } from 'expo-server-sdk'
import prisma from '@src/prismaClient'
// import Stripe from 'stripe'

enum Status {
  Incomplete,
  Complete,
  Cancelled,
  TimedOut,
}

interface NotificationMessage {
  to: string
}

// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
// const environment = process.env.NODE_ENV ?? 'development'

// export const stripe = new Stripe(
//   environment === 'development' ? process.env.STRIPE_SECRET_KEY_DEV : process.env.STRIPE_SECRET_KEY_PROD,
//   {
//     apiVersion: '2020-08-27',
//   }
// )

async function updateOrderInner (orderData: {
  id: number // Consider using a more specific type instead of 'any'
  order_complete: Date
  status: OrderStatus
  charged_price: number
}): Promise<Order> {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderData.id
      },
      data: {
        status: orderData.status,
        price: orderData.charged_price,
        readyAt: orderData.order_complete
      }
    })
    return order
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getOrderFromId = async (id: number): Promise<Order & { orderItems: OrderItem[] }> => {
  const res = await prisma.order.findUnique({
    include: {
      orderItems: true
    },
    where: {
      id
    }
  })
  if (res === null) throw new Error(`No order found with id ${id}`)
  return res
}

// const getPaymentIntentIdFromId = async (id: number): Promise<string> => {
//   const res = await prisma.order.findUnique({
//     where: {
//       id: id,
//     },
//   })
//   return res.paymentIntentId
// }

const checkItems = (items: OrderItem[], order: Order): number => {
  const orderLifetime = Math.abs(new Date().getTime() - order.createdAt.getTime()) / 36e5
  if (items.every((i) => i.status === 'CANCELLED')) {
    console.log('Order cancelled :(')
    return Status.Cancelled
  } else if (orderLifetime > 6) {
    console.log('Order timed out')
    return Status.TimedOut
  } else if (items.every((i) => i.status === 'CANCELLED' || i.status === 'READY')) {
    console.log('order complete')
    return Status.Complete
  } else {
    return Status.Incomplete
  }
}

async function getItems (id: number): Promise<OrderItem[]> {
  const order = await getOrderFromId(id)
  return order.orderItems
}

const sendNotification = async (expoPushToken: string, data: NotificationMessage): Promise<string> => {
  const expo = new Expo({ accessToken: process.env.ACCESS_TOKEN })

  const chunks = expo.chunkPushNotifications([{ ...data, to: expoPushToken }])
  const tickets: ExpoPushTicket[] = []

  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
      tickets.push(...ticketChunk)
    } catch (error) {
      console.error(error)
    }
  }

  let response = ''

  for (const ticket of tickets) {
    if (ticket.status === 'error') {
      if ((ticket.details != null) && ticket.details.error === 'DeviceNotRegistered') {
        response = 'DeviceNotRegistered'
      }
    }

    if (ticket.status === 'ok') {
      response = ticket.id
    }
  }

  return response
}

export async function subscribePushNotifications (req: Request, res: Response): Promise<void> {
  try {
    const token = req.body.pushToken

    const messageComplete = {
      to: token,
      sound: 'default',
      body: 'Your order is ready for pick up!  ' + String.fromCodePoint(0x1f601),
      data: { withSome: 'data' }
    }

    const messageCancelled = {
      to: token,
      sound: 'default',
      body: 'Your order was cancelled',
      data: { withSome: 'data' }
    }

    async function checkAndUpdateOrder (transactionId: string, token?: string): Promise<void> {
      const items = await getItems(parseInt(req.body.transactionId))
      const orderStatus = checkItems(items, await getOrderFromId(req.body.transactionId))

      if (orderStatus === Status.Complete) {
        let price = 0
        items.forEach((i) => {
          if (i.status === 'READY') {
            price += i.price
          }
        })

        clearInterval(interval)

        if (token != null) {
          sendNotification(token, messageComplete).catch(e => { throw e })
        }

        await updateOrderInner({
          id: req.body.transactionId,
          order_complete: new Date(),
          status: 'READY',
          charged_price: price
        })
        // const pii = await getPaymentIntentIdFromId(req.body.transactionId)
        // await stripe.paymentIntents.capture(pii, {
        //   amount_to_capture: price,
        // })
      } else if (orderStatus === Status.Cancelled || orderStatus === Status.TimedOut) {
        clearInterval(interval)
        if (orderStatus === Status.Cancelled && (token != null)) {
          sendNotification(token, messageCancelled).catch(e => { throw e })
        }
        await updateOrderInner({
          id: req.body.transactionId,
          order_complete: new Date(),
          status: 'CANCELLED',
          charged_price: 0
        })
        // stripe.paymentIntents.cancel(await getPaymentIntentIdFromId(req.body.transactionId))
      }
    }

    const interval = setInterval(() => {
      checkAndUpdateOrder(req.body.transactionId, token)
        .catch(e => {
          console.error('Error in interval:', e)
          clearInterval(interval)
        })
    }, 5000)

    res.send(JSON.stringify('exited order function'))
  } catch (e) {
    res.status(400).send(e)
  }
}
