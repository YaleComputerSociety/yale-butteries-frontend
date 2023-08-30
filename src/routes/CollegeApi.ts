import express from 'express'
import { getAllColleges, getCollege, updateCollege } from '../controllers/Colleges'

const router = express.Router()

router.get('/', getAllColleges)
router.get('/:collegeId', getCollege)
router.put('/:collegeId', updateCollege)

export default router
