import { Ingredient, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export async function getAllMenuItems(_: Request, res: Response): Promise<void> {
  try {
    const menuItems = await prisma.menuItem.findMany({
      include: {
        college: true,
      },
    })
    res.send(JSON.stringify(menuItems))
  } catch (e) {
    res.status(400).send(e)
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
    const {
      item,
      price,
      limited_time,
      college_id,
      ingredients,
    }: {
      item: string
      price: number
      limited_time: boolean
      college_id: number
      ingredients: { optional: boolean; ingredientId: number }
    } = req.body

    const newMenuItem = await prisma.menuItem.create({
      data: {
        item: item,
        price: price,
        limited_time: limited_time,
        ingredients: {
          createMany: {
            data: ingredients,
          },
        },
        college: {
          connect: {
            id: college_id,
          },
        },
      },
    })
    res.send(JSON.stringify(newMenuItem))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateMenuItem(req: Request, res: Response): Promise<void> {
  try {
    const targetMenuItem = prisma.menuItem.update({
      where: {
        id: req.body.id,
      },
      data: {
        item: req.body.item || undefined,
        price: req.body.price || undefined,
      },
    })
    res.send(JSON.stringify(targetMenuItem))
  } catch (e) {
    res.status(400).send(e)
  }
}

// export async function deleteMenuItem(req: Request, res: Response): Promise<void> {
//   try {
//     const deletedMenuItem = await getRepository(MenuItem).delete(req.params.menuItemId)
//     res.send(JSON.stringify({ message: 'Success', stat: deletedMenuItem }))
//   } catch (e) {
//     res.status(400).send(e)
//   }
// }
