import express from 'express'

import eventControllers from '../controllers/events'

const router = express.Router()
const slash = '/'
const eventParam = ':eventId'

router.get(slash, eventControllers.getAllEvents)
router.get(`${slash}${eventParam}`, eventControllers.getEvent)
router.put(`${slash}${eventParam}`, eventControllers.updateEvent)

export default router
