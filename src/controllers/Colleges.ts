import type { Request, Response } from 'express'

import prisma from '@src/prismaClient'
import { formatCollege } from '@utils/dtoConverters'
import HTTPError from '@src/utils/httpError'

export interface TypedRequest<Params, Body> extends Express.Request {
  params: Params
  body: Body
}

export async function getAllColleges (_: Request, res: Response): Promise<void> {
  const colleges = await prisma.college.findMany(includeProperty)
  const frontendColleges = colleges.map((college) => formatCollege(college))
  res.json(frontendColleges)
}

export async function getCollege (req: Request<{ collegeId: string }, null>, res: Response): Promise<void> {
  const college = await prisma.college.findUnique({
    ...includeProperty,
    where: {
      id: parseInt(req.params.collegeId)
    }
  })

  if (college === null) throw new HTTPError(`No college found at ID ${req.params.collegeId}`, 404)
  res.json(college)
}

export async function updateCollege (req: Request, res: Response): Promise<void> {
  try {
    console.log(req.body)
    const result = await prisma.college.update({
      where: {
        id: parseInt(req.params.collegeId)
      },
      data: {
        daysOpen: req.body.daysOpen,
        isOpen: req.body.isOpen,
        openTime: req.body.openTime,
        closeTime: req.body.closeTime
      }
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
    menuItems: true
  }
}
