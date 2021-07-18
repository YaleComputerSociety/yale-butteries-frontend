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

async function getAllEventOccurrences(_req: express.Request, res: express.Response): Promise<void> {
  try {
    const eventOccurrenceCollection = await EventOccurrence.findAll()
    const modifiedCollection = eventOccurrenceCollection.map((eo) => getEventOccurrenceProperties(eo))
    res.send(JSON.stringify(modifiedCollection))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function getEventOccurrence(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.eventOccurrenceId
    const targetEventOccurrence = await EventOccurrence.findByPk(id)
    const modifiedOccurrence = getEventOccurrenceProperties(targetEventOccurrence)
    res.send(JSON.stringify(modifiedOccurrence))
  } catch (e) {
    res.status(400).send(e)
  }
}

export default {
  getAllEventOccurrences,
  getEventOccurrence,
}
