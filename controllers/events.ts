import db from '../models/'
import express from 'express'

const { Event } = db

async function getEventProperties(event: any) {
  const eventApprovalStatus = await event.getApprovalStatus()
  const statusString = eventApprovalStatus.dataValues.status
  const eventRecurrenceStatus = await event.getRecurrenceType()
  const recurrenceString = eventRecurrenceStatus.dataValues.status
  const modifiedObject = {
    ...event.dataValues,
    approvalStatus: statusString,
    recurrenceStatus: recurrenceString,
  }
  return modifiedObject
}

export default {
  async getAllEvents(_req: express.Request, res: express.Response): Promise<void> {
    try {
      const eventCollection = await Event.findAll()
      const modifiedObjects = await Promise.all(eventCollection.map((event) => getEventProperties(event)))
      res.send(JSON.stringify(modifiedObjects))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async getEvent(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.eventId
      const targetEvent = await Event.findByPk(id)
      const modifiedObject = await getEventProperties(targetEvent)
      res.send(JSON.stringify(modifiedObject))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async deleteEvent(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.eventId
      const targetEvent = await Event.findByPk(id)
      const deletedOccurences = await targetEvent.removeEventOccurrences()
      const deletedEvent = await targetEvent.destroy()
      res.send(JSON.stringify({ event: deletedEvent, occurrences: deletedOccurences }))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async updateEvent(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.eventId
      let targetEvent = await Event.findByPk(id)
      targetEvent = req.body.event
      const promise = await targetEvent.save()
      console.log(promise)
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async addEvent(req: express.Request, res: express.Response): Promise<void> {
    try {
      const newEvent = await Event.create({
        name: req.body.name,
        description: req.body.description,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        event_type_id: req.body.event_type_id,
        room_id: req.body.room_id,
        recurrence_type_id: req.body.recurrence_type_id,
        approval_status_id: req.body.approval_status_id,
      })
      res.status(200).send(JSON.stringify({ message: 'Success', event: newEvent }))
    } catch (e) {
      res.status(400).send(e)
    }
  },
}
