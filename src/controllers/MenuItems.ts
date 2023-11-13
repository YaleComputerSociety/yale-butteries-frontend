import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { getCollegeFromName } from './TransactionHistory'
import { MenuItemDto } from '../utils/dtos'

const prisma = new PrismaClient()

export async function getAllMenuItems(_: Request, res: Response): Promise<void> {
  try {
    const menuItems = await prisma.menuItem.findMany({
      include: {
        college: true,
      },
    })

    const collegeIds = [...new Set(menuItems.map((item) => item.collegeId))]

    const colleges = await prisma.college.findMany({
      where: {
        id: {
          in: collegeIds,
        },
      },
    })

    const collegeMap = colleges.reduce((map, college) => {
      map[college.id] = college.name
      return map
    }, {})

    const frontMenuItems = menuItems.map((item) => ({
      id: item.id,
      item: item.name,
      price: item.price,
      college: collegeMap[item.collegeId],
      isActive: item.isActive,
      description: item.description,
      foodType: item.type,
    }))
    res.send(frontMenuItems)
  } catch (e) {
    res.status(400).send(e.message)
  }
}

export async function getMenuItem(req: Request, res: Response): Promise<void> {
  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: {
        id: parseInt(req.params.menuItemId),
      },
      include: {
        college: true,
      },
    })
    res.send(JSON.stringify(menuItem))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function createMenuItem(req: Request, res: Response): Promise<void> {
  try {
    const newItem: MenuItemDto = {
      item: req.body.item,
      college: req.body.college,
      price: req.body.price,
      isActive: req.body.isActive,
      foodType: req.body.foodType,
      description: req.body.description,
    }

    const college = await getCollegeFromName(newItem.college)

    const newMenuItem = await prisma.menuItem.create({
      data: {
        name: newItem.item,
        price: newItem.price,
        isActive: true,
        type: newItem.foodType,
        college: {
          connect: {
            id: college.id,
          },
        },
        description: newItem.description,
      },
    })
    res.send(newMenuItem.id)
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateMenuItem(req: Request, res: Response): Promise<void> {
  try {
    const targetMenuItem = await prisma.menuItem.update({
      where: {
        id: req.body.id,
      },
      data: {
        name: req.body.item,
        price: req.body.price,
        isActive: req.body.isActive,
        type: req.body.foodType,
        description: req.body.description,
      },
    })
    res.send(JSON.stringify(targetMenuItem))
  } catch (e) {
    res.status(400).send(e)
  }
}
