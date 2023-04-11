import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { backToFrontTransactionHistories } from './TransactionHistory'
import { getCollegeFromId } from './TransactionHistory'
import { getCollegeFromName } from './TransactionHistory'

const prisma = new PrismaClient()

export async function getAllUsers(_req: Request, res: Response): Promise<void> {
  try {
    const users = await prisma.user.findMany(includeProperty)
    res.send(JSON.stringify({ users }))
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

    const recentOrder = (
      await prisma.user.findMany({
        select: {
          transaction_histories: {
            orderBy: {
              created_at: 'desc',
            },
            take: 1,
          },
        },
      })
    )[0].transaction_histories
    let currentOrder = null
    const modifiedRecentOrder = (await backToFrontTransactionHistories(recentOrder, user.college.college))[0]
    if (recentOrder.length > 0) {
      const lifetime = Math.abs(new Date().getTime() - recentOrder[0].order_placed.getTime()) / 36e5
      currentOrder = lifetime < 6 ? modifiedRecentOrder : null
    }

    console.log(user.college.college)

    const frontUser = {
      college: user.college.college,
      id: user.id,
      permissions: user.permissions,
      token: user.token,
      name: user.name,
      email: user.email,
      currentOrder: currentOrder,
    }
    console.log(frontUser)
    res.send(JSON.stringify(frontUser))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    console.log(req.body)
    const college = await getCollegeFromName(req.body.college)
    console.log(college.id)

    const newUser = await prisma.user.create({
      data: {
        netid: req.body.netid || undefined,
        email: req.body.email || undefined,
        name: req.body.name,
        token: req.body.token || undefined,
        permissions: req.body.permissions || undefined,
        college: {
          connect: {
            id: college.id || 1,
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

export async function verifyStaffLogin(req: Request, res: Response): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: 3,
      },
    })
    let ret = false
    if (user.name === req.body.username && user.token === req.body.password) {
      ret = true
    }
    res.send(ret)
  } catch (e) {
    res.status(400).send(e)
  }
}
