import type { Request, Response } from 'express'

import { MenuItemType } from '@prisma/client'
import prisma from '@src/prismaClient'
import { getCollegeFromName, getMenuItemFromId } from '@utils/prismaUtils'
import { formatMenuItem } from '@src/utils/dtoConverters'
import HTTPError from '@src/utils/httpError'

export async function getAllMenuItems (_: Request, res: Response): Promise<void> {
  const menuItems = await prisma.menuItem.findMany({
    include: {
      college: true
    }
  })
  const formattedMenuItems = menuItems.map((item) => formatMenuItem(item))
  res.json(formattedMenuItems)
}

export async function getMenuItem (req: Request, res: Response): Promise<void> {
  const menuItem = await getMenuItemFromId(parseInt(req.params.menuItemId))
  const formattedMenuItem = formatMenuItem(menuItem)
  res.json(formattedMenuItem)
}

export async function createMenuItem (req: Request, res: Response): Promise<void> {
  if (req.body.item == null || req.body.price == null || req.body.college == null) {
    throw new HTTPError('Required fields are missing', 400)
  }

  const collegeData = await getCollegeFromName(req.body.college)

  const menuItemData = {
    name: req.body.item,
    price: parseInt(req.body.price),
    college: {
      connect: {
        id: collegeData.id
      }
    },
    type: req.body.foodType ?? MenuItemType.FOOD,
    isActive: req.body.isActive !== 'false',
    description: req.body.description ?? 'No description provided'
  }

  const newMenuItem = await prisma.menuItem.create({ data: menuItemData })
  // TODO: change this in frontend
  res.json(newMenuItem.id)
}

export async function updateMenuItem (req: Request, res: Response): Promise<void> {
  // check that the menu Item exists
  await getMenuItemFromId(parseInt(req.params.menuItemId))

  // const menuItemInput: MenuItemDto = { ...req.body }
  // remember to include price > 50 and < 2000 in validation

  const menuItemData = {
    name: req.body.item ?? undefined,
    price: req.body.price != null ? parseInt(req.body.price) : undefined,
    isActive: req.body.isActive != null ? req.body.isActive !== 'false' : undefined,
    description: req.body.description ?? undefined,
    type: req.body.foodType ?? undefined
  }

  const updatedMenuItem = await prisma.menuItem.update({
    where: {
      id: parseInt(req.params.menuItemId)
    },
    data: menuItemData,
    include: {
      college: true
    }
  })

  const formattedMenuItem = formatMenuItem(updatedMenuItem)
  res.json(formattedMenuItem)
}
