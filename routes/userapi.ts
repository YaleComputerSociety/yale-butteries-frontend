import express from 'express'

import userControllers from '../controllers/users'

const router = express.Router()
const userIdParameter = '/:userId'

router.get('/', userControllers.getAllUsers)
router.get(userIdParameter, userControllers.getUser)
router.get(`/me${userIdParameter}`, userControllers.getTestUser)
router.put(userIdParameter, userControllers.updateUser)

export default router
