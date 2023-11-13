import { PrismaClient, OrderItem, Order } from '@prisma/client'
import { Request, Response } from 'express'
import { Expo } from 'expo-server-sdk'
import { updateOrderInner } from './Orders'
import Stripe from 'stripe'

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
const environment = process.env.NODE_ENV || 'development'

const prisma = new PrismaClient()
export const stripe = new Stripe(
  environment === 'development' ? process.env.STRIPE_SECRET_KEY_DEV : process.env.STRIPE_SECRET_KEY_PROD,
  {
    apiVersion: '2020-08-27',
  }
)

const getOrderFromId = async (id: number): Promise<Order & { orderItems: OrderItem[] }> => {
  const res = await prisma.order.findUnique({
    include: {
      orderItems: true,
    },
    where: {
      id: id,
    },
  })
  return res
}

const getPaymentIntentIdFromId = async (id: number): Promise<string> => {
  const res = await prisma.order.findUnique({
    where: {
      id: id,
    },
  })
  return res.paymentIntentId
}

const checkItems = (items: OrderItem[], order: Order): number => {
  const orderLifetime = Math.abs(new Date().getTime() - order.placedAt.getTime()) / 36e5
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
async function getItems(id: string) {
  return (await getOrderFromId(parseInt(id))).orderItems
}

const sendNotification = async (expoPushToken: string, data: NotificationMessage) => {
  const expo = new Expo({ accessToken: process.env.ACCESS_TOKEN })

  const chunks = expo.chunkPushNotifications([{ to: expoPushToken, ...data }])
  const tickets = []

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
      if (ticket.details && ticket.details.error === 'DeviceNotRegistered') {
        response = 'DeviceNotRegistered'
      }
    }

    if (ticket.status === 'ok') {
      response = ticket.id
    }
  }

  return response
}

export async function subscribePushNotifications(req: Request, res: Response): Promise<void> {
  try {
    const token = req.body.pushToken

    const messageComplete = {
      to: token,
      sound: 'default',
      body: 'Your order is ready for pick up!  ' + String.fromCodePoint(0x1f601),
      data: { withSome: 'data' },
    }

    const messageCancelled = {
      to: token,
      sound: 'default',
      body: 'Your order was cancelled',
      data: { withSome: 'data' },
    }

    const interval = setInterval(async () => {
      const items = await getItems(req.body.transactionId)
      const orderStatus = checkItems(items, await getOrderFromId(req.body.transactionId))

      if (orderStatus === Status.Complete) {
        let price = 0
        items.forEach((i) => {
          if (i.status === 'READY') {
            price += i.price
          }
        })

        clearInterval(interval)

        if (token) {
          sendNotification(token, messageComplete)
        }

        updateOrderInner({
          body: {
            id: req.body.transactionId,
            order_complete: new Date(),
            in_progress: 'false',
            charged_price: price,
          },
        })
        const pii = await getPaymentIntentIdFromId(req.body.transactionId)
        await stripe.paymentIntents.capture(pii, {
          amount_to_capture: price,
        })
      } else if (orderStatus === Status.Cancelled || orderStatus === Status.TimedOut) {
        clearInterval(interval)
        if (orderStatus === Status.Cancelled && token) {
          sendNotification(token, messageCancelled)
        }
        updateOrderInner({
          body: {
            id: req.body.transactionId,
            order_complete: new Date(),
            in_progress: 'cancelled',
            charged_price: 0,
          },
        })
        stripe.paymentIntents.cancel(await getPaymentIntentIdFromId(req.body.transactionId))
      }
    }, 5000)
    res.send(JSON.stringify('exited order function'))
  } catch (e) {
    res.status(400).send(e)
  }
}
