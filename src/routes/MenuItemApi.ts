import express from "express"
import { createMenuItem, getAllMenuItems, getMenuItem, updateMenuItem } from "src/controllers/MenuItems"

const router = express.Router()

router.get("/", getAllMenuItems)
router.get("/:menuItemId", getMenuItem)
router.put("/", updateMenuItem)
router.post("/", createMenuItem)