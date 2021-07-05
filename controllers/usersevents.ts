import db from '../models'

const { UsersEvent } = db

export default {
  async getAllUsersEvents(req: any, res: any): Promise<void> {
    try {
      const usersEventCollection = await UsersEvent.findAll()
      const usersEvents = []
      for (let i = 0; i < usersEventCollection.length; i++) {
        const eventApprovalStatus = await usersEventCollection[i].getApprovalStatus()
        const statusString = eventApprovalStatus.dataValues.status
        const eventRelationship = await usersEventCollection[i].getRelationship()
        const relationshipString = eventRelationship.dataValues.relationship
        const modifiedObject = {
          ...usersEventCollection[i].dataValues,
          approvalStatus: statusString,
          relationshipStatus: relationshipString,
        }
        usersEvents.push(modifiedObject)
      }
      res.send(usersEventCollection)
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async getUsersEvent(req: any, res: any): Promise<void> {
    try {
      const id = req.params.usersEventId
      const targetUsersEvent = await UsersEvent.findByPk(id)
      const eventApprovalStatus = await targetUsersEvent.getApprovalStatus()
      const statusString = eventApprovalStatus.dataValues.status
      const eventRelationship = await targetUsersEvent.getRelationship()
      const relationshipString = eventRelationship.dataValues.relationship
      res.send(
        JSON.stringify({
          ...targetUsersEvent.dataValues,
          approvalStatus: statusString,
          relationshipStatus: relationshipString,
        })
      )
    } catch (e) {
      res.status(400).send(e)
    }
  },
}
