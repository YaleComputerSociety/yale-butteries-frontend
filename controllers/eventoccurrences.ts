import db from '../models'
import express from 'express'

const { EventOccurrence } = db

function getEventOccurrenceValues(eventOccurrence: any) {
  const modifiedObject = {
    ...eventOccurrence.dataValues,
  }
  return modifiedObject
}

export default {
  async getAllEventOccurrences(_req: express.Request, res: express.Response): Promise<void> {
    try {
      const eventOccurrenceCollection = await EventOccurrence.findAll()
      const modifiedObjects = eventOccurrenceCollection.map((eventOccurrence) =>
        getEventOccurrenceValues(eventOccurrence)
      )
      res.send(JSON.stringify(modifiedObjects))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async getEventOccurrence(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.eventOccurrenceId
      const targetEventOccurrence = await EventOccurrence.findByPk(id)
      const modifiedObject = await getEventOccurrenceValues(targetEventOccurrence)
      res.send(JSON.stringify(modifiedObject))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async deleteEventOccurrence(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.eventOccurrenceId
      const targetEventOccurrence = await EventOccurrence.findByPk(id)
      const promise = await targetEventOccurrence.destroy()
      res.send(JSON.stringify(promise))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async updateEventOccurrence(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.eventOccurrenceId
      const targetEventOccurrence = await EventOccurrence.findByPk(id)
      targetEventOccurrence.date = req.body.date
      targetEventOccurrence.event_id = req.body.event_id
      const promise = await targetEventOccurrence.save()
      res.send(JSON.stringify(promise))
    } catch (e) {
      res.status(400).send(e)
    }
  },
}
