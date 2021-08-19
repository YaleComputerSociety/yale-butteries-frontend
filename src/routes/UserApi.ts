import express from 'express'
import { deleteUser, getAllUsers, getTestUser, getUser, updateUser } from '../controllers/Users'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:userId', getUser)
router.get('/me/:userId', getTestUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router
