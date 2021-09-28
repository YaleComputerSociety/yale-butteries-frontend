import express from 'express'
import { deleteUser, getAllUsers, getMe, getUser, updateUser } from '../controllers/Users'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/me', getMe)
router.get('/:userId', getUser)
router.put('/', updateUser)
router.delete('/:userId', deleteUser)

export default router
