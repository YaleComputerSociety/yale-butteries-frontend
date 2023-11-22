import type { Request, Response } from 'express'

import { UserRole } from '@prisma/client'
import prisma from '@src/prismaClient'
import { findUserByNetId, getCollegeFromName, getUserFromId } from '@utils/prismaUtils'
import { formatOrderItem, formatUser, formatUsers } from '@utils/dtoConverters'
import HTTPError from '@src/utils/httpError'
import { MILLISECONDS_UNTIL_ORDER_IS_EXPIRED } from '@src/utils/constants'

export async function getAllUsers (_req: Request, res: Response): Promise<void> {
  const users = await prisma.user.findMany({ include: { college: true } })
  const formattedUsers = await formatUsers(users)
  res.json(formattedUsers)
}

export async function getUser (req: Request, res: Response): Promise<void> {
  const orderExpirationTime = new Date(Date.now() - MILLISECONDS_UNTIL_ORDER_IS_EXPIRED)

  const user = await prisma.user.findUnique({
    include: {
      college: true,
      orders: {
        where: {
          createdAt: {
            gte: orderExpirationTime
          }
        },
        include: {
          orderItems: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    },
    where: {
      id: req.params.userId
    }
  })
  console.log(user)

  if (user === null) throw new HTTPError(`No user found with ID ${req.params.userId}`, 404)

  const formattedUser = await formatUser(user)

  // get most recent valid order
  // TODO: change frontend behavior to make more sense, remove this part and put it somewhere else
  if (user.orders.length > 0) {
    const recentOrder = user.orders[0]
    const recentOrderItem = recentOrder.orderItems[0]
    formattedUser.currentOrder = await formatOrderItem(recentOrderItem)
  }

  res.json(formattedUser)
}

export async function createUser (req: Request, res: Response): Promise<void> {
  // In case the user already exists
  const existingUser = await findUserByNetId(req.body.netid)
  if (existingUser !== null) {
    const formattedUser = await formatUser(existingUser)
    res.json(formattedUser)
    return
  }

  const college = await getCollegeFromName(req.body.college)

  const user = await prisma.user.create({
    data: {
      netId: req.body.netid,
      name: req.body.name ?? req.body.netid,
      college: {
        connect: {
          id: college.id
        }
      },
      role: UserRole.CUSTOMER,
      email: req.body.email ?? undefined,
      token: req.body.token ?? undefined
    }
  })

  // stripe user initialization
  // await stripe.customers.create({
  //   email: req.body.email,
  //   name: req.body.name,
  //   metadata: { userId: newUser.id },
  // })

  const formattedUser = await formatUser(user)
  res.json(formattedUser)
}

export async function updateUser (req: Request, res: Response): Promise<void> {
  const user = await prisma.user.update({
    where: {
      id: req.params.userId
    },
    data: {
      name: req.body.name ?? undefined,
      email: req.body.email ?? undefined
    }
  })

  const formattedUser = await formatUser(user)
  res.json(formattedUser)
}

export async function verifyStaffLogin (req: Request, res: Response): Promise<void> {
  // this needs to be fixed but we also wont use this in the future
  const user = await getUserFromId('07732f82-f2b8-471b-a44a-6e1c4057f218')
  if (user === null) throw new HTTPError('No user found', 404)

  const verified = (user.name === req.body.username && user.token === req.body.password)
  res.json(verified)
}
