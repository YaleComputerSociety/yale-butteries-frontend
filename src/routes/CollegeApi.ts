import express from 'express'
import { getAllColleges, getCollege, updateCollege } from '../controllers/Colleges'
import asyncHandler from '../middlewares/asyncHandler'

const router = express.Router()

router.get('/', getAllColleges)
router.get('/:collegeId', asyncHandler(getCollege))
router.put('/:collegeId', updateCollege)

export default router
