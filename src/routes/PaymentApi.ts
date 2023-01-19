import express from 'express'
import { createPaymentIntent, testSI } from '../controllers/Payments'

const router = express.Router()

router.post('/paymentIntent', createPaymentIntent)
router.post('/test_si', testSI)

export default router
