import { College, PrismaClient, User, TransactionItem, TransactionHistory } from '@prisma/client'

import { Request, Response } from 'express'
import { parse } from 'path'

interface FrontTransactionItem {
  itemCost: number
  orderStatus: string
  menuItemId: number
}

const prisma = new PrismaClient()

export async function getAllTransactionHistories(_req: Request, res: Response): Promise<void> {
  try {
    const transactionHistories = await prisma.transactionHistory.findMany(includeProperty)
    res.send(JSON.stringify(transactionHistories))
  } catch (e) {
    res.status(400).send(e)
  }
}

const getCollegeFromId = async (id: number): Promise<College> => {
  const college = await prisma.college.findUnique({
    where: {
      id: id,
    },
  })
  return college
}

const getUserFromId = async (id: number): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  })
  return user
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

const backToFrontTransactionItems = (
  transactionHistory: TransactionHistory & { transaction_items: TransactionItem[] }
): FrontTransactionItem[] => {
  const transactionItems = []
  for (const item of transactionHistory.transaction_items) {
    if (item) {
      const newItem = {
        item_cost: item.item_cost,
        order_status: item.order_status,
        menuItemId: item.menuItemId,
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
    const transactionItems = backToFrontTransactionItems(transactionHistory)

    const ret = {
      id: transactionHistory.id,
      college: college.college,
      inProgress: transactionHistory.in_progress,
      price: transactionHistory.total_price,
      netId: user.netid,
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
    const getUser = await prisma.user.findUnique({
      where: {
        netid: req.body.netId,
      },
    })
    if (!getUser) throw "Couldn't find user, try restarting the app and logging in again"

    const user_id = getUser.id

    const getCollege = await prisma.college.findUnique({
      where: {
        college: req.body.college,
      },
    })
    if (!getCollege) throw "Sorry, that college doesn't work"
    const college_id = getCollege.id
    // const getMetadata = await prisma.butteryMetaData.findUnique({
    //   where: {
    //     collegeId: college_id,
    //   },
    // })
    // console.log(getMetadata)
    // const queue_size_on_placement = getMetadata.reserved_queue_spots
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
            id: user_id,
          },
        },
        transaction_items: {
          createMany: {
            data: transactionItems,
          },
        },
      },
    })
    //   id: number
    // college: string
    // inProgress: 'false' | 'true' | 'cancelled'
    // price: number
    // netId: string
    // paymentIntentId: string
    // transactionItems: TransactionItem[]

    const sendTransaction = {
      id: newTransaction.id,
      college: req.body.college,
      inProgress: req.body.inProgress,
      price: req.body.price,
      netId: req.body.netId,
      transactionItems: transactionItems,
    }
    res.send(JSON.stringify(sendTransaction))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
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
      },
    })
    res.send(JSON.stringify(transactionHistory))
  } catch (e) {
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
