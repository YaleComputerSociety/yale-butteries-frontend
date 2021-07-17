import express from 'express'

import userEventOccurrenceControllers from '../controllers/usereventoccurrences'

const router = express.Router()

router.get('/', userEventOccurrenceControllers.getAllUserEventOccurrences)
// router.get('/:eventOccurrenceId', eventOccurrenceControllers.getEventOccurrence)
// router.put('/:eventOccurrenceId', eventOccurrenceControllers.updateEventOccurrence)
// router.delete('/:eventOccurrenceId', eventOccurrenceControllers.deleteEventOccurrence)
// router.delete(gameIdParameter, gameControllers.deleteGame)
// router.put(gameIdParameter, gameControllers.updateGame)

export default router
