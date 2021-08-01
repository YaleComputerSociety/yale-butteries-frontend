import express from 'express'
import { deleteUser, getAllUsers, getTestUser, getUser, updateUser } from '../controllers/Users'

const router = express.Router()
const userIdParameter = '/:userId'

router.get('/', getAllUsers)
router.get(userIdParameter, getUser)
router.get(`/me${userIdParameter}`, getTestUser)
router.put(userIdParameter, updateUser)
router.delete(userIdParameter, deleteUser)

export default router
