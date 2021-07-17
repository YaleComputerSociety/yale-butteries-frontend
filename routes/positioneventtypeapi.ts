import express from 'express'

import positionEventTypeController from '../controllers/positioneventtypes'

const router = express.Router()

router.get('/', positionEventTypeController.getAllPositionEventTypes)

export default router
