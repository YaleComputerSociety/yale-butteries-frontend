/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { getAllUsers, getUser, updateUser, createUser, verifyStaffLogin } from '@controllers/Users'
import asyncHandler from '@src/middlewares/asyncHandler'
import { createParamValidator, isNonEmptyString } from '@src/middlewares/validateParamHandler'

const router = express.Router()

const validateUserId = createParamValidator('userId', isNonEmptyString, 'User ID must be non-empty')

router.get('/', asyncHandler(getAllUsers))
router.get('/:userId', validateUserId, asyncHandler(getUser))
router.post('/', asyncHandler(createUser))
router.put('/:userId', validateUserId, asyncHandler(updateUser))
router.post('/staffLogin', asyncHandler(verifyStaffLogin))

export default router
