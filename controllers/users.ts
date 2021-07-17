import db from '../models/'
import express from 'express'

const { User } = db

async function getUserProperties(user: any) {
  const userPosition = await user.getPosition()
  const positionProperty = userPosition.dataValues.position
  const userCollege = await user.getCollege()
  const collegeProperty = userCollege.dataValues.college
  const modifiedObject = {
    ...user.dataValues,
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
