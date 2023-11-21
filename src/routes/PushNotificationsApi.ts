import express from 'express'
import { subscribePushNotifications } from '@controllers/PushNotifications'
import asyncHandler from '@src/middlewares/asyncHandler'

const router = express.Router()

router.post('/', asyncHandler(subscribePushNotifications))

export default router
