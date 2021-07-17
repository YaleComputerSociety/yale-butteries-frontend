import db from '../models/'
import express from 'express'
import { RoomRecurrenceType } from 'controllers/controllerInterfaces'

const { RecurrenceType, RoomRecurrenceType } = db

async function getRoomRecurrenceTypeProperties(rrType: any) {
  const recurrenceTypePromise = await RecurrenceType.findByPk(rrType.recurrence_type_id)
  const recurrenceTypeProperty = recurrenceTypePromise.type
  const rrTypeValues = rrType.dataValues
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { recurrence_type_id, ...rest } = rrTypeValues
  const modifiedObject: RoomRecurrenceType = {
    ...rest,
    recurrenceType: recurrenceTypeProperty,
  }
  return modifiedObject
}

export default {
  async getAllRoomRecurrenceTypes(_req: express.Request, res: express.Response): Promise<void> {
    try {
      const roomRecurrenceTypeCollection = await RoomRecurrenceType.findAll()
      const modifiedCollection = await Promise.all(
        roomRecurrenceTypeCollection.map((roomRecurrenceType) => getRoomRecurrenceTypeProperties(roomRecurrenceType))
      )
      res.status(200).send(JSON.stringify(modifiedCollection))
    } catch (e) {
      res.status(400).send(e)
    }
  },
}
