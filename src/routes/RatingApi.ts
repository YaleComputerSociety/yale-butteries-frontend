import express from "express"
import { createRating, getAllItemRatings, getRating } from "src/controllers/Ratings"

const router = express.Router()

router.get("/", getAllItemRatings)
router.get("/:ratingId", getRating)
router.post("/", createRating)