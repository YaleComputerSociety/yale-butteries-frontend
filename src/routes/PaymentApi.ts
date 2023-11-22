/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { createPaymentIntent } from '@controllers/Payments'
import asyncHandler from '@src/middlewares/asyncHandler'

const router = express.Router()

router.post('/paymentIntent', asyncHandler(createPaymentIntent))

export default router
