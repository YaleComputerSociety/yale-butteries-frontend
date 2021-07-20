import express from 'express'

import eventOccurrenceControllers from '../controllers/EventOccurrences'

const router = express.Router()

router.get('/', eventOccurrenceControllers.getAllEventOccurrences)
router.get('/:eventOccurrenceId', eventOccurrenceControllers.getEventOccurrence)
router.put('/:eventOccurrenceId', eventOccurrenceControllers.updateEventOccurrence)

export default router
