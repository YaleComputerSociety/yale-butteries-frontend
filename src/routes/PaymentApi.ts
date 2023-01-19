import express from 'express'
import { createPaymentIntent } from '../controllers/Payments'

const router = express.Router()

router.post('/paymentIntent', createPaymentIntent)

export default router
