import express from 'express'
import { subscribePushNotifications } from '@controllers/PushNotifications'

const router = express.Router()

router.post('/', subscribePushNotifications)

export default router
