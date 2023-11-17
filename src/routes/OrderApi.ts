import express from 'express'
import {
  createOrder,
  getAllOrdersFromCollege,
  getRecentOrdersFromCollege,
  getOrder,
  updateOrder,
  updateOrderItem,
} from '../controllers/Orders'

const router = express.Router()

router.get('/:orderId', getOrder)
router.get('/college/:collegeName', getAllOrdersFromCollege)
router.get('/college/recent/:collegeName', getRecentOrdersFromCollege)
router.post('/', createOrder)
router.put('/:orderId', updateOrder) // unused
router.put('/item/:orderItemId', updateOrderItem)

export default router
