import express from 'express'

import eventControllers from '../controllers/Events'

const router = express.Router()

router.get('/', eventControllers.getAllEvents)
router.get('/:eventId', eventControllers.getEvent)

export default router
