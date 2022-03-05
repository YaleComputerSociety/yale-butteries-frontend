import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAllButteryData(_: Request, res: Response): Promise<void> {
  try {
    const butteryMetadataObjects = await prisma.butteryMetaData.findMany(includeProperty)
    res.send(JSON.stringify(butteryMetadataObjects))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getButteryData(req: Request, res: Response): Promise<void> {
  try {
    const targetButteryData = await prisma.butteryMetaData.findUnique({
      ...includeProperty,
      where: {
        id: req.params.butteryId,
      },
    })
    res.send(JSON.stringify(targetButteryData))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateMetadata(req: Request, res: Response): Promise<void> {
  try {
    const targetButteryData = await prisma.butteryMetaData.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        max_queue_size: req.body.max_queue_size || undefined,
        reserved_queue_spots: req.body.reserved_queue_spots || undefined,
      },
    })
    res.send(JSON.stringify(targetButteryData))
  } catch (e) {
    res.status(400).send(e)
  }
}

const includeProperty = {
  include: {
    college: true,
  },
}
