import db from '../models/'
import express from 'express'
import { Game } from 'controllers/controllerInterfaces'

const { ImGame } = db

async function getGameProperties(game: any) {
  const [sport, collegeOne, collegeTwo] = await Promise.all([game.getSport(), game.getTeam1(), game.getTeam2()])
  const modifiedSport = sport.sport
  const modifiedCollegeOne = collegeOne.college
  const modifiedCollegeTwo = collegeTwo.college
  const gameValues = game.dataValues
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { team_1_key, team_2_key, sport_id, ...rest } = gameValues
  const modifiedObject: Game = {
    ...rest,
    sport: modifiedSport,
    teamOne: modifiedCollegeOne,
    teamTwo: modifiedCollegeTwo,
  }
  return modifiedObject
}

async function getAllGames(_req: express.Request, res: express.Response): Promise<void> {
  try {
    const gameCollection = await ImGame.findAll()
    const modifiedObjects = await Promise.all(gameCollection.map((game) => getGameProperties(game)))
    res.send(JSON.stringify(modifiedObjects))
  } catch (e) {
    res.status(400).send(e)
  }
}

async function getGame(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = req.params.gameId
    const targetGame = await ImGame.findByPk(id)
    const modifiedObject = await getGameProperties(targetGame)
    res.send(JSON.stringify(modifiedObject))
  } catch (e) {
    res.status(400).send(e)
  }
}

export default {
  getAllGames,
  getGame,
}
