import express from 'express'
import { addEvent, deleteEvent, getAllEvents, getEvent, updateEvent } from '../controllers/Events'

const router = express.Router()
const slash = '/'
const eventParam = ':eventId'

router.get(slash, getAllEvents)
router.get(`${slash}${eventParam}`, getEvent)
router.put(`${slash}${eventParam}`, updateEvent)
router.delete(`${slash}${eventParam}`, deleteEvent)
router.post(slash, addEvent)

export default router
