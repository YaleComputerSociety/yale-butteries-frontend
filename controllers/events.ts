import db from '../models/'

const { Event } = db

export default {
  async getAllEvents(req: any, res: any): Promise<void> {
    try {
      const eventCollection = await Event.findAll()
      const events = []
      for (let i = 0; i < eventCollection.length; i++) {
        const eventApprovalStatus = await eventCollection[i].getApprovalStatus()
        const statusString = eventApprovalStatus.dataValues.status
        const eventRecurrenceStatus = await eventCollection[i].getRecurrenceType()
        const recurrenceString = eventRecurrenceStatus.dataValues.status
        const modifiedObject = {
          ...eventCollection[i].dataValues,
          approvalStatus: statusString,
          recurrenceStatus: recurrenceString,
        }
        events.push(modifiedObject)
      }
      res.send(eventCollection)
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async getEvent(req: any, res: any): Promise<void> {
    try {
      const id = req.params.eventId
      const targetEvent = await Event.findByPk(id)
      const eventApprovalStatus = await targetEvent.getApprovalStatus()
      const statusString = eventApprovalStatus.dataValues.status
      const eventRecurrenceStatus = await targetEvent.getRecurrenceType()
      const recurrenceString = eventRecurrenceStatus.dataValues.status
      res.send(
        JSON.stringify({
          ...targetEvent.dataValues,
          approvalStatus: statusString,
          recurrenceStatus: recurrenceString,
        })
      )
    } catch (e) {
      res.status(400).send(e)
    }
  },
}
