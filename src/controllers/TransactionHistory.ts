import { PrismaClient } from '@prisma/client'

import { Request, Response } from 'express'

const prisma = new PrismaClient()

export async function getAllTransactionHistories(_req: Request, res: Response): Promise<void> {
  try {
    const transactionHistories = await prisma.transactionHistory.findMany({
      include: {
        transaction_items: true,
        college: true,
        user: true,
      },
    })
    res.send(JSON.stringify(transactionHistories))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getTransactionHistory(req: Request, res: Response): Promise<void> {
  try {
    const transactionHistory = await prisma.transactionHistory.findUnique({
      where: {
        id: parseInt(req.params.transactionId),
      },
      include: {
        transaction_items: true,
        college: true,
        user: true,
      },
    })
    res.send(JSON.stringify(transactionHistory))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function createTransactionHistory(req: Request, res: Response): Promise<void> {
  try {
    const {
      order_placed,
      order_complete,
      queue_size_on_placement,
      queue_size_on_complete,
      in_progress,
      total_price,
      transaction_items,
      college_id,
      user_id,
    } = req.body
    const transactionItems = []
    for (const transactionItem of transaction_items) {
      const newItem = {
        item_name: transactionItem.item_name,
        item_cost: transactionItem.item_cost,
      }
      transactionItems.push(newItem)
    }
    const newTransaction = await prisma.transactionHistory.create({
      data: {
        order_complete: order_complete,
        order_placed: order_placed,
        queue_size_on_complete: queue_size_on_complete,
        queue_size_on_placement: queue_size_on_placement,
        in_progress: in_progress,
        total_price: total_price,
        college: {
          connect: {
            id: parseInt(college_id),
          },
        },
        user: {
          connect: {
            id: parseInt(user_id),
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
    res.status(400).send(e)
  }
}

export async function updateTransactionHistory(req: Request, res: Response): Promise<void> {
  try {
    const transactionHistory = await prisma.transactionHistory.update({
      where: {
        id: req.body.id
      },
      data: {
        order_complete: req.body.order_complete || undefined,
        order_placed: req.body.order_placed || undefined,
        queue_size_on_complete: req.body.queue_size_on_complete || undefined,
        queue_size_on_placement: req.body.queue_size_on_placement || undefined,
        in_progress: req.body.in_progress || undefined,
        total_price: req.body.total_price || undefined,
      }
    })
    res.send(JSON.stringify(transactionHistory))
  } catch (e) {
    res.status(400).send(e)
  }
}