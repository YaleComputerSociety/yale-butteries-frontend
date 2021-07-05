import express from 'express'

import statControllers from '../controllers/stats'

const router = express.Router()

router.get('/', statControllers.getAllStats)
router.get('/:statId', statControllers.getStat)

export default router
