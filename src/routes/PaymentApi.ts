/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { createPaymentIntent } from '@controllers/Payments'
import asyncHandler from '@src/middlewares/asyncHandler'
import { validateBody } from '@src/middlewares/validateBodyHandler'
import { CreatePaymentIntentBody } from '@src/utils/bodyTypes'

const router = express.Router()

router.post('/paymentIntent', validateBody(CreatePaymentIntentBody), asyncHandler(createPaymentIntent))

export default router
