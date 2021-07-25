import db from '../models'
import express from 'express'
import { Game } from './ControllerInterfaces'

const { ImGame, Sport, College } = db

async function getGameProperties(game: any) {
  const modifiedSport = game.sport.sport
  const modifiedCollegeOne = game.team1.college
  const modifiedCollegeTwo = game.team2.college
  const gameValues = game.dataValues
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { team_1_key, team_2_key, sport_id, ...rest } = gameValues
  const modifiedObject: Game = {
    ...rest,
    sport: modifiedSport,
    team1: modifiedCollegeOne,
    team2: modifiedCollegeTwo,
  }
  return modifiedObject
}

const enumInclude = {
  include: [
    { model: Sport, as: 'sport' },
    { model: College, as: 'team1' },
    { model: College, as: 'team2' },
  ],
}

async function getAllGames(_req: express.Request, res: express.Response): Promise<void> {
  try {
    const gameCollection = await ImGame.findAll(enumInclude)
    const modifiedObjects = await Promise.all(gameCollection.map((game) => getGameProperties(game)))
    res.send(JSON.stringify(modifiedObjects))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function getGame(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.gameId
    const targetGame = await ImGame.findByPk(id, enumInclude)
    const modifiedObject = await getGameProperties(targetGame)
    res.send(JSON.stringify(modifiedObject))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function updateGame(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.gameId
    const targetGame = await ImGame.findByPk(id)
    if ('team_1_score' in req.body) {
      targetGame.team_1_score = req.body.team_1_score
    }
    if ('team_2_score' in req.body) {
      targetGame.team_2_score = req.body.team_2_score
    }
    if ('date' in req.body) {
      targetGame.date = req.body.date
    }
    if ('sport_id' in req.body) {
      targetGame.sport_id = req.body.sport_id
    }
    if ('team_1_key' in req.body) {
      targetGame.team_1_key = req.body.team_1_key
    }
    if ('team_2_key' in req.body) {
      targetGame.team_2_key = req.body.team_2_key
    }
    const promise = await targetGame.save()
    res.status(200).send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function deleteGame(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.gameId
    const targetGame = await ImGame.findByPk(id)
    const deletedStats = await targetGame.removeStats()
    const deletedGame = await targetGame.destroy()
    res.status(200).send(JSON.stringify({ message: 'Succesful', game: deletedGame, stats: deletedStats }))
  } catch (e) {
    res.status(400).send(e)
  }
}

export default {
  getAllGames,
  getGame,
  updateGame,
  deleteGame,
}
