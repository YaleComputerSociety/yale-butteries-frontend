import prisma from '../prismaClient'
import { Request, Response } from 'express'
import { getCollegeFromName, isMenuItemType } from '../utils/prismaUtils'
import { MenuItemDto } from '../utils/dtos'
import { MenuItemType } from '@prisma/client'

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
  interface NewMenuItem {
    name: string
    price: number
    college: {
      connect: {
        id: number
      }
    }
    description?: string
    isActive?: boolean
    type?: MenuItemType
  }
  try {
    if (!req.body.item || !req.body.price || !req.body.college) {
      res.status(400).send('Required fields are missing')
      return
    }

    const collegeData = await getCollegeFromName(req.body.college)

    const menuItemData: NewMenuItem = {
      name: req.body.item,
      price: parseInt(req.body.price),
      college: {
        connect: {
          id: collegeData.id,
        },
      },
    }

    if (req.body.type && isMenuItemType(req.body.type)) menuItemData.type = req.body.type
    if (req.body.isActive) menuItemData.isActive = req.body.email
    menuItemData.description = req.body.description ? req.body.description : 'No description provided'

    const newMenuItem = await prisma.menuItem.create({ data: menuItemData })
    res.send(JSON.stringify(newMenuItem.id))
  } catch (e) {
    console.log(e)
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
