import express from 'express'

import roomControllers from '../controllers/Rooms'

const router = express.Router()
const roomIdParam = '/:roomId'

router.get('/', roomControllers.getAllRooms)
router.get(roomIdParam, roomControllers.getRoom)
router.put(roomIdParam, roomControllers.updateRoom)
router.delete(roomIdParam, roomControllers.deleteRoom)

export default router
