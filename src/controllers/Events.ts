import db from '../models'
import express from 'express'
import { Event } from './ControllerInterfaces'

const { EventType, RecurrenceType, ApprovalStatus, Event } = db

async function getEventProperties(event: any) {
  const eventTypeProperty = event.eventType.type
  const recurrenceTypeProperty = event.recurrenceType.type
  const approvalStatusProperty = event.approvalStatus.status
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

const enumInclude = {
  include: [
    { model: EventType, as: 'eventType' },
    { model: RecurrenceType, as: 'recurrenceType' },
    { model: ApprovalStatus, as: 'approvalStatus' },
  ],
}

async function getAllEvents(_req: express.Request, res: express.Response): Promise<void> {
  try {
    const eventCollection = await Event.findAll(enumInclude)
    const modifiedCollection = await Promise.all(eventCollection.map((event) => getEventProperties(event)))
    res.send(JSON.stringify(modifiedCollection))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function getEvent(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.eventId
    const targetEvent = await Event.findByPk(id, enumInclude)
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

async function deleteEvent(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.eventId
    const targetEvent = await Event.findByPk(id)
    const targetEventOccurrences = await targetEvent.removeEventOccurrences()
    const deletedEvent = await targetEvent.destroy()
    res.status(200).send(JSON.stringify({ event: deletedEvent, eventOccurrences: targetEventOccurrences }))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function addEvent(req: express.Request, res: express.Response): Promise<void> {
  try {
    const { name, description, event_type_id, room_id, recurrence_type_id, approval_status_id, user_id } = req.body
    const createdEvent = await Event.create({
      name: name,
      description: description,
      event_type_id: event_type_id,
      room_id: room_id,
      user_id: user_id,
      recurrence_type_id: recurrence_type_id,
      approval_status_id: approval_status_id,
      created_at: new Date(),
      updated_at: new Date(),
    })
    res.send(JSON.stringify({ message: 'Success', event: createdEvent }))
  } catch (e) {
    res.status(400).send(e)
  }
}

export default {
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  addEvent,
}
