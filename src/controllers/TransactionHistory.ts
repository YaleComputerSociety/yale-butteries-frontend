import { Request, Response } from 'express'

import { College, PrismaClient, User, OrderItem, Order, MenuItem } from '@prisma/client'
import { OrderItemDto, OrderDto } from '../utils/dtos'

const prisma = new PrismaClient()

export const backToFrontTransactionHistories = async (
  transactionHistories: Order[],
  college: string
): Promise<OrderDto[]> => {
  const res: OrderDto[] = []
  for (const item of transactionHistories) {
    const user: User = await getUserFromId(item.userId)
    const th: Order & { orderItems: OrderItem[] } = await getTransactionHistoryFromId(item.id)
    const tis: OrderItemDto[] = await backToFrontTransactionItems(th)
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

// returns all transactionHistories of a specific college within the last 6 hours
export async function getRecentCollegeTransactionHistories(req: Request, res: Response): Promise<void> {
  try {
    const college = await getCollegeFromName(req.params.college)
    const date = new Date(Date.now() - 36e5 * 6) // select only transactions from after 6 hours before this moment

    const validTransactionHistories = await prisma.order.findMany({
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

    const frontValidTransactionHisotries = await backToFrontTransactionHistories(
      validTransactionHistories,
      college.name
    )

    const ret = {
      transactionHistories: frontValidTransactionHisotries,
    }

    res.send(JSON.stringify(ret))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

// returns all of the transaction histories along with their items
// used for the staff payments screen
// will probably not be able to do this once there are enough orders...
export async function getAllCollegeTransactionHistories(req: Request, res: Response): Promise<void> {
  try {
    const college = await getCollegeFromName(req.params.college)

    const validTransactionHistories = await prisma.order.findMany({
      where: {
        collegeId: college.id,
      },
      include: {
        orderItems: true,
      },
    })

    const frontValidTransactionHisotries = await backToFrontTransactionHistories(
      validTransactionHistories,
      college.name
    )

    const ret = {
      transactionHistories: frontValidTransactionHisotries,
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

const getTransactionHistoryFromId = async (id: number): Promise<Order & { orderItems: OrderItem[] }> => {
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

const backToFrontTransactionItems = async (
  transactionHistory: Order & { orderItems: OrderItem[] }
): Promise<OrderItemDto[]> => {
  const transactionItems: OrderItemDto[] = []
  for (const item of transactionHistory.orderItems) {
    const menuItem = await getMenuItemFromId(item.menuItemId)
    const user = await getUserFromId(transactionHistory.userId)
    if (item) {
      const newItem: OrderItemDto = {
        itemCost: item.price,
        orderStatus: item.status,
        menuItemId: item.menuItemId,
        name: menuItem.name,
        id: item.id,
        user: user.name,
      }
      transactionItems.push(newItem)
    }
  }
  return transactionItems
}

export async function getTransactionHistory(req: Request, res: Response): Promise<void> {
  try {
    const transactionHistory = await getTransactionHistoryFromId(parseInt(req.params.transactionId))
    const college = await getCollegeFromId(transactionHistory.collegeId)
    const user = await getUserFromId(transactionHistory.userId)
    const transactionItems = await backToFrontTransactionItems(transactionHistory)

    const ret = {
      id: transactionHistory.id,
      college: college.name,
      inProgress: transactionHistory.status,
      price: transactionHistory.price,
      userId: user.id,
      transactionItems: transactionItems,
    }

    res.send(JSON.stringify(ret))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export async function createTransactionHistory(req: Request, res: Response): Promise<void> {
  try {
    const order_placed = new Date()
    const in_progress = req.body.inProgress
    const total_price = parseInt(req.body.price)
    const payment_intent_id = req.body.paymentIntentId
    const college = await getCollegeFromName(req.body.college)
    if (!college) throw "Sorry, that college doesn't work"
    const college_id = college.id
    const queue_size_on_placement = 0 // change later, not super necessary

    // make array of transaction items
    const transaction_items: OrderItemDto[] = req.body.transactionItems
    const transactionItems = []
    for (const item of transaction_items) {
      if (item) {
        const newItem = {
          item_cost: item.itemCost,
          order_status: item.orderStatus,
          menuItemId: item.menuItemId,
        }
        transactionItems.push(newItem)
      }
    }

    // store the transaction in the database
    const newTransaction = await prisma.order.create({
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
            data: transactionItems,
          },
        },
      },
    })

    const sendTransaction = {
      id: newTransaction.id,
      college: req.body.college,
      inProgress: req.body.inProgress,
      price: req.body.price,
      userId: req.body.userId,
      transactionItems: transactionItems,
    }
    res.send(JSON.stringify(sendTransaction))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export async function updateTransactionHistoryInner(req: any): Promise<Order> {
  try {
    const transactionHistory = await prisma.order.update({
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
    return transactionHistory
  } catch (e) {
    console.log(e)
  }
}

export async function updateTransactionHistory(req: Request, res: Response): Promise<void> {
  try {
    const transactionHistory = await prisma.order.update({
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
    res.send(JSON.stringify(transactionHistory))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateTransactionItem(req: Request, res: Response): Promise<void> {
  try {
    const transactionItem = await prisma.orderItem.update({
      where: {
        id: req.body.id,
      },
      data: {
        status: req.body.orderStatus,
      },
    })
    res.send(JSON.stringify(transactionItem))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}
