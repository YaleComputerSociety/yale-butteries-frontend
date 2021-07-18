import db from '../models/'
import express from 'express'
import { EventOccurrence } from 'controllers/controllerInterfaces'

const { EventOccurrence } = db

function getEventOccurrenceProperties(eventOccurrence: any) {
  const modifiedObject: EventOccurrence = {
    ...eventOccurrence.dataValues,
  }
  return modifiedObject
}

export default {
  async getAllEventOccurrences(_req: express.Request, res: express.Response): Promise<void> {
    try {
      const eventOccurrenceCollection = await EventOccurrence.findAll()
      const modifiedCollection = eventOccurrenceCollection.map((eo) => getEventOccurrenceProperties(eo))
      res.send(JSON.stringify(modifiedCollection))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async getEventOccurrence(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.eventOccurrenceId
      const targetEventOccurrence = await EventOccurrence.findByPk(id)
      const modifiedOccurrence = getEventOccurrenceProperties(targetEventOccurrence)
      res.send(JSON.stringify(modifiedOccurrence))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  // async getRoom(req: express.Request, res: express.Response): Promise<void> {
  //   try {
  //     const id = req.params.roomId
  //     const targetRoom = await Room.findByPk(id)
  //     // const targetRecurrenceTypes = await targetRoom.getRecurrenceTypes()
  //     // console.log(targetRecurrenceTypes.rooms_recurrence_types)
  //     const modifiedObject = await getRoomProperties(targetRoom)
  //     res.send(JSON.stringify(modifiedObject))
  //   } catch (e) {
  //     res.status(400).send(e)
  //   }
  // },
}
