import express from 'express'
import { getAllUsers, getUser, updateUser, createUser, verifyStaffLogin } from '@controllers/Users'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:userId', getUser)
router.post('/', createUser)
router.put('/:userId', updateUser)
router.post('/staffLogin', verifyStaffLogin)

export default router
