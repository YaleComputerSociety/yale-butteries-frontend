import db from '../models'
import express from 'express'
import { UserEventOccurrence } from './ControllerInterfaces'

const { AttendanceStatus, UserEventOccurrence } = db

async function getUserEventOccurrenceValues(userEventOccurrence: any) {
  const statusProperty = userEventOccurrence.attendanceStatus.status
  const ueoValues = userEventOccurrence.dataValues
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { attendance_status_id, ...rest } = ueoValues
  const modifiedObject: UserEventOccurrence = {
    ...rest,
    attendanceStatus: statusProperty,
  }
  return modifiedObject
}

const enumInclude = {
  include: [{ model: AttendanceStatus, as: 'attendanceStatus' }],
}

export async function getAllUserEventOccurrences(_req: express.Request, res: express.Response): Promise<void> {
  try {
    const userEventOccurrenceCollection = await UserEventOccurrence.findAll(enumInclude)
    const modifiedObjects = await Promise.all(
      userEventOccurrenceCollection.map((userEventOccurrence) => getUserEventOccurrenceValues(userEventOccurrence))
    )
    res.send(JSON.stringify(modifiedObjects))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getUserEventOccurrence(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.userEventOccurrenceId
    const targetUserEventOccurrence = await UserEventOccurrence.findByPk(id, enumInclude)
    const modifiedObject = await getUserEventOccurrenceValues(targetUserEventOccurrence)
    res.send(JSON.stringify(modifiedObject))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateUserEventOccurrence(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.userEventOccurrenceId
    const targetUserEventOccurrence = await UserEventOccurrence.findByPk(id)
    if ('attendance_status_id' in req.body) {
      targetUserEventOccurrence.attendance_status_id = req.body.attendance_status_id
    }
    const promise = await targetUserEventOccurrence.save()
    res.send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function deleteUserEventOccurrence(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.userEventOccurrenceId
    const targetUserEventOccurrence = await UserEventOccurrence.findByPk(id)
    const deletedUserEventOccurrence = await targetUserEventOccurrence.destroy()
    res.status(200).send(JSON.stringify({ message: 'Deleted', userEventOccurrence: deletedUserEventOccurrence }))
  } catch (e) {
    res.status(400).send(e)
  }
}
