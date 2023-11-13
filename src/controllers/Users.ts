import { Request, Response } from 'express'

import { UserRole } from '@prisma/client'
import prisma from '../prismaClient'
import { backToFrontOrders } from './Orders'
import { stripe } from './Payments'
import { UserDto } from '../utils/dtos'
import { findUserByNetId, getCollegeFromName, isUserRole } from '../utils/prismaUtils'
import { formatUserDto } from '../utils/dtoConverters'

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

interface CreateUserRequestBody {
  netid: string
  college?: string
  name?: string
  permissions?: string
  email?: string
  token?: string
}

interface NewUserData {
  netId: string
  name: string
  college: {
    connect: {
      id: number
    }
  }
  role?: UserRole
  token?: string
  email?: string
}

async function createUserRecord(data: CreateUserRequestBody) {
  const collegeData = await getCollegeFromName(data.name)

  const userData: NewUserData = {
    netId: data.netid,
    name: data.name ? data.name : data.netid,
    college: {
      connect: {
        id: collegeData.id,
      },
    },
  }

  if (data.permissions && isUserRole(data.permissions)) userData.role = data.permissions
  if (data.email) userData.email = data.email
  if (data.token) userData.token = data.token

  return await prisma.user.create({ data: userData })
}

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { netid } = req.body

    if (!netid) {
      res.status(400).send('Required fields are missing')
      return
    }

    // In case the user already exists
    const existingUser = await findUserByNetId(netid)
    if (existingUser) {
      res.send(JSON.stringify(await formatUserDto(existingUser)))
      return
    }

    const newUser = await createUserRecord(req.body)

    // await stripe.customers.create({
    //   email: req.body.email,
    //   name: req.body.name,
    //   metadata: { userId: newUser.id },
    // })

    res.send(JSON.stringify(formatUserDto(newUser)))
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
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
