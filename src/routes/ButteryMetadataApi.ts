import express from 'express'
import { getAllButteryData, getButteryData, updateMetadata } from '../controllers/ButteryMetadata'

const router = express.Router()

router.get('/', getAllButteryData)
router.get('/:butteryId', getButteryData)
router.put('/', updateMetadata)

export default router
