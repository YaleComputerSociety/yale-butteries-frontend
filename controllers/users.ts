import db from '../models/'
import express from 'express'
import { User } from 'controllers/controllerInterfaces'

const { EventType, PositionEventType, User } = db

async function getEventType(event_type: number) {
  const eventTypeString = await EventType.findByPk(event_type)
  const eventTypeProperty = eventTypeString.type
  return eventTypeProperty
}

async function getPermissionUserProperties(user: any) {
  const [userPosition, userCollege] = await Promise.all([user.getPosition(), user.getCollege()])
  const positionProperty = userPosition.position
  const collegeProperty = userCollege.college
  const eventTypeArray = await PositionEventType.findAll({
    where: {
      position_id: user.position_id,
    },
    attributes: ['event_type_id'],
  })
  const eventTypes = await Promise.all(eventTypeArray.map((e) => getEventType(e.event_type_id)))
  const userValues = user.dataValues
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { position_id, college_id, ...rest } = userValues
  const modifiedObject: User = {
    ...rest,
    position: positionProperty,
    college: collegeProperty,
    eventTypes: eventTypes,
  }
  return modifiedObject
}

async function getUserProperties(user: any) {
  const [userPosition, userCollege] = await Promise.all([user.getPosition(), user.getCollege()])
  const positionProperty = userPosition.position
  const collegeProperty = userCollege.college
  const userValues = user.dataValues
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { position_id, college_id, ...rest } = userValues
  const modifiedObject: User = {
    ...rest,
    position: positionProperty,
    college: collegeProperty,
  }
  return modifiedObject
}

export default {
  async getAllUsers(_req: express.Request, res: express.Response): Promise<void> {
    try {
      const userCollection = await User.findAll()
      const modifiedObjects = await Promise.all(userCollection.map((user) => getUserProperties(user)))
      res.send(JSON.stringify(modifiedObjects))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async getUser(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.userId
      const targetUser = await User.findByPk(id)
      const modifiedObject = await getUserProperties(targetUser)
      res.send(JSON.stringify(modifiedObject))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async getTestUser(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.userId
      const targetUser = await User.findByPk(id)
      const modifiedObject = await getPermissionUserProperties(targetUser)
      res.send(JSON.stringify(modifiedObject))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async updateUser(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.userId
      let targetUser = await User.findByPk(id)
      targetUser = {
        ...targetUser,
        netid: req.body.netid,
        name: req.body.name,
        position_id: req.body.position_id,
        college_id: req.body.college_id,
        user_id: req.body.user_id,
      }
      const promise = await targetUser.save()
      res.send(JSON.stringify(promise))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async deleteUser(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.userId
      const targetUser = await User.findByPk(id)
      const deleted = await targetUser.destroy()
      res.status(200).send(JSON.stringify(deleted))
    } catch (e) {
      res.status(400).send(e)
    }
  },
}
