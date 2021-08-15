import express from 'express'
import { getAllGames, getGame } from '../controllers/ImGames'

const router = express.Router()

router.get('/', getAllGames)
router.get('/:gameId', getGame)

export default router
