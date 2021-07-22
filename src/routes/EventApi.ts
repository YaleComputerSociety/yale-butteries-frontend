import express from 'express'

import eventControllers from '../controllers/Events'

const router = express.Router()
const slash = '/'
const eventParam = ':eventId'

router.get(slash, eventControllers.getAllEvents)
router.get(`${slash}${eventParam}`, eventControllers.getEvent)
router.put(`${slash}${eventParam}`, eventControllers.updateEvent)
router.delete(`${slash}${eventParam}`, eventControllers.deleteEvent)
router.post(slash, eventControllers.addEvent)

export default router
