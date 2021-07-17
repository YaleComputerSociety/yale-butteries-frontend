import db from '../models/'
import express from 'express'

import { PositionEventType } from 'controllers/controllerInterfaces'

const { PositionEventType } = db

async function getPositionEventTypeProperties(positionEventType: any) {
  const position = await positionEventType.getPosition()
  // const eventType = await positionEventType.getEventType()
  const positionProperty = position.position
  const positionEventTypeValues = positionEventType.dataValues
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { position_id, ...rest } = positionEventTypeValues
  const modifiedObject: PositionEventType = {
    ...rest,
    position: positionProperty,
  }
  return modifiedObject
}

export default {
  async getAllPositionEventTypes(_req: express.Request, res: express.Response): Promise<void> {
    try {
      const positionEventTypeCollection = await PositionEventType.findAll()
      const modifiedCollection = await Promise.all(
        positionEventTypeCollection.map((positionEventType) => getPositionEventTypeProperties(positionEventType))
      )
      res.status(200).send(JSON.stringify(modifiedCollection))
    } catch (e) {
      res.status(400).send(e)
    }
  },
}
