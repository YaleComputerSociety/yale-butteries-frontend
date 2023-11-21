import type { Request, Response } from 'express'

import type { MenuItemType } from '@prisma/client'
import prisma from '@src/prismaClient'
import { getCollegeFromName, isMenuItemType } from '@utils/prismaUtils'
import type { MenuItemDto } from '@utils/dtos'
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
  const menuItem = await prisma.menuItem.findUnique({
    where: {
      id: parseInt(req.params.menuItemId)
    },
    include: {
      college: true
    }
  })

  if (menuItem === null) throw new HTTPError(`No menu item found at ID ${req.params.menuItemId}`, 404)
  const formattedMenuItem = formatMenuItem(menuItem)

  res.json(formattedMenuItem)
}

export async function createMenuItem (req: Request, res: Response): Promise<void> {
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
    if (req.body.item == null || req.body.price == null || req.body.college == null) {
      res.status(400).send('Required fields are missing')
      return
    }

    const collegeData = await getCollegeFromName(req.body.college)

    const menuItemData: NewMenuItem = {
      name: req.body.item,
      price: parseInt(req.body.price),
      college: {
        connect: {
          id: collegeData.id
        }
      }
    }

    if (req.body.foodType != null && isMenuItemType(req.body.foodType)) menuItemData.type = req.body.foodType
    if (req.body.isActive != null) menuItemData.isActive = req.body.email
    menuItemData.description = req.body.description ?? 'No description provided'

    const newMenuItem = await prisma.menuItem.create({ data: menuItemData })
    res.send(JSON.stringify(newMenuItem.id))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export async function updateMenuItem (req: Request, res: Response): Promise<void> {
  interface MenuItemUpdateData {
    name?: string
    price?: number
    isActive?: boolean
    description?: string
    type?: MenuItemType
  }

  try {
    if (Number.isInteger(req.params.menuItemId)) {
      res.status(400).send('Invalid menu item ID')
      return
    }

    const menuItem = await prisma.menuItem.findUnique({
      where: {
        id: parseInt(req.params.menuItemId)
      }
    })

    if (menuItem == null) {
      res.status(400).send('No menu item found at specified ID')
      return
    }

    const menuItemInput: MenuItemDto = { ...req.body }

    const menuItemData: MenuItemUpdateData = {}
    if (menuItemInput.item != null) menuItemData.name = menuItemInput.item
    if (menuItemInput.price != null && Number.isInteger(menuItemInput.price)) menuItemData.price = menuItemInput.price
    if (menuItemInput.isActive != null) menuItemData.isActive = menuItemInput.isActive
    if (menuItemInput.description != null) menuItemData.description = menuItemInput.description
    if (menuItemInput.foodType != null && isMenuItemType(menuItemInput.foodType)) menuItemData.type = menuItemInput.foodType

    const newMenuItem = await prisma.menuItem.update({
      where: {
        id: parseInt(req.params.menuItemId)
      },
      data: menuItemData
    })
    res.send(JSON.stringify(newMenuItem))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}
