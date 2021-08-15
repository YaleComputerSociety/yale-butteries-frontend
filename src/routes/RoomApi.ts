import express from 'express'
import { getAllRooms, getRoom } from '../controllers/Rooms'

const router = express.Router()

router.get('/', getAllRooms)
router.get('/:roomId', getRoom)

export default router
