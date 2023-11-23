import type { Request, Response } from 'express'

import prisma from '@src/prismaClient'
import type { OrderStatus } from '@prisma/client'
import { OrderItemStatus } from '@prisma/client'
import { formatOrder, formatOrderItem, formatOrders } from '@utils/dtoConverters'
import { getCollegeFromName, getOrderFromId, getOrderItemFromId, getUserFromId } from '@utils/prismaUtils'
import HTTPError from '@src/utils/httpError'
import { MILLISECONDS_UNTIL_ORDER_IS_EXPIRED } from '@src/utils/constants'
import type { CreateOrderBody, UpdateOrderBody, UpdateOrderItemBody } from '@src/utils/bodyTypes'

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
    userId: string
  }

  const requestBody: CreateOrderBody = req.body as CreateOrderBody

  const college = await getCollegeFromName(requestBody.college)

  // test is user exists
  // TODO test if user is the actual user sending the request
  await getUserFromId(requestBody.userId)

  // Get sanitized orderItems list
  const orderItems: NewOrderItem[] = []
  for (const item of requestBody.transactionItems) {
    orderItems.push({
      price: item.itemCost,
      status: OrderItemStatus.QUEUED,
      menuItemId: item.menuItemId,
      userId: requestBody.userId
    })
  }

  const order = await prisma.order.create({
    data: {
      status: 'QUEUED',
      price: requestBody.price,
      college: {
        connect: {
          id: college.id
        }
      },
      user: {
        connect: {
          id: requestBody.userId
        }
      },
      orderItems: {
        createMany: {
          data: orderItems
        }
      }
    },
    include: {
      orderItems: true
    }
  })

  const formattedOrder = await formatOrder(order)
  res.json(formattedOrder)
}

export async function updateOrderItem (req: Request, res: Response): Promise<void> {
  const requestBody: UpdateOrderItemBody = req.body as UpdateOrderItemBody

  // check that order item exists
  await getOrderItemFromId(parseInt(req.params.orderItemId))

  const orderItem = await prisma.orderItem.update({
    where: {
      id: parseInt(req.params.orderItemId)
    },
    data: {
      status: requestBody.orderStatus as OrderItemStatus
    }
  })

  if (orderItem === null) throw new HTTPError(`No order item found with ID ${req.params.orderItemId}`, 404)

  const formattedOrderItem = await formatOrderItem(orderItem)
  res.json(formattedOrderItem)
}

// This function is currently unused and probably doesn't work
export async function updateOrder (req: Request, res: Response): Promise<void> {
  const requestBody: UpdateOrderBody = req.body as UpdateOrderBody
  const order = await prisma.order.update({
    where: {
      id: parseInt(req.params.orderId)
    },
    data: {
      status: requestBody.in_progress as OrderStatus ?? undefined,
      price: requestBody.total_price ?? undefined,
      stripeFee: requestBody.stripe_fee ?? undefined
    },
    include: {
      orderItems: true
    }
  })
  const formattedOrder = await formatOrder(order)
  res.json(formattedOrder)
}
