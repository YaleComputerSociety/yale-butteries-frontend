import express from 'express'
import { addStat, deleteStat, getAllStats, getStat, updateStat } from '../controllers/Stats'

const router = express.Router()
const statIdParameter = '/:statId'

router.get('/', getAllStats)
router.get(statIdParameter, getStat)
router.put(statIdParameter, updateStat)
router.delete(statIdParameter, deleteStat)
router.post('/', addStat)

export default router
