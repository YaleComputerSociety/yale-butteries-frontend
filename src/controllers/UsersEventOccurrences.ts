import db from '../models'
import { Request, Response } from 'express'
import { UserEventOccurrence } from './ControllerInterfaces'

// eslint-disable-next-line import/no-unresolved
import { ParamsDictionary } from 'express-serve-static-core'

const { AttendanceStatus, UserEventOccurrence } = db

export async function getAllUserEventOccurrences(_: Request, res: Response): Promise<void> {
  try {
    const userEventOccurrenceCollection = await UserEventOccurrence.findAll(enumInclude)
    const modifiedObjects = userEventOccurrenceCollection.map((userEventOccurrence) =>
      getUserEventOccurrenceValues(userEventOccurrence)
    )
    res.send(JSON.stringify(modifiedObjects))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getUserEventOccurrence(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.userEventOccurrenceId
    const targetUserEventOccurrence = await UserEventOccurrence.findByPk(id, enumInclude)
    const modifiedObject = await getUserEventOccurrenceValues(targetUserEventOccurrence)
    res.send(JSON.stringify(modifiedObject))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function addUserEventOccurrence(
  req: Request<ParamsDictionary, any, UserEventOccurrence>,
  res: Response
): Promise<void> {
  try {
    const { user_id, event_occurrence_id, attendance_status } = req.body
    const attendance_status_id = await AttendanceStatus.findOne({ where: { status: attendance_status } }).id
    const createdUserEventOccurrence = await UserEventOccurrence.create({
      user_id: user_id,
      event_occurrence_id: event_occurrence_id,
      attendance_status_id: attendance_status_id,
      created_at: new Date(),
      updated_at: new Date(),
    })
    res.send(JSON.stringify({ message: 'Success', UserEventOccurrence: createdUserEventOccurrence }))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateUserEventOccurrence(
  req: Request<ParamsDictionary, any, UserEventOccurrence>,
  res: Response
): Promise<void> {
  try {
    // const id = req.params.userEventOccurrenceId
    const targetUserEventOccurrence = await UserEventOccurrence.findByPk(req.body.id)
    if ('attendance_status' in req.body) {
      const attendance_status_id = await AttendanceStatus.findOne({ where: { status: req.body.attendance_status } }).id
      targetUserEventOccurrence.attendance_status_id = attendance_status_id
    }
    const promise = await targetUserEventOccurrence.save()
    res.send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function deleteUserEventOccurrence(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.userEventOccurrenceId
    const targetUserEventOccurrence = await UserEventOccurrence.findByPk(id)
    const deletedUserEventOccurrence = await targetUserEventOccurrence.destroy()
    res.status(200).send(JSON.stringify({ message: 'Deleted', userEventOccurrence: deletedUserEventOccurrence }))
  } catch (e) {
    res.status(400).send(e)
  }
}

const enumInclude = {
  include: [{ model: AttendanceStatus, as: 'attendanceStatus' }],
}

async function getUserEventOccurrenceValues(userEventOccurrence: any) {
  const statusProperty = userEventOccurrence.attendanceStatus.status
  const ueoValues = userEventOccurrence.dataValues
  const { attendance_status_id, ...rest } = ueoValues
  const modifiedObject: UserEventOccurrence = {
    ...rest,
    attendance_status: statusProperty,
  }
  return modifiedObject
}
