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

export default {
  getAllStats,
  getStat,
}
