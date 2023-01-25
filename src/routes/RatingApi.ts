import express from 'express'
import { createRating, getAllItemRatings, getRating } from '../controllers/Ratings'

const router = express.Router()

router.get('/', getAllItemRatings)
router.get('/:ratingId', getRating)
router.post('/', createRating)

export default router
