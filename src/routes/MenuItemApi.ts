import express from 'express'
import { createMenuItem, getAllMenuItems, getMenuItem, updateMenuItem } from '../controllers/MenuItems'

const router = express.Router()

router.get('/', getAllMenuItems)
router.get('/:menuItemId', getMenuItem)
router.put('/:menuItemId', updateMenuItem)
router.post('/', createMenuItem)

export default router
