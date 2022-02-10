import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAllExceptionDates(_: Request, res: Response): Promise<void> {
  try {
    const exceptionDates = await prisma.exception.findMany();
    res.send(JSON.stringify(exceptionDates))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getExceptionDate(req: Request, res: Response): Promise<void> {
  try {
    const exceptionDate = await prisma.exception.findUnique({
      where: {
        id: req.params.exceptionDateId
      }
    })
    res.send(JSON.stringify(exceptionDate))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function createExceptionDate(req: Request, res: Response): Promise<void> {
  try {
    const { day_start, day_stop, menu_item_names } = req.body
    const menu_items = []
    for (const menu_item_name of menu_item_names) { 
      const associatedMenuItem = await prisma.menuItem.findUnique({
        where: {
          item: menu_item_name
        }
      })
      menu_items.push(associatedMenuItem)
    }
    const newExceptionDate = await prisma.exception.create({
      data: {
        day_start: day_start,
        day_stop: day_stop,
        menu_items: menu_items
      },
    })
    res.send(JSON.stringify(newExceptionDate))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateExceptionDate(req: Request, res: Response): Promise<void> {
  try {
    const targetExceptionDate = await prisma.exception.update({
      where: {
        id: req.body.id
      },
      data: {
        day_start: req.body.day_start || undefined,
        day_stop: req.body.day_stop || undefined,
      }
    })
    res.send(JSON.stringify(targetExceptionDate))
  } catch (e) {
    res.status(400).send(e)
  }
}
