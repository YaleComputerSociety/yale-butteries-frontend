'use strict'
// import ImGame from '../models'

import db from '../models/'

const { ImGame } = db

interface Stats {
  name: string
  isUser: boolean
  points: number
  rebounds: number
  assists: number
}

interface Game {
  date: Date
  college_1: string
  college_2: string
  sport: string
  stat: Stats[]
  team_1_score: number
  team_2_score: number
}

// TODO: Just make app.ts grab a single object from the database. Endpoint, testing, ping it, Grab an object from the database.
// Console.log the actual object
// return a string or osmethign simple, look at terminal and see the console.log, see what theo bject looks like, get a method that allows you to grab the college. two methods, object has methods attached to it
// model ImGames.findbyid

export default {
  async getAllGames(req: any, res: any): Promise<void> {
    try {
      const gameCollection = await ImGame.findAll()
      const games = []
      for (let i = 0; i < gameCollection.length; i++) {
        const relatedSport = await gameCollection[i].getSport()
        const collegeOne = await gameCollection[i].getTeam1()
        const collegeTwo = await gameCollection[i].getTeam2()
        const modifiedSport = relatedSport.dataValues.sport
        const modifiedCollegeOne = collegeOne.dataValues.college
        const modifiedCollegeTwo = collegeTwo.dataValues.college
        const modifiedObject = JSON.stringify({
          ...gameCollection[i].dataValues,
          sport: modifiedSport,
          teamOne: modifiedCollegeOne,
          teamTwo: modifiedCollegeTwo,
        })
        console.log(modifiedObject)
        games.push(modifiedObject)
      }
      res.send(games)
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async getGame(req: any, res: any): Promise<void> {
    try {
      const id = req.params.gameId
      const targetGame = await ImGame.findByPk(id)
      const relatedSport = await targetGame.getSport()
      const collegeOne = await targetGame.getTeam1()
      const collegeTwo = await targetGame.getTeam2()
      const modifiedSport = relatedSport.dataValues.sport
      const modifiedCollegeOne = collegeOne.dataValues.college
      const modifiedCollegeTwo = collegeTwo.dataValues.college
      res.send(
        JSON.stringify({
          ...targetGame.dataValues,
          sport: modifiedSport,
          teamOne: modifiedCollegeOne,
          teamTwo: modifiedCollegeTwo,
        })
      )
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
