import db from '../models'
import { Request, Response } from 'express'
import { EventOccurrence } from './ControllerInterfaces'

// eslint-disable-next-line import/no-unresolved
import { ParamsDictionary } from 'express-serve-static-core'

const { EventOccurrence } = db

export async function getAllEventOccurrences(_: Request, res: Response): Promise<void> {
  try {
    const eventOccurrenceCollection = await EventOccurrence.findAll()
    const modifiedCollection = eventOccurrenceCollection.map((eo) => getEventOccurrenceProperties(eo))
    res.send(JSON.stringify(modifiedCollection))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getEventOccurrence(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.eventOccurrenceId
    const targetEventOccurrence = await EventOccurrence.findByPk(id)
    const modifiedOccurrence = getEventOccurrenceProperties(targetEventOccurrence)
    res.send(JSON.stringify(modifiedOccurrence))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateEventOccurrence(
  req: Request<ParamsDictionary, any, EventOccurrence>,
  res: Response
): Promise<void> {
  try {
    // const id = req.params.eventOccurrenceId
    const targetEventOccurrence = await EventOccurrence.findByPk(req.body.id)
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

export async function deleteEventOccurrence(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.eventOccurrenceId
    const targetEventOccurrence = await EventOccurrence.findByPk(id)
    const deletedOccurrence = await targetEventOccurrence.destroy()
    res.send(JSON.stringify(deletedOccurrence))
  } catch (e) {
    res.status(400).send(e)
  }
}

function getEventOccurrenceProperties(eventOccurrence: any) {
  const modifiedObject: EventOccurrence = {
    ...eventOccurrence.dataValues,
  }
  return modifiedObject
}
