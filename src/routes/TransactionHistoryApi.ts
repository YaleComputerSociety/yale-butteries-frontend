import express from 'express'
import {
  createTransactionHistory,
  getAllTransactionHistories,
  getTransactionHistory,
  updateTransactionHistory,
} from '../controllers/TransactionHistory'

const router = express.Router()

router.get('/', getAllTransactionHistories)
router.get('/:transactionId', getTransactionHistory)
router.put('/', updateTransactionHistory)
router.post('/', createTransactionHistory)

export default router
