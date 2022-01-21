// import db from '../models'
// import { getRepository } from 'typeorm'
// import { Request, Response } from 'express'
// // import { Stat } from './ControllerInterfaces'

// // eslint-disable-next-line import/no-unresolved
// import { ParamsDictionary } from 'express-serve-static-core'
// import { Stat } from 'src/models/stat'

// // const { Stat } = db

// export async function getAllStats(_: Request, res: Response): Promise<void> {
//   try {
//     const statObjects = await getRepository(Stat).find();
//     res.send(JSON.stringify(statObjects))
//   } catch (e) {
//     res.status(400).send(e)
//   }
// }

// export async function getStat(req: Request, res: Response): Promise<void> {
//   try {
//     const targetStatObject = await getRepository(Stat).findOne(req.params.statId)
//     res.send(JSON.stringify(targetStatObject))
//   } catch (e) {
//     res.status(400).send(e)
//   }
// }

// // export async function addStat(req: Request<ParamsDictionary, any, Stat>, res: Response): Promise<void> {
// //   try {
// //     const { points, rebounds, assists, imgame_id, user_id } = req.body
// //     const createdStat = await Stat.create({
// //       points: points,
// //       rebounds: rebounds,
// //       assists: assists,
// //       imgame_id: imgame_id,
// //       user_id: user_id,
// //       created_at: new Date(),
// //       updated_at: new Date(),
// //     })
// //     res.send(JSON.stringify({ message: 'Success', stat: createdStat }))
// //   } catch (e) {
// //     res.status(400).send(e)
// //   }
// // }

// export async function updateStat(req: Request, res: Response): Promise<void> {
//   try {
//     const targetStat = await getRepository(Stat).findOne(req.body.id)
//     if ('points' in req.body) {
//       targetStat.points = req.body.points
//     }
//     if ('rebounds' in req.body) {
//       targetStat.rebounds = req.body.rebounds
//     }
//     if ('assists' in req.body) {
//       targetStat.assists = req.body.assists
//     }
//     const promise = await getRepository(Stat).save(targetStat)
//     res.send(JSON.stringify(promise))
//   } catch (e) {
//     res.status(400).send(e)
//   }
// }

// export async function deleteStat(req: Request, res: Response): Promise<void> {
//   try {
//     const deletedStat = await getRepository(Stat).delete(req.params.statId)
//     res.send(JSON.stringify({ message: 'Success', stat: deletedStat }))
//   } catch (e) {
//     res.status(400).send(e)
//   }
// }
