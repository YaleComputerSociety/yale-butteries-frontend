import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { getCollegeFromName } from './TransactionHistory'

const prisma = new PrismaClient()

interface FrontMenuItem {
  id?: number
  item: string
  college: string
  price: number
  description?: string
  limitedTime?: boolean
  isActive: boolean
  foodType: 'FOOD' | 'DRINK' | 'DESSERT'
}

export async function getAllMenuItems(_: Request, res: Response): Promise<void> {
  try {
    const menuItems = await prisma.menuItem.findMany({
      include: {
        college: true,
      },
    })

    // need to translate to front end version of MenuItems
    const frontMenuItems = []
    for (const i of menuItems) {
      const c = await prisma.college.findUnique({
        where: {
          id: i.collegeId,
        },
      })
      const newItem = {
        id: i.id,
        item: i.item,
        price: i.price,
        college: c.college,
        isActive: i.is_active,
      }
      frontMenuItems.push(newItem)
    }
    res.send(JSON.stringify(frontMenuItems))
  } catch (e) {
    res.status(400).send(e)
  }
}

// export async function getCollegeMenuItems(req: Request, res: Response): Promise<void> {
//   try {
//     console.log('eep')
//     const getCollege = await prisma.college.findUnique({
//       where: {
//         college: req.params.college,
//       },
//     })
//     if (!getCollege) throw 'invalid college'

//     const menuItems = await prisma.menuItem.findMany({
//       where: {
//         collegeId: getCollege.id,
//       },
//     })
//     console.log(menuItems, getCollege.id)
//     res.send(JSON.stringify(menuItems))
//   } catch (e) {
//     console.log(e)
//     res.status(400).send(e)
//   }
// }

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
    const newItem: FrontMenuItem = {
      item: req.body.item,
      college: req.body.college,
      price: req.body.price,
      isActive: req.body.isActive,
      foodType: req.body.foodType,
    }

    const college = await getCollegeFromName(newItem.college)

    const newMenuItem = await prisma.menuItem.create({
      data: {
        item: newItem.item,
        price: newItem.price,
        is_active: newItem.isActive,
        item_type: 'FOOD',
        college: {
          connect: {
            id: college.id,
          },
        },
      },
    })
    res.send(JSON.stringify(newMenuItem.id))
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
        item: req.body.item,
        price: req.body.price,
        is_active: req.body.isActive,
        // description: req.body.description || undefined,
      },
    })

    const mi = await prisma.menuItem.findFirst({
      where: {
        id: req.body.id,
      },
    })
    res.send(JSON.stringify(targetMenuItem))
  } catch (e) {
    res.status(400).send(e)
  }
}
