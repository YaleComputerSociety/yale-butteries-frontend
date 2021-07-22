import express from 'express'

import eventOccurrenceControllers from '../controllers/EventOccurrences'

const router = express.Router()

router.get('/', eventOccurrenceControllers.getAllEventOccurrences)
router.get('/:eventOccurrenceId', eventOccurrenceControllers.getEventOccurrence)
router.put('/:eventOccurrenceId', eventOccurrenceControllers.updateEventOccurrence)
router.delete('/:eventOccurrenceId', eventOccurrenceControllers.deleteEventOccurrence)
router.post('/:eventOccurrenceId', eventOccurrenceControllers.addEventOccurrence)

export default router
