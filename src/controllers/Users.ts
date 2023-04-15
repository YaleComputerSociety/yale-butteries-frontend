import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { backToFrontTransactionHistories } from './TransactionHistory'
import { getCollegeFromId } from './TransactionHistory'
import { getCollegeFromName } from './TransactionHistory'
import { stripe } from './Payments'

const prisma = new PrismaClient()

export interface FrontUser {
  email: string
  netid: string
  name: string
  college: string
  permissions: string
  id: number
  currentOrder?: unknown
}

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
    const college = await getCollegeFromName(req.body.college)
    console.log(req.body)

    const newUser = await prisma.user.create({
      data: {
        netid: req.body.netid || undefined,
        email: req.body.email || undefined,
        name: req.body.name,
        token: req.body.token || undefined,
        permissions: req.body.permissions || 'customer',
        college: {
          connect: {
            id: college.id || 1,
          },
        },
      },
    })

    const stripeUser = await stripe.customers.create({
      email: req.body.email,
      name: req.body.name,
      metadata: { userId: newUser.id },
    })
    console.log(stripeUser)
    console.log('aaaaa')

    const frontUser: FrontUser = {
      email: newUser.email,
      netid: newUser.netid,
      name: newUser.name,
      permissions: 'customer',
      college: req.body.college,
      id: newUser.id,
    }
    console.log('bbbbb')

    res.send(JSON.stringify(frontUser))
  } catch (e) {
    console.log(e)
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
