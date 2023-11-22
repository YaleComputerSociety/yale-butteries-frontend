/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import { createMenuItem, getAllMenuItems, getMenuItem, updateMenuItem } from '@controllers/MenuItems'
import asyncHandler from '@src/middlewares/asyncHandler'
import { createParamValidator, isInteger } from '@src/middlewares/validateParamHandler'
import { CreateMenuItemBody, UpdateMenuItemBody } from '@src/utils/bodyTypes'
import { validateBody } from '@src/middlewares/validateBodyHandler'

const router = express.Router()

const validateMenuItemId = createParamValidator('menuItemId', isInteger, 'Menu Item ID must be an integer')

router.get('/', asyncHandler(getAllMenuItems))
router.get('/:menuItemId', validateMenuItemId, asyncHandler(getMenuItem))
router.put('/:menuItemId', validateBody(UpdateMenuItemBody), validateMenuItemId, asyncHandler(updateMenuItem))
router.post('/', validateBody(CreateMenuItemBody), asyncHandler(createMenuItem))

export default router
