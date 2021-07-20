import db from '../models/'
import express from 'express'
import { Room } from 'controllers/controllerInterfaces'

const { Room } = db

async function getRoomProperties(room: any) {
  const college = await room.getCollege()
  const collegeProperty = college.college
  const recurrenceTypes = await room.getRecurrenceTypes()
  const recurrenceTypesStrings = recurrenceTypes.map((rt) => rt.type)
  const roomValues = room.dataValues
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { college_id, ...rest } = roomValues
  const modifiedObject: Room = {
    ...rest,
    college: collegeProperty,
    recurrenceTypes: recurrenceTypesStrings,
  }
  return modifiedObject
}

async function getAllRooms(_req: express.Request, res: express.Response): Promise<void> {
  try {
    const roomCollection = await Room.findAll()
    const modifiedCollection = await Promise.all(roomCollection.map((room) => getRoomProperties(room)))
    res.send(JSON.stringify(modifiedCollection))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function getRoom(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.roomId
    const targetRoom = await Room.findByPk(id)
    const modifiedObject = await getRoomProperties(targetRoom)
    res.send(JSON.stringify(modifiedObject))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function updateRoom(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.roomId
    const targetRoom = await Room.findByPk(id)
    if ('room_name' in req.body) {
      targetRoom.room_name = req.body.room_name
    }
    if ('needs_approval' in req.body) {
      targetRoom.needs_approval = req.body.needs_approval
    }
    if ('college_id' in req.body) {
      targetRoom.college_id = req.body.college_id
    }
    const promise = await targetRoom.save()
    res.status(200).send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}

export default {
  getAllRooms,
  getRoom,
  updateRoom,
}
