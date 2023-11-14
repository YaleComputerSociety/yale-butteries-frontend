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

router.get('/recent/college/:college', getRecentOrdersFromCollege)
router.get('/college/:college', getAllOrdersFromCollege)
router.get('/:orderId', getOrder)
router.put('/', updateOrder)
router.put('/:orderItemId', updateOrderItem)
router.post('/', createOrder)

export default router
