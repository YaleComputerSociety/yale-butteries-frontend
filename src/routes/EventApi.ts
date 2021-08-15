import express from 'express'
import { addEvent, deleteEvent, getAllEvents, getEvent, updateEvent } from '../controllers/Events'

const router = express.Router()

router.get('/', getAllEvents)
router.get('/:eventId', getEvent)
router.put(`/:eventId`, updateEvent)
router.delete(`/:eventId`, deleteEvent)
router.post('/', addEvent)

export default router
