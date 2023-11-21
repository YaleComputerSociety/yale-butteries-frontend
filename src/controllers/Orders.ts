import type { Request, Response } from 'express'

import prisma from '@src/prismaClient'
import { OrderItemStatus } from '@prisma/client'
import type { OrderItemDto } from '@utils/dtos'
import { formatOrder, formatOrders } from '@utils/dtoConverters'
import { getCollegeFromName, getOrderFromId, isOrderItemStatus } from '@utils/prismaUtils'

const MILLISECONDS_UNTIL_ORDER_IS_EXPIRED = 3600000 * 6

export async function getOrder (req: Request, res: Response): Promise<void> {
  const order = await getOrderFromId(parseInt(req.params.orderId))
  console.log(order)
  const formattedOrder = await formatOrder(order)
  res.json(formattedOrder)
}

export async function getAllOrdersFromCollege (req: Request, res: Response): Promise<void> {
  const college = await getCollegeFromName(req.params.collegeName)

  const orders = await prisma.order.findMany({
    where: {
      collegeId: college.id
    },
    include: {
      orderItems: true
    }
  })

  const formattedOrders = await formatOrders(orders, college.name)
  res.json({ transactionHistories: formattedOrders })
}

// returns all orders of a specific college within the last 6 hours
export async function getRecentOrdersFromCollege (req: Request, res: Response): Promise<void> {
  const college = await getCollegeFromName(req.params.collegeName)
  const orderExpirationTime = new Date(Date.now() - MILLISECONDS_UNTIL_ORDER_IS_EXPIRED)

  const orders = await prisma.order.findMany({
    where: {
      collegeId: college.id,
      createdAt: {
        gte: orderExpirationTime
      }
    },
    include: {
      orderItems: true
    }
  })

  const formattedOrders = await formatOrders(orders, college.name)
  res.json({ transactionHistories: formattedOrders })
}

export async function createOrder (req: Request, res: Response): Promise<void> {
  interface NewOrderItem {
    price: number
    status: OrderItemStatus
    menuItemId: number
  }
  try {
    const totalPrice = parseInt(req.body.price)
    const college = await getCollegeFromName(req.body.college)
    const collegeId = college.id

    const inputOrderItems: OrderItemDto[] = req.body.transactionItems
    const orderItems: NewOrderItem[] = []
    for (const item of inputOrderItems) {
      const newItem: NewOrderItem = {
        price: item.itemCost,
        status: OrderItemStatus.QUEUED,
        menuItemId: item.menuItemId
      }
      orderItems.push(newItem)
    }

    // store the transaction in the database
    const newOrder = await prisma.order.create({
      data: {
        status: 'QUEUED',
        price: totalPrice,
        college: {
          connect: {
            id: collegeId
          }
        },
        user: {
          connect: {
            id: req.body.userId
          }
        },
        orderItems: {
          createMany: {
            data: orderItems
          }
        }
      }
    })

    const sendOrder = {
      id: newOrder.id,
      college: req.body.college,
      inProgress: req.body.inProgress,
      price: req.body.price,
      userId: req.body.userId,
      transactionItems: orderItems
    }
    res.send(JSON.stringify(sendOrder))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export async function updateOrder (req: Request, res: Response): Promise<void> {
  try {
    const order = await prisma.order.update({
      where: {
        id: req.body.id
      },
      data: {
        status: typeof req.body.in_progress !== 'undefined' ? req.body.in_progress : undefined,
        price: typeof req.body.total_price !== 'undefined' ? req.body.total_price : undefined,
        stripeFee: typeof req.body.stripe_fee !== 'undefined' ? req.body.stripe_fee : undefined
      }
    })
    res.send(JSON.stringify(order))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateOrderItem (req: Request, res: Response): Promise<void> {
  try {
    if (!isOrderItemStatus(req.body.orderStatus)) {
      res.status(400).send('malformed status')
      return
    }

    const orderItem = await prisma.orderItem.update({
      where: {
        id: parseInt(req.params.orderItemId)
      },
      data: {
        status: req.body.orderStatus
      }
    })
    res.send(JSON.stringify(orderItem))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}
