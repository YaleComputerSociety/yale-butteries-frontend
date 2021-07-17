import db from '../models'
import express from 'express'

const { UsersEvent } = db

function getUserEventProperties(userEvent: any) {
  const modifiedObject = {
    ...userEvent.dataValues,
  }
  return modifiedObject
}

export default {
  async getAllUsersEvents(_req: express.Request, res: express.Response): Promise<void> {
    try {
      const usersEventCollection = await UsersEvent.findAll()
      const modifiedObjects = usersEventCollection.map((usersEvent) => getUserEventProperties(usersEvent))
      res.send(JSON.stringify(modifiedObjects))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async getUsersEvent(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.usersEventId
      const targetUsersEvent = await UsersEvent.findByPk(id)
      const modifiedObject = getUserEventProperties(targetUsersEvent)
      res.send(
        JSON.stringify({
          modifiedObject,
        })
      )
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async deleteUsersEvent(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.usersEventId
      const targetUsersEvent = await UsersEvent.findByPk(id)
      const promise = await targetUsersEvent.destroy()
      console.log(promise)
    } catch (e) {
      res.status(400).send(e)
    }
  },
}
