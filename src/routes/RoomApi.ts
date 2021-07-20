import express from 'express'

import roomControllers from '../controllers/Rooms'

const router = express.Router()

router.get('/', roomControllers.getAllRooms)
router.get('/:roomId', roomControllers.getRoom)

export default router
