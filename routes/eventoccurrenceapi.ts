import express from 'express'

import eventOccurrenceControllers from '../controllers/eventoccurrences'

const router = express.Router()

router.get('/', eventOccurrenceControllers.getAllEventOccurrences)
router.get('/:eventOccurrenceId', eventOccurrenceControllers.getEventOccurrence)
router.put('/:eventOccurrenceId', eventOccurrenceControllers.updateEventOccurrence)
router.delete('/:eventOccurrenceId', eventOccurrenceControllers.deleteEventOccurrence)
// router.delete(gameIdParameter, gameControllers.deleteGame)
// router.put(gameIdParameter, gameControllers.updateGame)

export default router
