import db from '../models'
import express from 'express'
import { EventOccurrence } from './ControllerInterfaces'

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

async function updateEventOccurrence(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.eventOccurrenceId
    const targetEventOccurrence = await EventOccurrence.findByPk(id)
    if ('event_id' in req.body) {
      targetEventOccurrence.event_id = req.body.event_id
    }
    if ('description' in req.body) {
      targetEventOccurrence.description = req.body.description
    }
    if ('start_time' in req.body) {
      targetEventOccurrence.start_time = req.body.start_time
    }
    if ('end_time' in req.body) {
      targetEventOccurrence.end_time = req.body.end_time
    }
    const promise = await targetEventOccurrence.save()
    res.status(200).send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}

export default {
  getAllEventOccurrences,
  getEventOccurrence,
  updateEventOccurrence,
}
