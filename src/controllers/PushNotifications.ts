import type { Request, Response } from 'express'
// import type { ExpoPushTicket } from 'expo-server-sdk'
import { Expo } from 'expo-server-sdk'

import type { OrderItem, Order } from '@prisma/client'
import { OrderStatus } from '@prisma/client'
import type { SubscribePushNotificationsBody } from '@utils/bodyTypes'
import { getOrderFromId, updateOrderInternal } from '@utils/prismaUtils'
import { MILLISECONDS_UNTIL_ORDER_IS_EXPIRED } from '@src/utils/constants'
// import { stripe } from '@src/config/stripe'

// { accessToken: process.env.EXPO_ACCESS_TOKEN }
const expo = new Expo()

// TODO: merge this whole function into createOrder
// start a checker to go off every 5 seconds, where if all order items are handled, send a push notification and pay for the order
export async function createPushNotifications (req: Request, res: Response): Promise<void> {
  const requestBody = req.body as SubscribePushNotificationsBody

  const interval = setInterval(() => {
    checkAndUpdateOrder(requestBody.transactionId, interval, requestBody.pushToken)
      .catch(e => {
        console.error('Error in interval: ', e)
        clearInterval(interval)
      })
  }, 5000)

  res.json('Ongoing order function has been exited')
}

// TODO: put the update order part of this function into the updateOrderItem function instead of here, and then only check the order status in this function
async function checkAndUpdateOrder (transactionId: number, interval: NodeJS.Timer, token?: string): Promise<void> {
  const order = await getOrderFromId(transactionId)
  const items = order.orderItems

  // This is the part that should be merged into updateOrderItem
  const orderStatus = checkItems(items, order)

  if (orderStatus === OrderStatus.READY) {
    console.log('ready')
    clearInterval(interval)

    const price = items.reduce((total, item) => {
      return item.status === 'READY' ? total + item.price : total
    }, 0)

    await updateOrderInternal({
      id: transactionId,
      readyAt: new Date(),
      status: 'READY',
      price
    })

    console.log('check')
    if (token != null) {
      console.log('hye')
      sendNotification(token, true).then((s) => { console.log('sent the notification: ', s) }).catch(e => { throw e })
    }

    // const pii = await getPaymentIntentIdFromId(requestBody.transactionId)
    // await stripe.paymentIntents.capture(pii, {
    //   amount_to_capture: price,
    // })
  } else if (orderStatus === OrderStatus.CANCELLED || orderStatus === OrderStatus.TIMEOUT) {
    console.log('failed')
    clearInterval(interval)

    if (orderStatus === OrderStatus.CANCELLED && (token != null)) {
      sendNotification(token, false).catch(e => { throw e })
    }

    await updateOrderInternal({
      id: transactionId,
      readyAt: new Date(),
      status: 'CANCELLED',
      price: 0
    })

    // stripe.paymentIntents.cancel(await getPaymentIntentIdFromId(requestBody.transactionId))
  }
}

// const getPaymentIntentIdFromId = async (id: number): Promise<string> => {
//   const res = await prisma.order.findUnique({
//     where: {
//       id: id,
//     },
//   })
//   return res.paymentIntentId
// }

// checks if all orderItems collectively have been handled, and if so return the order's status
// TODO: this should happen during updateOrderItem, not here
const checkItems = (items: OrderItem[], order: Order): OrderStatus => {
  const orderLifetime = Math.abs(new Date().getTime() - order.createdAt.getTime())
  if (items.every((i) => i.status === 'CANCELLED')) {
    console.log('Order cancelled :(')
    return OrderStatus.CANCELLED
  } else if (orderLifetime > MILLISECONDS_UNTIL_ORDER_IS_EXPIRED) {
    console.log('Order timed out')
    return OrderStatus.TIMEOUT
  } else if (items.every((i) => i.status === 'CANCELLED' || i.status === 'READY')) {
    console.log('order complete')
    return OrderStatus.READY
  } else {
    return OrderStatus.ONGOING
  }
}

const sendNotification = async (expoPushToken: string, isSuccessful: boolean): Promise<string> => {
  console.log('trying to send')
  const message = {
    to: expoPushToken,
    sound: 'default' as const,
    body: isSuccessful ? `Your order is ready for pickup!  ${String.fromCodePoint(0x1f601)}` : 'Your order was cancelled',
    data: { withSome: 'data' }
  }
  console.log('token: ', expoPushToken)

  try {
    const ticket = await expo.sendPushNotificationsAsync([message])
    console.log(ticket)
  } catch (error) {
    console.error(error)
  }

  // const chunks = expo.chunkPushNotifications([{ ...message }])
  // const tickets: ExpoPushTicket[] = []

  // for (const chunk of chunks) {
  //   const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
  //   tickets.push(...ticketChunk)
  // }

  // let response = ''

  // for (const ticket of tickets) {
  //   if (ticket.status === 'error') {
  //     if ((ticket.details != null) && ticket.details.error === 'DeviceNotRegistered') {
  //       response = 'DeviceNotRegistered'
  //     }
  //   }

  //   if (ticket.status === 'ok') {
  //     response = ticket.id
  //   }
  // }

  // return response
  return 'hey'
}
