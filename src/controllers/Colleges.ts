import type { Request, Response } from 'express'

import prisma from '@src/prismaClient'
import { formatCollege } from '@utils/dtoConverters'
import HTTPError from '@src/utils/HTTPError'

export interface TypedRequest<Params, Body> extends Express.Request {
  params: Params
  body: Body
}

export async function getAllColleges (_: Request, res: Response): Promise<void> {
  const colleges = await prisma.college.findMany(includeProperty)
  const formattedColleges = colleges.map((college) => formatCollege(college))
  res.json(formattedColleges)
}

export async function getCollege (req: Request, res: Response): Promise<void> {
  const college = await prisma.college.findUnique({
    ...includeProperty,
    where: {
      id: parseInt(req.params.collegeId)
    }
  })

  if (college === null) throw new HTTPError(`No college found at ID ${req.params.collegeId}`, 404)
  const formattedCollege = formatCollege(college)

  res.json(formattedCollege)
}

export async function updateCollege (req: Request, res: Response): Promise<void> {
  const college = await prisma.college.update({
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
  if (college === null) throw new HTTPError(`No college found at ID ${req.params.collegeId}`, 404)
  const formattedCollege = formatCollege(college)

  res.json(formattedCollege)
}

const includeProperty = {
  include: {
    menuItems: true
  }
}
