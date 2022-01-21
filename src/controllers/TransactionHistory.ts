import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import { TransactionHistory } from 'src/models/transactionhistory'
import { User } from 'src/models/user'
import { College } from 'src/models/college'
import { TransactionItem } from 'src/models/transactionitem'

export async function getAllTransactionHistories(_req: Request, res: Response): Promise<void> {
  try {
    const transactionHistories = await getRepository(TransactionHistory).find({
      join: {
        alias: "transactionHistory",
        leftJoinAndSelect: {
          "transaction_items": "transactionHistory.transaction_items",
          "buttery": "transactionHistory.buttery",
          "user": "transactionHistory.user"
        }
      }
    })
    res.send(JSON.stringify(transactionHistories))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getTransactionHistory(req: Request, res: Response): Promise<void> {
  try {
    const transactionHistory = await getRepository(TransactionHistory).findOne(req.params.transactionId, {
      join: {
        alias: "transactionHistory",
        leftJoinAndSelect: {
          "transaction_items": "transactionHistory.transaction_items",
          "buttery": "transactionHistory.buttery",
          "user": "transactionHistory.user"
        }
      }
    })
    res.send(JSON.stringify(transactionHistory))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function createTransactionHistory(req: Request, res: Response): Promise<void> {
  try {
    const { order_placed, order_complete, queue_size_on_placement, queue_size_on_complete, in_progress, total_price, transaction_items, buttery, user } = req.body
    const newTransaction = new TransactionHistory()
    newTransaction.order_complete = order_complete
    newTransaction.order_placed = order_placed
    newTransaction.queue_size_on_complete = queue_size_on_complete
    newTransaction.queue_size_on_placement = queue_size_on_placement
    newTransaction.in_progress = in_progress
    newTransaction.total_price = total_price
    const associatedCollege = await getRepository(College).findOne({ college: buttery })
    const associatedUser = await getRepository(User).findOne({ name: user })
    newTransaction.buttery = associatedCollege
    newTransaction.user = associatedUser
    newTransaction.transaction_items = []
    for (const transactionItem of transaction_items) {
      const newItem = new TransactionItem()
      newItem.item_cost = transactionItem.item_cost
      newItem.item_name = transactionItem.item_name
      await getRepository(TransactionItem).save(newItem)
      newTransaction.transaction_items.push(newItem)
    }
    const promise = await getRepository(TransactionHistory).save(newTransaction)
    res.send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateTransactionHistory(req: Request, res: Response): Promise<void> {
  try {
    const transactionHistory = await getRepository(TransactionHistory).findOne(req.body.id)
    if('order_complete' in req.body) {
      transactionHistory.order_complete = req.body.order_complete
    }
    if('order_placed' in req.body) {
      transactionHistory.order_placed = req.body.order_placed
    }
    if('queue_size_on_complete' in req.body) {
      transactionHistory.queue_size_on_complete = req.body.queue_size_on_complete
    }
    if('queue_size_on_placement' in req.body) {
      transactionHistory.queue_size_on_placement = req.body.queue_size_on_placement
    }
    if('in_progress' in req.body) {
      transactionHistory.in_progress = req.body.in_progress
    }
    if('total_price' in req.body) {
      transactionHistory.total_price = req.body.total_price
    }
    const promise = await getRepository(TransactionHistory).save(transactionHistory)
    res.send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}