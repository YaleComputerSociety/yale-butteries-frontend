import express from 'express'

import statControllers from '../controllers/Stats'

const router = express.Router()
const statIdParameter = '/:statId'

router.get('/', statControllers.getAllStats)
router.get(statIdParameter, statControllers.getStat)
router.put(statIdParameter, statControllers.updateStat)

export default router
