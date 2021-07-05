import express from 'express'

import usersEventCollectors from '../controllers/usersevents'

const router = express.Router()

// No ID: ALL, Putting in ID: Just put one
router.get('/', usersEventCollectors.getAllUsersEvents)
router.get('/:usersEventId', usersEventCollectors.getUsersEvent)

export default router

// Use -> Integrate what's put in the () into the actual APP
// /api/intramurals/4 < Primary Key of 4 (Path parameters)
