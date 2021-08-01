import express from 'express'
import { deleteRoom, getAllRooms, getRoom, updateRoom } from '../controllers/Rooms'

const router = express.Router()
const roomIdParam = '/:roomId'

router.get('/', getAllRooms)
router.get(roomIdParam, getRoom)
router.put(roomIdParam, updateRoom)
router.delete(roomIdParam, deleteRoom)

export default router
