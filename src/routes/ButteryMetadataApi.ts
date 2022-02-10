import express from 'express'
import { getAllButteryData, getButteryData, updateMetadata } from 'src/controllers/ButteryMetadata'

const router = express.Router()

router.get('/', getAllButteryData)
router.get('/:butteryId', getButteryData)
router.put('/', updateMetadata)