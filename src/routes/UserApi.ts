import express from 'express'
<<<<<<< HEAD
import { deleteUser, getAllUsers, getTestUser, getUser, updateUser } from '../controllers/Users'
=======
import { getAllUsers, getUser, updateUser, createUser } from '../controllers/Users'
>>>>>>> prisma

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:userId', getUser)
<<<<<<< HEAD
router.get('/me/:userId', getTestUser)
router.put('/', updateUser)
router.delete('/:userId', deleteUser)
=======
router.post('/', createUser)
router.put('/', updateUser)
>>>>>>> prisma

export default router
