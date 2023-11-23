import type { OrderItem, Order } from '@prisma/client'
import { OrderStatus } from '@prisma/client'
import type { Request, Response } from 'express'
import type { ExpoPushTicket } from 'expo-server-sdk'
import { Expo } from 'expo-server-sdk'
import prisma from '@src/prismaClient'
import HTTPError from '@src/utils/httpError'
import type { SubscribePushNotificationsBody } from '@src/utils/bodyTypes'
// import Stripe from 'stripe'

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
  id: number
  order_complete: Date
  status: OrderStatus
  charged_price: number
}): Promise<Order> {
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
  if (res == null) throw new HTTPError(`No order found with id ${id}`, 404)
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

const checkItems = (items: OrderItem[], order: Order): OrderStatus => {
  const orderLifetime = Math.abs(new Date().getTime() - order.createdAt.getTime()) / 36e5
  if (items.every((i) => i.status === 'CANCELLED')) {
    console.log('Order cancelled :(')
    return OrderStatus.CANCELLED
  } else if (orderLifetime > 6) {
    console.log('Order timed out')
    return OrderStatus.TIMEOUT
  } else if (items.every((i) => i.status === 'CANCELLED' || i.status === 'READY')) {
    console.log('order complete')
    return OrderStatus.READY
  } else {
    return OrderStatus.ONGOING
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
    const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
    tickets.push(...ticketChunk)
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
  const requestBody = req.body as SubscribePushNotificationsBody
  const token = requestBody.pushToken

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

  async function checkAndUpdateOrder (transactionId: number, token?: string): Promise<void> {
    const items = await getItems(requestBody.transactionId)
    const orderStatus = checkItems(items, await getOrderFromId(requestBody.transactionId))

    if (orderStatus === OrderStatus.READY) {
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
        id: requestBody.transactionId,
        order_complete: new Date(),
        status: 'READY',
        charged_price: price
      })
      // const pii = await getPaymentIntentIdFromId(requestBody.transactionId)
      // await stripe.paymentIntents.capture(pii, {
      //   amount_to_capture: price,
      // })
    } else if (orderStatus === OrderStatus.CANCELLED || orderStatus === OrderStatus.TIMEOUT) {
      clearInterval(interval)
      if (orderStatus === OrderStatus.CANCELLED && (token != null)) {
        sendNotification(token, messageCancelled).catch(e => { throw e })
      }
      await updateOrderInner({
        id: requestBody.transactionId,
        order_complete: new Date(),
        status: 'CANCELLED',
        charged_price: 0
      })
      // stripe.paymentIntents.cancel(await getPaymentIntentIdFromId(requestBody.transactionId))
    }
  }

  const interval = setInterval(() => {
    checkAndUpdateOrder(requestBody.transactionId, token)
      .catch(e => {
        console.error('Error in interval:', e)
        clearInterval(interval)
      })
  }, 5000)

  res.json('Exited order function')
}
