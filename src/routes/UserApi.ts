/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { getAllUsers, getUser, updateUser, createUser, verifyStaffLogin } from '@controllers/Users'
import asyncHandler from '@src/middlewares/asyncHandler'
import { createParamValidator, isNonEmptyString } from '@src/middlewares/validateParamHandler'
import { validateBody } from '@src/middlewares/validateBodyHandler'
import { CreateUserBody, UpdateUserBody, VerifyStaffLoginBody } from '@src/utils/bodyTypes'

const router = express.Router()

const validateUserId = createParamValidator('userId', isNonEmptyString, 'User ID must be non-empty')

router.get('/', asyncHandler(getAllUsers))
router.get('/:userId', validateUserId, asyncHandler(getUser))
router.post('/', validateBody(CreateUserBody), asyncHandler(createUser))
router.put('/:userId', validateBody(UpdateUserBody), validateUserId, asyncHandler(updateUser))
router.post('/staffLogin', validateBody(VerifyStaffLoginBody), asyncHandler(verifyStaffLogin))

export default router
