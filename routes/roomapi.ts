import express from 'express'

import roomControllers from '../controllers/rooms'

const router = express.Router()
const roomIdParam = '/:roomId'

router.get('/', roomControllers.getAllRooms)
router.get(roomIdParam, roomControllers.getRoom)
router.put(roomIdParam, roomControllers.updateRoom)

export default router
