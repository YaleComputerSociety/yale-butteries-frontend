import express from 'express'
import {
  createTransactionHistory,
  getCollegeTransactionHistories,
  getTransactionHistory,
  updateTransactionHistory,
  updateTransactionItem,
} from '../controllers/TransactionHistory'

const router = express.Router()

router.get('/college/:college', getCollegeTransactionHistories)
router.get('/:transactionId', getTransactionHistory)
router.put('/', updateTransactionHistory)
router.put('/:itemId', updateTransactionItem)
router.post('/', createTransactionHistory)

export default router
