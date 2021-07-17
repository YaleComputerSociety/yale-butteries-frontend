import express from 'express'

import userControllers from '../controllers/users'

const router = express.Router()
const userIdParameter = '/:userId'

router.get('/', userControllers.getAllUsers)
router.get(userIdParameter, userControllers.getUser)
router.delete(userIdParameter, userControllers.deleteUser)
router.put(userIdParameter, userControllers.updateUser)

export default router
