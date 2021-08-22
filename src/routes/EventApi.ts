import express from 'express'
import { addEvent, deleteEvent, getAllEvents, getEvent, updateEvent } from '../controllers/Events'

const router = express.Router()

router.get('/', getAllEvents)
router.get('/:eventId', getEvent)
router.post('/', addEvent)
router.put(`/`, updateEvent)
router.delete(`/:eventId`, deleteEvent)

export default router
