import express from 'express'

import eventControllers from '../controllers/events'

const router = express.Router()

router.get('/', eventControllers.getAllEvents)
router.get('/:eventId', eventControllers.getEvent)

export default router
