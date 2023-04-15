import express from 'express'
import {
  createTransactionHistory,
  getAllCollegeTransactionHistories,
  getRecentCollegeTransactionHistories,
  getTransactionHistory,
  updateTransactionHistory,
  updateTransactionItem,
} from '../controllers/TransactionHistory'

const router = express.Router()

router.get('/recent/college/:college', getRecentCollegeTransactionHistories)
router.get('/college/:college', getAllCollegeTransactionHistories)
router.get('/:transactionId', getTransactionHistory)
router.put('/', updateTransactionHistory)
router.put('/:itemId', updateTransactionItem)
router.post('/', createTransactionHistory)

export default router
