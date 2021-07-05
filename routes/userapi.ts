import express from 'express'

import userControllers from '../controllers/users'

const router = express.Router()

router.get('/', userControllers.getAllUsers)
router.get('/:userId', userControllers.getUser)

export default router
