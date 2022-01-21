import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import { College } from 'src/models/college';

export async function getAllColleges(_: Request, res: Response): Promise<void> {
  try {
    const colleges = await getRepository(College).find({
      join: {
        alias: "college",
        leftJoinAndSelect: {
          "users": "college.users",
          "transaction_histories": "college.transaction_histories",
          "menu_items": "college.menu_items",
          "ingredients": "college.ingredients"
        }
      }
    });
    res.send(JSON.stringify(colleges))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getCollege(req: Request, res: Response): Promise<void> {
  try {
    const college = await getRepository(College).findOne(req.params.collegeId, {
      join: {
        alias: "college",
        leftJoinAndSelect: {
          "users": "college.users",
          "transaction_histories": "college.transaction_histories",
          "menu_items": "college.menu_items",
          "ingredients": "college.ingredients"
        }
      }
    })
    res.send(JSON.stringify(college))
  } catch (e) {
    res.status(400).send(e)
  }
}

// export async function updateCollege(req: Request, res: Response): Promise<void> {
//   try {
//     const targetCollege = await getRepository(College).findOne(req.body.id)
//     if ('college' in req.body) {
//       targetCollege.college = req.body.college
//     }
//     if ('image_url' in req.body) {
//       targetCollege.image_url = req.body.image_url
//     }
//     if ('buttery_activated' in req.body) {
//       targetCollege.buttery_activated = req.body.buttery_activated
//     }
//     const promise = await getRepository(College).save(targetCollege)
//     res.send(JSON.stringify(promise))
//   } catch (e) {
//     res.status(400).send(e)
//   }
// }
