import { PrismaClient, TransactionItem, TransactionHistory } from '@prisma/client'
import { Request, Response } from 'express'
import { Expo } from 'expo-server-sdk'

// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
const prisma = new PrismaClient()
let orderCompleted = false

interface NotificationMessage {
  to: string
}

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

const checkItems = (items: TransactionItem[]) => {
  let complete = true
  for (let i = 0; i <= items.length - 1; i++) {
    console.log(i)
    console.log(items[i].order_status)
    if (items[i].order_status == 'CANCELLED' || items[i].order_status == 'FINISHED') {
      console.log('done!')
    } else {
      complete = false
    }
  }
  if (complete == true) {
    orderCompleted = true
    console.log('order complete, sending notification!')
  } else {
    orderCompleted = false
    console.log('waiting on order...')
  }
}
async function getItems(id: string) {
  return await (
    await getTransactionHistoryFromId(parseInt(id))
  ).transaction_items
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
    const message = {
      to: token,
      sound: 'default',
      body: 'Your order is ready for pick up!' + String.fromCodePoint(0x1f601),
      data: { withSome: 'data' },
    }
    const interval = setInterval(() => {
      getItems(req.body.transactionId).then((items) => checkItems(items))
      if (orderCompleted == true) {
        orderCompleted = false
        clearInterval(interval)
        //SEND NOTIFICATION
        sendNotification(token, message)
      }
    }, 5000)
    console.log('sent')
    res.send(JSON.stringify('blah!'))
  } catch (e) {
    res.status(400).send(e)
  }
}
