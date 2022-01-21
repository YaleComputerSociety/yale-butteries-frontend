import { Request, Response } from 'express'
import { Intramural } from 'src/models/imgame'
import { getRepository } from 'typeorm'

export async function getAllGames(_: Request, res: Response): Promise<void> {
  try {
    const gameCollection = await getRepository(Intramural).find()
    res.send(JSON.stringify(gameCollection))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getGame(req: Request, res: Response): Promise<void> {
  try {
    const targetGame = await getRepository(Intramural).findOne(req.params.gameId)
    res.send(JSON.stringify(targetGame))
  } catch (e) {
    res.status(400).send(e)
  }
}

// async function updateGame(req: Request, res: Response): Promise<void> {
//   try {
//     const id = req.params.gameId
//     const targetGame = await ImGame.findByPk(id)
//     if ('team_1_score' in req.body) {
//       targetGame.team_1_score = req.body.team_1_score
//     }
//     if ('team_2_score' in req.body) {
//       targetGame.team_2_score = req.body.team_2_score
//     }
//     if ('date' in req.body) {
//       targetGame.date = req.body.date
//     }
//     if ('sport_id' in req.body) {
//       targetGame.sport_id = req.body.sport_id
//     }
//     if ('team_1_key' in req.body) {
//       targetGame.team_1_key = req.body.team_1_key
//     }
//     if ('team_2_key' in req.body) {
//       targetGame.team_2_key = req.body.team_2_key
//     }
//     const promise = await targetGame.save()
//     res.status(200).send(JSON.stringify(promise))
//   } catch (e) {
//     res.status(400).send(e)
//   }
// }

// async function deleteGame(req: Request, res: Response): Promise<void> {
//   try {
//     const id = req.params.gameId
//     const targetGame = await ImGame.findByPk(id)
//     const deletedStats = await targetGame.removeStats()
//     const deletedGame = await targetGame.destroy()
//     res.status(200).send(JSON.stringify({ message: 'Succesful', game: deletedGame, stats: deletedStats }))
//   } catch (e) {
//     res.status(400).send(e)
//   }
// }
