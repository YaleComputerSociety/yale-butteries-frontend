import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAllUsers(_req: Request, res: Response): Promise<void> {
  try {
    const users = await prisma.user.findMany(includeProperty)
    res.send(JSON.stringify(users))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export async function getUser(req: Request, res: Response): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      ...includeProperty,
      where: {
        id: parseInt(req.params.userId),
      },
    })
    res.send(JSON.stringify(user))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { netid, email, name, token, permissions, college_id } = req.body
    const newUser = await prisma.user.create({
      data: {
        netid: netid || undefined,
        email: email || undefined,
        name: name,
        token: token,
        permissions: permissions,
        college: {
          connect: {
            id: parseInt(college_id) || 1,
          },
        },
      },
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
        id: req.body.id,
      },
      data: {
        netid: req.body.netid || undefined,
        email: req.body.email || undefined,
        name: req.body.name || undefined,
      },
    })
    res.send(JSON.stringify(user))
  } catch (e) {
    res.status(400).send(e)
  }
}

const includeProperty = {
  include: {
    college: true,
  },
}
