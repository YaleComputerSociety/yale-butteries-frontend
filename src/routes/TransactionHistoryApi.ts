import express from 'express'
import {
  createTransactionHistory,
  getCollegeTransactionHistories,
  getTransactionHistory,
  updateTransactionHistory,
} from '../controllers/TransactionHistory'

const router = express.Router()

router.get('/:college', getCollegeTransactionHistories)
router.get('/:transactionId', getTransactionHistory)
router.put('/', updateTransactionHistory)
router.post('/', createTransactionHistory)

export default router
