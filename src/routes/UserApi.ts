import express from 'express'

import userControllers from '../controllers/Users'

const router = express.Router()
const userIdParameter = '/:userId'

router.get('/', userControllers.getAllUsers)
router.get(userIdParameter, userControllers.getUser)
router.get(`/me${userIdParameter}`, userControllers.getTestUser)

export default router
