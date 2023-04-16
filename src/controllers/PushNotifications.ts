import { PrismaClient, TransactionItem, TransactionHistory } from '@prisma/client'
import { Request, Response } from 'express'
import { Expo } from 'expo-server-sdk'
import { updateTransactionHistoryInner } from './TransactionHistory'
import Stripe from 'stripe'

enum Status {
  Incomplete,
  Complete,
  Cancelled,
}

interface NotificationMessage {
  to: string
}

// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
})

const getTransactionHistoryFromId = async (
  id: number
): Promise<TransactionHistory & { transaction_items: TransactionItem[] }> => {
  const res = await prisma.transactionHistory.findUnique({
    include: {
      transaction_items: true,
    },
    where: {
      id: id,
    },
  })
  return res
}

const getPaymentIntentIdFromId = async (id: number): Promise<string> => {
  const res = await prisma.transactionHistory.findUnique({
    where: {
      id: id,
    },
  })
  return res.payment_intent_id
}

const checkItems = (items: TransactionItem[], transactionHistory: TransactionHistory): number => {
  const transactionLifetime = Math.abs(new Date().getTime() - transactionHistory.order_placed.getTime()) / 36e5
  if (transactionLifetime > 6 || items.every((i) => i.order_status === 'CANCELLED')) {
    console.log('Order Cancelled :(')
    return Status.Cancelled
  } else if (items.every((i) => i.order_status === 'CANCELLED' || i.order_status === 'FINISHED')) {
    console.log('order complete, sending notification!')
    return Status.Complete
  } else {
    console.log('waiting on order...')
    return Status.Incomplete
  }
  return 0
}
async function getItems(id: string) {
  return (await getTransactionHistoryFromId(parseInt(id))).transaction_items
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
      const orderStatus = checkItems(items, await getTransactionHistoryFromId(req.body.transactionId))

      console.log(orderStatus)
      if (orderStatus === Status.Complete) {
        let price = 0
        items.forEach((i) => {
          if (i.order_status === 'FINISHED') {
            price += i.item_cost
          }
        })

        clearInterval(interval)
        sendNotification(token, messageComplete)
        updateTransactionHistoryInner({
          body: {
            id: req.body.transactionId,
            order_complete: new Date(),
            in_progress: 'false',
            charged_price: price,
          },
        })
        console.log(1, req.body)
        const pii = await getPaymentIntentIdFromId(req.body.transactionId)
        await stripe.paymentIntents.capture(pii, {
          amount_to_capture: price,
        })
      } else if (orderStatus === Status.Cancelled) {
        clearInterval(interval)
        sendNotification(token, messageCancelled)
        updateTransactionHistoryInner({
          body: {
            id: req.body.transactionId,
            order_complete: new Date(),
            in_progress: 'cancelled',
            charged_price: 0,
          },
        })
        console.log(2)
        stripe.paymentIntents.cancel(await getPaymentIntentIdFromId(req.body.transactionId))
      }
    }, 5000)
    console.log('sent')
    res.send(JSON.stringify('blah!'))
  } catch (e) {
    res.status(400).send(e)
  }
}
