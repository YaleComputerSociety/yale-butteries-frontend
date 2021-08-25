import db from '../models'
import express from 'express'
import { User } from './ControllerInterfaces'

const { Position, College, EventType, PositionEventType, User } = db

export async function getAllUsers(_req: express.Request, res: express.Response): Promise<void> {
  try {
    const userCollection = await User.findAll(enumInclude)
    const modifiedObjects = await Promise.all(userCollection.map((user) => getUserProperties(user, 'normal')))
    res.send(JSON.stringify(modifiedObjects))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getUser(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.userId
    const targetUser = await User.findByPk(id, enumInclude)
    const modifiedObject = await getUserProperties(targetUser, 'normal')
    res.send(JSON.stringify(modifiedObject))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getTestUser(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.userId
    const targetUser = await User.findByPk(id, enumInclude)
    const modifiedObject = await getUserProperties(targetUser, 'me')
    res.send(JSON.stringify(modifiedObject))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateUser(req: express.Request, res: express.Response): Promise<void> {
  try {
    // const id = req.params.userId
    const targetUser = await User.findByPk(req.body.id)
    if ('name' in req.body) {
      targetUser.name = req.body.name
    }
    const promise = await targetUser.save()
    res.send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function deleteUser(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.userId
    const targetUser = await User.findByPk(id)
    const deletedUser = await targetUser.destroy()
    res.status(200).send(JSON.stringify({ mesesage: 'Success', user: deletedUser }))
  } catch (e) {
    res.status(400).send(e)
  }
}

const enumInclude = {
  include: [
    { model: Position, as: 'position' },
    { model: College, as: 'college' },
  ],
}

async function getEventType(event_type: number) {
  const eventTypeString = await EventType.findByPk(event_type)
  const eventTypeProperty = eventTypeString.type
  return eventTypeProperty
}

async function getUserProperties(user: any, type: string) {
  let eventTypes
  if (type === 'me') {
    const eventTypeArray = await PositionEventType.findAll({
      where: {
        position_id: user.position_id,
      },
      attributes: ['event_type_id'],
    })
    eventTypes = await Promise.all(eventTypeArray.map((e) => getEventType(e.event_type_id)))
  }
  const positionProperty = user.position.position
  const collegeProperty = user.college.college
  const userValues = user.dataValues

  const { position_id, college_id, ...rest } = userValues
  const modifiedObject: User =
    type === 'me'
      ? {
          ...rest,
          position: positionProperty,
          college: collegeProperty,
          event_types: eventTypes,
        }
      : {
          ...rest,
          position: positionProperty,
          college: collegeProperty,
        }
  return modifiedObject
}
