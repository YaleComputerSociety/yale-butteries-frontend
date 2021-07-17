'use strict'

import db from '../models/'
import express from 'express'

const { Stat, ImGame } = db

interface Stats {
  name: string
  isUser: boolean
  points: number
  rebounds: number
  assists: number
}

interface Game {
  id: number
  date: string
  college_1: string
  college_2: string
  sport: string
  stat: Stats[]
  team_1_score: number
  team_2_score: number
  createdAt: Date
  updatedAt: Date
}

async function getGameProperties(game: any) {
  const relatedSport = await game.getSport()
  const collegeOne = await game.getTeam1()
  const collegeTwo = await game.getTeam2()
  const modifiedSport = relatedSport.dataValues.sport
  const modifiedCollegeOne = collegeOne.dataValues.college
  const modifiedCollegeTwo = collegeTwo.dataValues.college
  const modifiedObject = {
    ...game.dataValues,
    sport: modifiedSport,
    teamOne: modifiedCollegeOne,
    teamTwo: modifiedCollegeTwo,
  }
  return modifiedObject
}

// TODO: Just make app.ts grab a single object from the database. Endpoint, testing, ping it, Grab an object from the database.
// Console.log the actual object
// return a string or osmethign simple, look at terminal and see the console.log, see what theo bject looks like, get a method that allows you to grab the college. two methods, object has methods attached to it
// model ImGames.findbyid

export default {
  async getAllGames(_req: express.Request, res: express.Response): Promise<void> {
    try {
      const gameCollection = await ImGame.findAll()
      const modifiedObjects = await Promise.all(gameCollection.map((game) => getGameProperties(game)))
      res.send(JSON.stringify(modifiedObjects))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async getGame(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.gameId
      const targetGame = await ImGame.findByPk(id)
      const modifiedObject = await getGameProperties(targetGame)
      res.send(JSON.stringify(modifiedObject))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async deleteGame(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.eventId
      const targetGame = await ImGame.findByPk(id)
      const deletedStats = await ImGame.removeStats()
      const deletedGame = await targetGame.destroy()
      res.status(200).send(JSON.stringify({ game: deletedGame, stats: deletedStats }))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async updateGame(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.eventId
      let targetGame = await ImGame.findByPk(id)
      targetGame = {
        ...targetGame,
        team_1_score: req.body.team_1_score,
        team_2_score: req.body.team_2_score,
        date: req.body.date,
        team_1_key: req.body.team_1_key,
        team_2_key: req.body.team_2_key,
        sport_id: req.body.sport_id,
        imgame_id: req.body.imgame_id,
      }
      const promise = await targetGame.save()
      res.status(200).send(JSON.stringify(promise))
    } catch (e) {
      res.status(400).send(e)
    }
  },
  // Look into doing all of the await requests in one move
  // Efficient: 4 Requests, Wrap it into a promise array
  async addGame(req: express.Request, res: express.Response): Promise<void> {
    try {
      const newGame = await ImGame.create(
        {
          team_1_score: req.body.teamOneScore,
          team_2_score: req.body.teamTwoScore,
          date: req.body.date,
          sport_id: req.body.sport_id,
          team_1_key: req.body.team_1_key,
          team_2_key: req.body.team_2_key,
          stats: [req.body.stat_team_1, req.body.stat_team_2],
        },
        {
          include: [
            {
              association: Stat,
              as: 'stats',
            },
          ],
        }
      )
      res.send(JSON.stringify({ message: 'Success', game: newGame }))
    } catch (e) {
      res.status(400).send(e)
    }
  },
}

// Some call that returns things as a JSON to a user
// const imGame = Intramural.get(5)
/**
 * const respObj = {
 *  date: imGame.date
 *  college_1: imGame.college_1,
 * }
 */
// Make a typescript interface
/**
 * interface stats {
 *  name: string
 * is_user: boolean
 * }
 *
 * interface {
 *  date: string (Check the correct)
 *  college_1: string
 *  college_2: string
 *  sport: string
 *  stat: stats[]
 * }
 *
 * if(true) {
 *  respObj.stats = foo (append things to this object)
 * }
 */

// Two ways to handle this in architecture: API could have totally reflected what is in the Database
// 8 or 9 resources from the db, frontend response to grab from the resources
// No luxury

// Test all seeders with IM Games
// Go into sequelize and learn how to grab stuff
