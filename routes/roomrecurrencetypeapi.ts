import express from 'express'

import roomRecurrenceTypeController from '../controllers/roomrecurrencetypes'

const router = express.Router()

router.get('/', roomRecurrenceTypeController.getAllRoomRecurrenceTypes)

export default router
