import express from 'express'
import { getAllUsers, getUser, updateUser, createUser } from '../controllers/Users'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/me', getMe)
router.get('/:userId', getUser)
router.post('/', createUser)
router.put('/', updateUser)

export default router
