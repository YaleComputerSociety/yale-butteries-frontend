import express from 'express'

import userEventOccurrenceControllers from '../controllers/UserEventOccurrences'

const router = express.Router()

router.get('/', userEventOccurrenceControllers.getAllUserEventOccurrences)
router.get('/:userEventOccurrenceId', userEventOccurrenceControllers.getUserEventOccurrence)
router.put('/:userEventOccurrenceId', userEventOccurrenceControllers.updateUserEventOccurrence)

export default router
