// import { getRepository } from 'typeorm'
// import { Request, Response } from 'express'
// import { Day } from 'src/models/day';

// // TODO: Create function.

// export async function getAllDays(_: Request, res: Response): Promise<void> {
//   try {
//     const days = await getRepository(Day).find();
//     res.send(JSON.stringify(days))
//   } catch (e) {
//     res.status(400).send(e)
//   }
// }

// export async function getDay(req: Request, res: Response): Promise<void> {
//   try {
//     const targetDay = await getRepository(Day).findOne(req.params.dayId)
//     res.send(JSON.stringify(targetDay))
//   } catch (e) {
//     res.status(400).send(e)
//   }
// }
