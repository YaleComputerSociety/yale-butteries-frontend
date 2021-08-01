import express from 'express'
import { getAllGames, getGame } from '../controllers/ImGames'

const router = express.Router()
const gameIdParameter = '/:gameId'

router.get('/', getAllGames)
router.get(gameIdParameter, getGame)

export default router
