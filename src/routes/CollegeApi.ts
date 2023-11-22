/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { getAllColleges, getCollege, updateCollege } from '@controllers/Colleges'
import asyncHandler from '@middlewares/asyncHandler'
import { createParamValidator, isInteger } from '@middlewares/validateParamHandler'
import { validateBody } from '@src/middlewares/validateBodyHandler'
import { UpdateCollegeBody } from '@src/utils/bodyTypes'

const router = express.Router()

const validateCollegeId = createParamValidator('collegeId', isInteger, 'College ID must be an integer')

router.get('/', asyncHandler(getAllColleges))
router.get('/:collegeId', validateCollegeId, asyncHandler(getCollege))
router.put('/:collegeId', validateCollegeId, validateBody(UpdateCollegeBody), asyncHandler(updateCollege))

export default router
