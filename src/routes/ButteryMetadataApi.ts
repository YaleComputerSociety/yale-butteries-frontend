import express from 'express'
import { getAllButteryData, getButteryData } from 'src/controllers/ButteryMetadata'

const router = express.Router()

router.get('/', getAllButteryData)
router.get('/:butteryId', getButteryData)