import express from 'express'

import eventOccurrenceControllers from '../controllers/eventoccurrences'

const router = express.Router()

router.get('/', eventOccurrenceControllers.getAllEventOccurrences)
router.get('/:eventOccurrenceId', eventOccurrenceControllers.getEventOccurrence)

export default router
