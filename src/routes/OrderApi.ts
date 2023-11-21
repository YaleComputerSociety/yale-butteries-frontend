import express from 'express'
import {
  createOrder,
  getAllOrdersFromCollege,
  getRecentOrdersFromCollege,
  getOrder,
  updateOrder,
  updateOrderItem
} from '@controllers/Orders'
import asyncHandler from '@src/middlewares/asyncHandler'

const router = express.Router()

router.get('/:orderId', asyncHandler(getOrder))
router.get('/college/:collegeName', asyncHandler(getAllOrdersFromCollege))
router.get('/college/recent/:collegeName', asyncHandler(getRecentOrdersFromCollege))
router.post('/', asyncHandler(createOrder))
router.put('/:orderId', asyncHandler(updateOrder)) // unused
router.put('/item/:orderItemId', asyncHandler(updateOrderItem))

export default router
