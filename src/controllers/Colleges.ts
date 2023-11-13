import { Request, Response } from 'express'

import prisma from '../prismaClient'

export async function getAllColleges(_: Request, res: Response): Promise<void> {
  try {
    const colleges = await prisma.college.findMany(includeProperty)
    res.send(JSON.stringify(colleges))
  } catch (e) {
    console.log(e)
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
    console.log(req.body)
    const result = await prisma.college.update({
      where: {
        id: parseInt(req.params.collegeId),
      },
      data: {
        daysOpen: req.body.daysOpen,
        isOpen: req.body.isOpen,
        openTime: req.body.openTime,
        closeTime: req.body.closeTime,
      },
    })
    console.log(result)
    res.send(JSON.stringify(result))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const includeProperty = {
  include: {
    menuItems: true,
  },
}
