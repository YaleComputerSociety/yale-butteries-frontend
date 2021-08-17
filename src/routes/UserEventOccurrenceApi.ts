import express from 'express'
import {
  deleteUserEventOccurrence,
  getAllUserEventOccurrences,
  getUserEventOccurrence,
  addUserEventOccurrence,
  updateUserEventOccurrence,
} from '../controllers/UserEventOccurrences'

const router = express.Router()

router.get('/', getAllUserEventOccurrences)
router.get('/:userEventOccurrenceId', getUserEventOccurrence)
router.post('/', addUserEventOccurrence)
router.put('/', updateUserEventOccurrence)
router.delete('/:userEventOccurrenceId', deleteUserEventOccurrence)

export default router
