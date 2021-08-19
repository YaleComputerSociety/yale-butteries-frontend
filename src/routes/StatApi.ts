import express from 'express'
import { addStat, deleteStat, getAllStats, getStat, updateStat } from '../controllers/Stats'

const router = express.Router()

router.get('/', getAllStats)
router.get('/:statId', getStat)
router.put('/:statId', updateStat)
router.delete('/:statId', deleteStat)
router.post('/', addStat)

export default router
