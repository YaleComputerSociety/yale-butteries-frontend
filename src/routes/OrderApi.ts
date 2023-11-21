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
import { createParamValidator, isInteger, isNonEmptyString } from '@src/middlewares/validateParamHandler'

const router = express.Router()

const validateCollegeName = createParamValidator('collegeId', isNonEmptyString, 'College Name must be non-empty')
const validateOrderId = createParamValidator('orderId', isInteger, 'Order ID must be an integer')
const validateOrderItemId = createParamValidator('orderItemId', isInteger, 'Order item ID must be an integer')

router.get('/:orderId', validateOrderId, asyncHandler(getOrder))
router.get('/college/:collegeName', validateCollegeName, asyncHandler(getAllOrdersFromCollege))
router.get('/college/recent/:collegeName', validateCollegeName, asyncHandler(getRecentOrdersFromCollege))
router.post('/', asyncHandler(createOrder))
router.put('/:orderId', validateOrderId, asyncHandler(updateOrder)) // unused
router.put('/item/:orderItemId', validateOrderItemId, asyncHandler(updateOrderItem))

export default router
