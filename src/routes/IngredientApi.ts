import express from "express"
import { createIngredient, getAllIngredients, getIngredient, updateIngredient } from "src/controllers/Ingredients"

const router = express.Router()

router.get("/", getAllIngredients)
router.get("/:ingredientId", getIngredient)
router.put("/", updateIngredient)
router.post("/", createIngredient)