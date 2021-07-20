import db from '../models'
import express from 'express'
import { Stat } from './ControllerInterfaces'

const { Stat } = db

function getStatValues(stat: any) {
  const modifiedStat: Stat = {
    ...stat.dataValues,
  }
  return modifiedStat
}

async function getAllStats(_req: express.Request, res: express.Response): Promise<void> {
  try {
    const statCollection = await Stat.findAll()
    const modifiedObjects = statCollection.map((stat) => getStatValues(stat))
    res.send(JSON.stringify(modifiedObjects))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function getStat(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.statId
    const targetStat = await Stat.findByPk(id)
    const modifiedObject = getStatValues(targetStat)
    res.send(JSON.stringify(modifiedObject))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function updateStat(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.statId
    const targetStat = await Stat.findByPk(id)
    if ('points' in req.body) {
      targetStat.points = req.body.points
    }
    if ('rebounds' in req.body) {
      targetStat.rebounds = req.body.rebounds
    }
    if ('assists' in req.body) {
      targetStat.assists = req.body.assists
    }
    if ('imgame_id' in req.body) {
      targetStat.imgame_id = req.body.imgame_id
    }
    if ('user_id' in req.body) {
      targetStat.user_id = req.body.user_id
    }
    const promise = await targetStat.save()
    res.send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}

export default {
  getAllStats,
  getStat,
  updateStat,
}
