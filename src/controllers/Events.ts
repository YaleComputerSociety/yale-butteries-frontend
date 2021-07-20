import db from '../models'
import express from 'express'
import { Event } from './ControllerInterfaces'

const { Event } = db

async function getEventProperties(event: any) {
  const [eventType, recurrenceType, approvalStatus] = await Promise.all([
    event.getEventType(),
    event.getRecurrenceType(),
    event.getApprovalStatus(),
  ])
  const eventTypeProperty = eventType.type
  const recurrenceTypeProperty = recurrenceType.type
  const approvalStatusProperty = approvalStatus.status
  const eventValues = event.dataValues
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { event_type_id, recurrence_type_id, approval_status_id, ...rest } = eventValues
  const modifiedObject: Event = {
    ...rest,
    eventType: eventTypeProperty,
    recurrenceType: recurrenceTypeProperty,
    approvalStatus: approvalStatusProperty,
  }
  return modifiedObject
}

async function getAllEvents(_req: express.Request, res: express.Response): Promise<void> {
  try {
    const eventCollection = await Event.findAll()
    const modifiedCollection = await Promise.all(eventCollection.map((event) => getEventProperties(event)))
    res.send(JSON.stringify(modifiedCollection))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function getEvent(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.eventId
    const targetEvent = await Event.findByPk(id)
    const modifiedObject = await getEventProperties(targetEvent)
    res.send(JSON.stringify(modifiedObject))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function updateEvent(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.eventId
    const targetEvent = await Event.findByPk(id)
    if ('name' in req.body) {
      targetEvent.name = req.body.name
    }
    if ('description' in req.body) {
      targetEvent.description = req.body.description
    }
    if ('room_id' in req.body) {
      targetEvent.room_id = req.body.room_id
    }
    if ('user_id' in req.body) {
      targetEvent.user_id = req.body.user_id
    }
    if ('event_type_id' in req.body) {
      targetEvent.event_type_id = req.body.event_type_id
    }
    if ('recurrence_type_id' in req.body) {
      targetEvent.recurrence_type_id = req.body.recurrence_type_id
    }
    if ('approval_status_id' in req.body) {
      targetEvent.approval_status_id = req.body.approval_status_id
    }
    const promise = await targetEvent.save()
    res.status(200).send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}

export default {
  getAllEvents,
  getEvent,
  updateEvent,
}
