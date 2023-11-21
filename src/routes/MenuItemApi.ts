import express from 'express'

import { createMenuItem, getAllMenuItems, getMenuItem, updateMenuItem } from '@controllers/MenuItems'
import asyncHandler from '@src/middlewares/asyncHandler'
import { createParamValidator, isInteger } from '@src/middlewares/validateParamHandler'

const router = express.Router()

const validateMenuItemId = createParamValidator('menuItemId', isInteger, 'Menu Item ID must be an integer')

router.get('/', asyncHandler(getAllMenuItems))
router.get('/:menuItemId', validateMenuItemId, asyncHandler(getMenuItem))
router.put('/:menuItemId', validateMenuItemId, asyncHandler(updateMenuItem))
router.post('/', asyncHandler(createMenuItem))

export default router
