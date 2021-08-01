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
router.put('/:eventOccurrenceId', updateEventOccurrence)
router.delete('/:eventOccurrenceId', deleteEventOccurrence)
// router.post('/:eventOccurrenceId', eventOccurrenceControllers.addEventOccurrence)

export default router
