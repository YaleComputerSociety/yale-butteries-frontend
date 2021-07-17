import express from 'express'

import gameControllers from '../controllers/ims'

const router = express.Router()
const gameIdParameter = '/:gameId'

// No ID: ALL, Putting in ID: Just put one
router.get('/', gameControllers.getAllGames)
router.get(gameIdParameter, gameControllers.getGame)
router.delete(gameIdParameter, gameControllers.deleteGame)
router.put(gameIdParameter, gameControllers.updateGame)

export default router

// Use -> Integrate what's put in the () into the actual APP
// /api/intramurals/4 < Primary Key of 4 (Path parameters)
