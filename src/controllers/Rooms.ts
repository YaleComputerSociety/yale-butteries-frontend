import db from '../models'
import { Request, Response } from 'express'
import { Room } from './ControllerInterfaces'

const { College, RecurrenceType, Room } = db

async function getRoomProperties(room: any) {
  const collegeProperty = room.college.college
  const recurrenceTypesStrings = room.recurrenceTypes.map((rt) => rt.type)
  const roomValues = room.dataValues
  const { college_id, ...rest } = roomValues
  const modifiedObject: Room = {
    ...rest,
    college: collegeProperty,
    recurrence_types: recurrenceTypesStrings,
  }
  return modifiedObject
}

const enumInclude = {
  include: [
    { model: College, as: 'college' },
    { model: RecurrenceType, as: 'recurrenceTypes' },
  ],
}

export async function getAllRooms(_: Request, res: Response): Promise<void> {
  try {
    const roomCollection = await Room.findAll(enumInclude)
    const modifiedCollection = await Promise.all(roomCollection.map((room) => getRoomProperties(room)))
    res.send(JSON.stringify(modifiedCollection))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getRoom(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.roomId
    const targetRoom = await Room.findByPk(id, enumInclude)
    const modifiedObject = await getRoomProperties(targetRoom)
    res.send(JSON.stringify(modifiedObject))
  } catch (e) {
    res.status(400).send(e)
  }
}

// export async function updateRoom(req: Request, res: Response): Promise<void> {
//   try {
//     const id = req.params.roomId
//     const targetRoom = await Room.findByPk(id)
//     if ('room_name' in req.body) {
//       targetRoom.room_name = req.body.room_name
//     }
//     if ('needs_approval' in req.body) {
//       targetRoom.needs_approval = req.body.needs_approval
//     }
//     if ('college_id' in req.body) {
//       targetRoom.college_id = req.body.college_id
//     }
//     const promise = await targetRoom.save()
//     res.status(200).send(JSON.stringify(promise))
//   } catch (e) {
//     res.status(400).send(e)
//   }
// }

// export async function deleteRoom(req: Request, res: Response): Promise<void> {
//   try {
//     const id = req.params.roomId
//     const targetRoom = await Room.findByPk(id)
//     const deletedRoom = await targetRoom.destroy()
//     res.status(200).send(JSON.stringify({ message: 'Deleted', room: deletedRoom }))
//   } catch (e) {
//     res.status(400).send(e)
//   }
// }
