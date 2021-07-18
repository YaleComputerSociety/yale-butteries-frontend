import express from 'express'

import gameControllers from '../controllers/ims'

const router = express.Router()
const gameIdParameter = '/:gameId'

router.get('/', gameControllers.getAllGames)
router.get(gameIdParameter, gameControllers.getGame)

export default router
