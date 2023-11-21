import express from 'express'
import { getAllColleges, getCollege, updateCollege } from '@controllers/Colleges'
import asyncHandler from '@middlewares/asyncHandler'

const router = express.Router()

router.get('/', asyncHandler(getAllColleges))
router.get('/:collegeId', asyncHandler(getCollege))
router.put('/:collegeId', asyncHandler(updateCollege))

export default router
