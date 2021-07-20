import express from 'express'

import gameControllers from '../controllers/ImGames'

const router = express.Router()
const gameIdParameter = '/:gameId'

router.get('/', gameControllers.getAllGames)
router.get(gameIdParameter, gameControllers.getGame)
router.put(gameIdParameter, gameControllers.updateGame)

export default router
