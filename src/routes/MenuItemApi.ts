import express from 'express'
import { createMenuItem, getAllMenuItems, getMenuItem, updateMenuItem } from '@controllers/MenuItems'
import asyncHandler from '@src/middlewares/asyncHandler'

const router = express.Router()

router.get('/', asyncHandler(getAllMenuItems))
router.get('/:menuItemId', asyncHandler(getMenuItem))
router.put('/:menuItemId', asyncHandler(updateMenuItem))
router.post('/', asyncHandler(createMenuItem))

export default router
