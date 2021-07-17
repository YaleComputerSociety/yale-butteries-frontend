import express from 'express'

import statControllers from '../controllers/stats'

const router = express.Router()
const statIdParameter = '/:statId'

router.get('/', statControllers.getAllStats)
router.get(statIdParameter, statControllers.getStat)
router.put(statIdParameter, statControllers.updateStat)
router.delete(statIdParameter, statControllers.deleteStat)

export default router
