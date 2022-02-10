import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAllUsers(_req: Request, res: Response): Promise<void> {
  try {
    const users = await prisma.user.findMany({
      include: {
        position: {
          include: {
            permission_types: true
          }
        },
        college: true,
      }
    })
    res.send(JSON.stringify(users))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getUser(req: Request, res: Response): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.userId
      },
      include: {
        position: {
          include: {
            permission_types: true
          }
        },
        college: true,
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
    const associatedPosition = await prisma.position.findUnique({
      where: {
        position: position
      }
    })
    const associatedCollege = await prisma.college.findUnique({
      where: {
        collge: college
      }
    })
    const newUser = await prisma.user.create({
      data: {
        netid: netid,
        email: email,
        name: name,
        credit_card_hash: credit_card_hash,
        transaction_histories: [],
        position: associatedPosition,
        college: associatedCollege,
      }
    })
    res.send(JSON.stringify(newUser))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const user = await prisma.user.update({
      where: {
        id: req.body.id
      },
      data: {
        netid: req.body.netid || undefined,
        email: req.body.email || undefined,
        name: req.body.name || undefined,
        credit_card_hash: req.body.credit_card_hash || undefined
      }
    })
    res.send(JSON.stringify(user))
  } catch (e) {
    res.status(400).send(e)
  }
}
