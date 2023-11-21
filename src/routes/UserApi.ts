import express from 'express'
import { getAllUsers, getUser, updateUser, createUser, verifyStaffLogin } from '@controllers/Users'
import asyncHandler from '@src/middlewares/asyncHandler'

const router = express.Router()

router.get('/', asyncHandler(getAllUsers))
router.get('/:userId', asyncHandler(getUser))
router.post('/', asyncHandler(createUser))
router.put('/:userId', asyncHandler(updateUser))
router.post('/staffLogin', asyncHandler(verifyStaffLogin))

export default router
