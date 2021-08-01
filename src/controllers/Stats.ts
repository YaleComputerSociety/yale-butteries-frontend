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

export async function getAllStats(_req: express.Request, res: express.Response): Promise<void> {
  try {
    const statCollection = await Stat.findAll()
    const modifiedObjects = statCollection.map((stat) => getStatValues(stat))
    res.send(JSON.stringify(modifiedObjects))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getStat(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.statId
    const targetStat = await Stat.findByPk(id)
    const modifiedObject = getStatValues(targetStat)
    res.send(JSON.stringify(modifiedObject))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateStat(req: express.Request, res: express.Response): Promise<void> {
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
    const promise = await targetStat.save()
    res.send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function deleteStat(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.statId
    const targetStat = await Stat.findByPk(id)
    const deletedStat = await targetStat.destroy()
    res.send(JSON.stringify({ message: 'Success', stat: deletedStat }))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function addStat(req: express.Request, res: express.Response): Promise<void> {
  try {
    const { points, rebounds, assists, imgame_id, user_id } = req.body
    const createdStat = await Stat.create({
      points: points,
      rebounds: rebounds,
      assists: assists,
      imgame_id: imgame_id,
      user_id: user_id,
      created_at: new Date(),
      updated_at: new Date(),
    })
    res.send(JSON.stringify({ message: 'Success', stat: createdStat }))
  } catch (e) {
    res.status(400).send(e)
  }
}
