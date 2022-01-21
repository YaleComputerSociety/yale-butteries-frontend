import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import { ButteryMetaData } from 'src/models/butterymetadata';

export async function getAllButteryData(_: Request, res: Response): Promise<void> {
  try {
    const butteryMetadataObjects = await getRepository(ButteryMetaData).find({ relations: ["college"] });
    res.send(JSON.stringify(butteryMetadataObjects))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getButteryData(req: Request, res: Response): Promise<void> {
  try {
    const targetButteryData = await getRepository(ButteryMetaData).findOne(req.params.butteryId, { relations: ["college"] });
    res.send(JSON.stringify(targetButteryData))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateMetadata(req: Request, res: Response): Promise<void> {
  try {
    const targetButteryData = await getRepository(ButteryMetaData).findOne(req.body.id)
    if ('max_queue_size' in req.body) {
      targetButteryData.max_queue_size = req.body.max_queue_size
    }
    if ('reserved_queue_spots' in req.body) {
      targetButteryData.reserved_queue_spots = req.body.reserved_queue_spots
    }
    const promise = await getRepository(ButteryMetaData).save(targetButteryData)
    res.send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}
