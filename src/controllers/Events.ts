import db from '../models'
import { Request, Response } from 'express'

// eslint-disable-next-line import/no-unresolved
import { ParamsDictionary } from 'express-serve-static-core'
import { Event } from './ControllerInterfaces'

const { EventType, RecurrenceType, ApprovalStatus, Event, EventOccurrence } = db

async function getEventProperties(event: any) {
  const eventTypeProperty = event.eventType.type
  const recurrenceTypeProperty = event.recurrenceType.type
  const approvalStatusProperty = event.approvalStatus.status
  const eventValues = event.dataValues
  const { event_type_id, recurrence_type_id, approval_status_id, ...rest } = eventValues
  const modifiedObject: Event = {
    ...rest,
    event_type: eventTypeProperty,
    recurrence_type: recurrenceTypeProperty,
    approval_status: approvalStatusProperty,
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

export async function getAllEvents(_: Request, res: Response): Promise<void> {
  try {
    const eventCollection = await Event.findAll(enumInclude)
    const modifiedCollection = await Promise.all(eventCollection.map((event) => getEventProperties(event)))
    res.send(JSON.stringify(modifiedCollection))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getEvent(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.eventId
    const targetEvent = await Event.findByPk(id, enumInclude)
    const modifiedObject = await getEventProperties(targetEvent)
    res.send(JSON.stringify(modifiedObject))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function addEventOccurrences(ed, cycle, event) {
  const est = event.first_start_timestamp
  const duration = event.first_end_tirestamp - est
  try {
    for (est; est < ed; est.setDate(est.getDate() + cycle)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const createdEventOccurrence = await EventOccurrence.create({
        event_id: event.id,
        description: event.description,
        start_time: est,
        end_time: est + duration,
      })
    }
  } catch (e) {
    console.log(e)
  }
}

// Check overlap, don't pass it with a room, get the rooms events before each function, .filter, comparator

// WITH CAS, add constraints. Add event: Pending. logic to check.
export async function addEvent(req: Request<ParamsDictionary, any, Event>, res: Response): Promise<void> {
  try {
    const { name, description, event_type, room_id, recurrence_type, user_id } = req.body
    const event_type_id = await EventType.findOne({ where: { type: event_type } }).id
    const recurrence_type_id = await RecurrenceType.findOne({ where: { type: recurrence_type } }).id
    const createdEvent = await Event.create({
      name: name,
      description: description,
      event_type_id: event_type_id,
      room_id: room_id,
      user_id: user_id,
      recurrence_type_id: recurrence_type_id,
      approval_status_id: 3, // Pending
      created_at: new Date(),
      updated_at: new Date(),
    })
    res.send(JSON.stringify({ message: 'Success', event: createdEvent }))
  } catch (e) {
    res.status(400).send(e)
  }
}

// In long run, allow accepted from anyone.
// Check if the original value from the original record was pending, check if value after it is accepting. check if not accepted, check accepted. if true, run method to create event occurrences. check recurrence type, no recurrence type then just 1, start time starts, december 31 end of semester, keep on adding event occurrences, end_date: nullable, if null, use december 31
export async function updateEvent(req: Request<ParamsDictionary, any, Event>, res: Response): Promise<void> {
  try {
    const id = req.body.id
    const targetEvent = await Event.findByPk(id)
    // !1 = Not Accepted, 1 = Accepted
    let newlyAccepted = false

    if (targetEvent.approval_status_id != 1) {
      targetEvent.approval_status_id = 1
      newlyAccepted = true
    }

    if (newlyAccepted == true) {
      const rt = targetEvent.recurrence_type_id
      const ed = targetEvent.end_date ? targetEvent.end_date : new Date(2021, 12, 31)
      // 1 = Daily, 2 = Weekly, 3 = Monthly
      const cycle = rt === 1 ? 1 : rt === 2 ? 7 : 28
      await addEventOccurrences(ed, cycle, targetEvent)
    }

    if ('name' in req.body) {
      targetEvent.name = req.body.name
    }
    if ('description' in req.body) {
      targetEvent.description = req.body.description
    }
    const promise = await targetEvent.save()
    res.status(200).send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function deleteEvent(req: Request, res: Response): Promise<void> {
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
