import db from '../models/'
import express from 'express'
import { Stat } from 'controllers/controllerInterfaces'

const { Stat } = db

function getStatValues(stat: any) {
  const modifiedStat: Stat = {
    ...stat.dataValues,
  }
  return modifiedStat
}

export default {
  async getAllStats(_req: express.Request, res: express.Response): Promise<void> {
    try {
      const statCollection = await Stat.findAll()
      const modifiedObjects = statCollection.map((stat) => getStatValues(stat))
      res.send(JSON.stringify(modifiedObjects))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async getStat(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.statId
      const targetStat = await Stat.findByPk(id)
      const modifiedObject = getStatValues(targetStat)
      res.send(JSON.stringify(modifiedObject))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  // Check body and expect everything it should have in it update and insert,
  // how to implement it as middleware, function that returns a boolean, formatted incorrectly -> send bad request
  async updateStat(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.statId
      let targetStat = await Stat.findByPk(id)
      targetStat = {
        ...targetStat,
        points: req.body.points,
        rebounds: req.body.rebounds,
        assists: req.body.assists,
        imgame_id: req.body.imgame_id,
        user_id: req.body.user_id,
      }
      const promise = await targetStat.save()
      res.send(JSON.stringify(promise))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async deleteStat(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.statId
      const targetStat = await Stat.findByPk(id)
      const deleted = await targetStat.destroy()
      res.send(JSON.stringify(deleted))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  // async addStat(req: express.Request, res: express.Response): Promise<void> {
  //   try {
  //     const id = req.params.statId
  //     const targetStat = 
  //   } catch (e) {
  //     res.status(400).send(e)
  //   }
  // }
}
