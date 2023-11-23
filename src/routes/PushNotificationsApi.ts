/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import { subscribePushNotifications } from '@controllers/PushNotifications'
import asyncHandler from '@src/middlewares/asyncHandler'
import { validateBody } from '@src/middlewares/validateBodyHandler'
import { SubscribePushNotificationsBody } from '@src/utils/bodyTypes'

const router = express.Router()

router.post('/', validateBody(SubscribePushNotificationsBody), asyncHandler(subscribePushNotifications))

export default router
