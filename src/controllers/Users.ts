import db from '../models'
import express from 'express'
import { User } from './ControllerInterfaces'

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

async function getAllUsers(_req: express.Request, res: express.Response): Promise<void> {
  try {
    const userCollection = await User.findAll()
    const modifiedObjects = await Promise.all(userCollection.map((user) => getUserProperties(user)))
    res.send(JSON.stringify(modifiedObjects))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function getUser(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.userId
    const targetUser = await User.findByPk(id)
    const modifiedObject = await getUserProperties(targetUser)
    res.send(JSON.stringify(modifiedObject))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function getTestUser(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.userId
    const targetUser = await User.findByPk(id)
    const modifiedObject = await getPermissionUserProperties(targetUser)
    res.send(JSON.stringify(modifiedObject))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function updateUser(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.userId
    const targetUser = await User.findByPk(id)
    if ('netid' in req.body) {
      targetUser.netid = req.body.netid
    }
    if ('name' in req.body) {
      targetUser.name = req.body.name
    }
    if ('position_id' in req.body) {
      targetUser.position_id = req.body.position_id
    }
    if ('college_id' in req.body) {
      targetUser.college_id = req.body.college_id
    }
    const promise = await targetUser.save()
    res.send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function deleteUser(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.userId
    const targetUser = await User.findByPk(id)
    const deletedUser = await targetUser.destroy()
    res.status(200).send(JSON.stringify({ mesesage: 'Success', user: deletedUser }))
  } catch (e) {
    res.status(400).send(e)
  }
}

export default {
  getAllUsers,
  getUser,
  getTestUser,
  updateUser,
  deleteUser,
}
