import { College, PrismaClient, User, TransactionItem, TransactionHistory, MenuItem } from '@prisma/client'

import { Request, Response } from 'express'

interface FrontTransactionItem {
  itemCost: number
  orderStatus: string
  menuItemId: number
  name: string
  id: number
  user: string
}

interface FrontTransactionHistory {
  id: number
  college: string
  inProgress: string
  price: number
  userId: number
  paymentIntentId: string
  transactionItems: FrontTransactionItem[]
  creationTime: Date
}

const prisma = new PrismaClient()

export const backToFrontTransactionHistories = async (
  transactionHistories: TransactionHistory[],
  college: string
): Promise<FrontTransactionHistory[]> => {
  const res: FrontTransactionHistory[] = []
  for (const item of transactionHistories) {
    const user: User = await getUserFromId(item.userId)
    const th: TransactionHistory & { transaction_items: TransactionItem[] } = await getTransactionHistoryFromId(item.id)
    const tis: FrontTransactionItem[] = await backToFrontTransactionItems(th)
    if (item) {
      const newItem: FrontTransactionHistory = {
        id: item.id,
        college: college,
        inProgress: item.in_progress,
        price: item.total_price,
        userId: user.id,
        paymentIntentId: item.payment_intent_id,
        creationTime: item.created_at,
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

    const validTransactionHistories = await prisma.transactionHistory.findMany({
      where: {
        collegeId: college.id,
        created_at: {
          gte: date,
        },
      },
      include: {
        transaction_items: true,
      },
    })

    const frontValidTransactionHisotries = await backToFrontTransactionHistories(
      validTransactionHistories,
      college.college
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

    const validTransactionHistories = await prisma.transactionHistory.findMany({
      where: {
        collegeId: college.id,
      },
      include: {
        transaction_items: true,
      },
    })

    const frontValidTransactionHisotries = await backToFrontTransactionHistories(
      validTransactionHistories,
      college.college
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
      college: name,
    },
  })
  return college
}

export const getUserFromId = async (id: number): Promise<User> => {
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

const backToFrontTransactionItems = async (
  transactionHistory: TransactionHistory & { transaction_items: TransactionItem[] }
): Promise<FrontTransactionItem[]> => {
  const transactionItems: FrontTransactionItem[] = []
  for (const item of transactionHistory.transaction_items) {
    const menuItem = await getMenuItemFromId(item.menuItemId)
    const user = await getUserFromId(transactionHistory.userId)
    if (item) {
      const newItem: FrontTransactionItem = {
        itemCost: item.item_cost,
        orderStatus: item.order_status,
        menuItemId: item.menuItemId,
        name: menuItem.item,
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
      college: college.college,
      inProgress: transactionHistory.in_progress,
      price: transactionHistory.total_price,
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
    const transaction_items: FrontTransactionItem[] = req.body.transactionItems
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
    const newTransaction = await prisma.transactionHistory.create({
      data: {
        order_complete: null,
        order_placed: order_placed,
        queue_size_on_complete: null,
        queue_size_on_placement: queue_size_on_placement,
        in_progress: in_progress,
        total_price: total_price,
        payment_intent_id: payment_intent_id,
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
        transaction_items: {
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

export async function updateTransactionHistoryInner(req: any): Promise<TransactionHistory> {
  console.log('nnnnnnn', req.body)
  try {
    const transactionHistory = await prisma.transactionHistory.update({
      where: {
        id: req.body.id,
      },
      data: {
        order_complete: req.body.order_complete || undefined,
        order_placed: req.body.order_placed || undefined,
        queue_size_on_complete: req.body.queue_size_on_complete || undefined,
        queue_size_on_placement: req.body.queue_size_on_placement || undefined,
        in_progress: req.body.in_progress || undefined,
        total_price: req.body.total_price || undefined,
        charged_price: req.body.charged_price || undefined,
      },
    })
    return transactionHistory
  } catch (e) {
    console.log(e)
  }
}

export async function updateTransactionHistory(req: Request, res: Response): Promise<void> {
  try {
    const transactionHistory = await prisma.transactionHistory.update({
      where: {
        id: req.body.id,
      },
      data: {
        order_complete: req.body.order_complete || undefined,
        order_placed: req.body.order_placed || undefined,
        queue_size_on_complete: req.body.queue_size_on_complete || undefined,
        queue_size_on_placement: req.body.queue_size_on_placement || undefined,
        in_progress: req.body.in_progress || undefined,
        total_price: req.body.total_price || undefined,
        charged_price: req.body.charged_price || undefined,
      },
    })
    res.send(JSON.stringify(transactionHistory))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateTransactionItem(req: Request, res: Response): Promise<void> {
  try {
    const transactionItem = await prisma.transactionItem.update({
      where: {
        id: req.body.id,
      },
      data: {
        order_status: req.body.orderStatus,
      },
    })
    res.send(JSON.stringify(transactionItem))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const includeProperty = {
  include: {
    transaction_items: true,
    college: true,
    user: true,
  },
}
