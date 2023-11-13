import { Request, Response } from 'express'

import prisma from '../prismaClient'
import { backToFrontOrders, getCollegeFromName } from './Orders'
import { stripe } from './Payments'
import { UserDto } from '../utils/dtos'

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
      include: {
        college: true,
        orders: true,
      },
      where: {
        id: req.params.userId,
      },
    })

    let recentOrder = null
    let currentOrder = null

    if (user.orders.length > 0) {
      recentOrder = user.orders[user.orders.length - 1]
      const modifiedRecentOrder = (await backToFrontOrders([recentOrder], user.college.name))[0]
      if (recentOrder) {
        const lifetime = Math.abs(new Date().getTime() - recentOrder.order_placed.getTime()) / 36e5
        currentOrder = lifetime < 6 ? modifiedRecentOrder : null
      }
    }

    const frontUser = {
      college: user.college.name,
      id: user.id,
      permissions: user.role,
      token: user.token,
      name: user.name,
      email: user.email,
      currentOrder: currentOrder,
    }
    res.send(JSON.stringify(frontUser))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { netid, email, name, token, permissions, college } = req.body

    if (!netid) {
      res.status(400).send('Required fields are missing')
      return
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        netId: req.body.netid,
      },
      include: {
        college: true,
      },
    })
    console.log(existingUser)

    if (existingUser) {
      const frontUser: UserDto = {
        email: existingUser.email,
        netid: existingUser.netId,
        name: existingUser.name,
        permissions: existingUser.role,
        college: existingUser.college.name,
        id: existingUser.id,
      }

      res.send(JSON.stringify(frontUser))
      return
    }

    const collegeData = await getCollegeFromName(req.body.college)

    const newUser = await prisma.user.create({
      data: {
        netId: req.body.netid || undefined,
        email: req.body.email || undefined,
        name: req.body.name,
        token: req.body.token || undefined,
        role: req.body.permissions || 'customer',
        college: {
          connect: {
            id: collegeData.id || 1,
          },
        },
      },
    })

    await stripe.customers.create({
      email: req.body.email,
      name: req.body.name,
      metadata: { userId: newUser.id },
    })

    const frontUser: UserDto = {
      email: newUser.email,
      netid: newUser.netId,
      name: newUser.name,
      permissions: 'customer',
      college: req.body.college,
      id: newUser.id,
    }

    console.log(frontUser)
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
        netId: req.body.netid || undefined,
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
        id: '3',
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
