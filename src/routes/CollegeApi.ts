import express from 'express'
import { getAllColleges, getCollege, updateCollege } from '@controllers/Colleges'
import asyncHandler from '@middlewares/asyncHandler'
import { createParamValidator, isInteger } from '@middlewares/validateParamHandler'

const router = express.Router()

const validateCollegeId = createParamValidator('collegeId', isInteger, 'College ID must be an integer')

router.get('/', asyncHandler(getAllColleges))
router.get('/:collegeId', validateCollegeId, asyncHandler(getCollege))
router.put('/:collegeId', validateCollegeId, asyncHandler(updateCollege))

export default router
