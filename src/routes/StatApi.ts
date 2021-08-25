import express from 'express'
import { addStat, deleteStat, getAllStats, getStat, updateStat } from '../controllers/Stats'

const router = express.Router()

router.get('/', getAllStats)
router.get('/:statId', getStat)
router.post('/', addStat)
router.put('/', updateStat)
router.delete('/:statId', deleteStat)

export default router
