import express from 'express'
import {
  deleteUserEventOccurrence,
  getAllUserEventOccurrences,
  getUserEventOccurrence,
  updateUserEventOccurrence,
} from '../controllers/UserEventOccurrences'

const router = express.Router()

router.get('/', getAllUserEventOccurrences)
router.get('/:userEventOccurrenceId', getUserEventOccurrence)
router.put('/:userEventOccurrenceId', updateUserEventOccurrence)
router.delete('/:userEventOccurrenceId', deleteUserEventOccurrence)

export default router
