import { Request, Response } from 'express'

import { College, User, OrderItem, Order, MenuItem } from '@prisma/client'
import { OrderItemDto, OrderDto } from '../utils/dtos'
import prisma from '../prismaClient'

export const backToFrontOrders = async (orders: Order[], college: string): Promise<OrderDto[]> => {
  const res: OrderDto[] = []
  for (const item of orders) {
    const user: User = await getUserFromId(item.userId)
    const th: Order & { orderItems: OrderItem[] } = await getOrderFromId(item.id)
    const tis: OrderItemDto[] = await backToFrontOrderItems(th)
    if (item) {
      const newItem: OrderDto = {
        id: item.id,
        college: college,
        inProgress: item.status,
        price: item.price,
        userId: user.id,
        paymentIntentId: item.paymentIntentId,
        creationTime: item.createdAt,
        transactionItems: tis,
      }
      res.push(newItem)
    }
  }
  return res
}

// returns all orders of a specific college within the last 6 hours
export async function getRecentOrdersFromCollege(req: Request, res: Response): Promise<void> {
  try {
    const college = await getCollegeFromName(req.params.college)
    const date = new Date(Date.now() - 36e5 * 6) // select only transactions from after 6 hours before this moment

    const validOrders = await prisma.order.findMany({
      where: {
        collegeId: college.id,
        createdAt: {
          gte: date,
        },
      },
      include: {
        orderItems: true,
      },
    })

    const frontValidOrders = await backToFrontOrders(validOrders, college.name)

    const ret = {
      transactionHistories: frontValidOrders,
    }

    res.send(JSON.stringify(ret))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

// returns all of the orders along with their items
// used for the staff payments screen
// will probably not be able to do this once there are enough orders...
export async function getAllOrdersFromCollege(req: Request, res: Response): Promise<void> {
  try {
    const college = await getCollegeFromName(req.params.college)

    const validOrders = await prisma.order.findMany({
      where: {
        collegeId: college.id,
      },
      include: {
        orderItems: true,
      },
    })

    const frontValidOrders = await backToFrontOrders(validOrders, college.name)

    const ret = {
      transactionHistories: frontValidOrders,
    }

    res.send(JSON.stringify(ret))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const getCollegeFromId = async (id: number): Promise<College> => {
  const college = await prisma.college.findUnique({
    where: {
      id: id,
    },
  })
  return college
}

export const getCollegeFromName = async (name: string): Promise<College> => {
  const college = await prisma.college.findFirst({
    where: {
      name: name,
    },
  })
  return college
}

export const getUserFromId = async (id: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  })
  return user
}

const getMenuItemFromId = async (id: number): Promise<MenuItem> => {
  const item = await prisma.menuItem.findUnique({
    where: {
      id: id,
    },
  })
  return item
}

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

const backToFrontOrderItems = async (order: Order & { orderItems: OrderItem[] }): Promise<OrderItemDto[]> => {
  const orderItems: OrderItemDto[] = []
  for (const item of order.orderItems) {
    const menuItem = await getMenuItemFromId(item.menuItemId)
    const user = await getUserFromId(order.userId)
    if (item) {
      const newItem: OrderItemDto = {
        itemCost: item.price,
        orderStatus: item.status,
        menuItemId: item.menuItemId,
        name: menuItem.name,
        id: item.id,
        user: user.name,
      }
      orderItems.push(newItem)
    }
  }
  return orderItems
}

export async function getOrder(req: Request, res: Response): Promise<void> {
  try {
    const order = await getOrderFromId(parseInt(req.params.transactionId))
    const college = await getCollegeFromId(order.collegeId)
    const user = await getUserFromId(order.userId)
    const orderItems = await backToFrontOrderItems(order)

    const ret = {
      id: order.id,
      college: college.name,
      inProgress: order.status,
      price: order.price,
      userId: user.id,
      transactionItems: orderItems,
    }

    res.send(JSON.stringify(ret))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export async function createOrder(req: Request, res: Response): Promise<void> {
  try {
    const order_placed = new Date()
    // const in_progress = req.body.inProgress
    const total_price = parseInt(req.body.price)
    const payment_intent_id = req.body.paymentIntentId
    const college = await getCollegeFromName(req.body.college)
    if (!college) throw "Sorry, that college doesn't work"
    const college_id = college.id
    const queue_size_on_placement = 0 // change later, not super necessary

    const inputOrderItems: OrderItemDto[] = req.body.transactionItems
    const orderItems = []
    for (const item of inputOrderItems) {
      if (item) {
        const newItem = {
          item_cost: item.itemCost,
          order_status: item.orderStatus,
          menuItemId: item.menuItemId,
        }
        orderItems.push(newItem)
      }
    }

    // store the transaction in the database
    const newOrder = await prisma.order.create({
      data: {
        status: 'QUEUED',
        placedAt: order_placed,
        endQueueSize: null,
        initialQueueSize: queue_size_on_placement,
        price: total_price,
        paymentIntentId: payment_intent_id,
        college: {
          connect: {
            id: college_id,
          },
        },
        user: {
          connect: {
            id: req.body.userId,
          },
        },
        orderItems: {
          createMany: {
            data: orderItems,
          },
        },
      },
    })

    const sendOrder = {
      id: newOrder.id,
      college: req.body.college,
      inProgress: req.body.inProgress,
      price: req.body.price,
      userId: req.body.userId,
      transactionItems: orderItems,
    }
    res.send(JSON.stringify(sendOrder))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export async function updateOrderInner(req: any): Promise<Order> {
  try {
    const order = await prisma.order.update({
      where: {
        id: req.body.id,
      },
      data: {
        placedAt: req.body.order_placed || undefined,
        status: req.body.in_progress || undefined,
        price: req.body.total_price || undefined,
        stripeFee: req.body.stripe_fee || undefined,
      },
    })
    return order
  } catch (e) {
    console.log(e)
  }
}

export async function updateOrder(req: Request, res: Response): Promise<void> {
  try {
    const order = await prisma.order.update({
      where: {
        id: req.body.id,
      },
      data: {
        placedAt: req.body.order_placed || undefined,
        status: req.body.in_progress || undefined,
        price: req.body.total_price || undefined,
        stripeFee: req.body.stripe_fee || undefined,
      },
    })
    res.send(JSON.stringify(order))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateOrderItem(req: Request, res: Response): Promise<void> {
  try {
    const orderItem = await prisma.orderItem.update({
      where: {
        id: req.body.id,
      },
      data: {
        status: req.body.orderStatus,
      },
    })
    res.send(JSON.stringify(orderItem))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}
