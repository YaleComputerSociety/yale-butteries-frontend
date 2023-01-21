import { PrismaClient } from '@prisma/client'

import { Request, Response } from 'express'
// import { create } from 'domain'

const prisma = new PrismaClient()

export interface TransactionItem {
  id: number
  itemCost: number
  orderStatus: 'cancelled' | 'queued' | 'in_progress' | 'complete'
  menuItemId: number
  transactionHistoryId: number
}

export async function getAllTransactionHistories(_req: Request, res: Response): Promise<void> {
  try {
    const transactionHistories = await prisma.transactionHistory.findMany(includeProperty)
    res.send(JSON.stringify(transactionHistories))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getTransactionHistory(req: Request, res: Response): Promise<void> {
  try {
    const transactionHistory = await prisma.transactionHistory.findUnique({
      ...includeProperty,
      where: {
        id: parseInt(req.params.transactionId),
      },
    })
    res.send(JSON.stringify(transactionHistory))
  } catch (e) {
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

    console.log(req.body.college)
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
    const transaction_items = req.body.transactionItems
    const transactionItems = []
    transaction_items.forEach((item: TransactionItem) => {
      // empty array sends string with it so we need to ignore that
      if (item) {
        const newItem = {
          item_name: 'something', // will need to change
          item_cost: item.itemCost,
        }
        transactionItems.push(newItem)
      }
    })
    console.log(transactionItems)

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
    res.send(JSON.stringify(newTransaction))
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
