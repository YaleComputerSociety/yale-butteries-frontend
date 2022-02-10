import express from "express"
import { createTransactionHistory, getAllTransactionHistories, getTransactionHistory, updateTransactionHistory } from "src/controllers/TransactionHistory"

const router = express.Router()

router.get("/", getAllTransactionHistories)
router.get("/:transactionId", getTransactionHistory)
router.put("/", updateTransactionHistory)
router.post("/", createTransactionHistory)