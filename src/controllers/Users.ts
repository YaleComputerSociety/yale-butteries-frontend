import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import { User } from 'src/models/user'
import { Position } from 'src/models/position'
import { College } from 'src/models/college'

export async function getAllUsers(_req: Request, res: Response): Promise<void> {
  try {
    const users = await getRepository(User).find({
      join: {
        alias: "user",
        leftJoinAndSelect: {
          "position": "user.position",
          "permissionTypes": "position.permissionTypes",
          "college": "user.college"
        }
      }
    })
    res.send(JSON.stringify(users))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getUser(req: Request, res: Response): Promise<void> {
  try {
    const user = await getRepository(User).findOne(req.params.userId, {
      join: {
        alias: "user",
        leftJoinAndSelect: {
          "position": "user.position",
          "permissionTypes": "position.permissionTypes",
          "college": "user.college"
        }
      }
    })
    res.send(JSON.stringify(user))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { netid, email, name, credit_card_hash, position, college } = req.body
    const newUser = new User()
    newUser.netid = netid
    newUser.email = email
    newUser.name = name
    newUser.credit_card_hash = credit_card_hash
    const associatedPosition = await getRepository(Position).findOne({ position: position })
    const associatedCollege = await getRepository(College).findOne({ college: college })
    newUser.position = associatedPosition
    newUser.college = associatedCollege
    newUser.stats = []
    newUser.transaction_histories = []
    const promise = await getRepository(User).save(newUser)
    res.send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const user = await getRepository(User).findOne(req.body.id)
    if ('netid' in req.body) {
      user.netid = req.body.netid
    }
    if ('email' in req.body) {
      user.email = req.body.email
    }
    if ('name' in req.body) {
      user.name = req.body.name
    }
    if ('credit_card_hash' in req.body) {
      user.credit_card_hash = req.body.credit_card_hash
    }
    const promise = await getRepository(User).save(user)
    res.send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}
