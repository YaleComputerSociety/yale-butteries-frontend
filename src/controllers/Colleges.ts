import { Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAllColleges(_: Request, res: Response): Promise<void> {
  try {
    const colleges = await prisma.college.findMany(includeProperty)
    res.send(JSON.stringify(colleges))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getCollege(req: Request, res: Response): Promise<void> {
  try {
    const college = await prisma.college.findUnique({
      ...includeProperty,
      where: {
        id: parseInt(req.params.collegeId),
      },
    })
    res.send(JSON.stringify(college))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateCollege(req: Request, res: Response): Promise<void> {
  try {
    console.log('hello world')
    const college = await prisma.college.update({
      where: {
        id: req.body.id,
      },
      data: {
        buttery_activated: req.body.buttery_activated,
        times: req.body.times
      },
    })
    console.log('hello world')
    res.send(JSON.stringify(college))
  } catch (e) {
    res.status(400).send(e)
  }
}

const includeProperty = {
  include: {
    users: true,
    transaction_histories: true,
    menu_items: true,
    ingredients: true,
    availabilities: true,
  },
}
