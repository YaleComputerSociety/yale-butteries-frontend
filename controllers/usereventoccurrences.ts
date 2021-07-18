import db from '../models'
import express from 'express'
import { UserEventOccurrence } from 'controllers/controllerInterfaces'

const { UserEventOccurrence } = db

async function getUserEventOccurrenceValues(userEventOccurrence: any) {
  const attendanceStatus = await userEventOccurrence.getAttendanceStatus()
  const statusProperty = attendanceStatus.status
  const ueoValues = userEventOccurrence.dataValues
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { attendance_status_id, ...rest } = ueoValues
  const modifiedObject: UserEventOccurrence = {
    ...rest,
    attendanceStatus: statusProperty,
  }
  return modifiedObject
}

async function getAllUserEventOccurrences(_req: express.Request, res: express.Response): Promise<void> {
  try {
    const userEventOccurrenceCollection = await UserEventOccurrence.findAll()
    const modifiedObjects = await Promise.all(
      userEventOccurrenceCollection.map((userEventOccurrence) => getUserEventOccurrenceValues(userEventOccurrence))
    )
    res.send(JSON.stringify(modifiedObjects))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function getUserEventOccurrence(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.userEventOccurrenceId
    const targetUserEventOccurrence = await UserEventOccurrence.findByPk(id)
    const modifiedObject = await getUserEventOccurrenceValues(targetUserEventOccurrence)
    res.send(JSON.stringify(modifiedObject))
  } catch (e) {
    res.status(400).send(e)
  }
}

export default {
  getAllUserEventOccurrences,
  getUserEventOccurrence,
}
