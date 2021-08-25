import express from 'express'
import {
  deleteEventOccurrence,
  getAllEventOccurrences,
  getEventOccurrence,
  updateEventOccurrence,
} from '../controllers/EventOccurrences'

const router = express.Router()

router.get('/', getAllEventOccurrences)
router.get('/:eventOccurrenceId', getEventOccurrence)
router.put('/', updateEventOccurrence)
router.delete('/:eventOccurrenceId', deleteEventOccurrence)

export default router
