import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export async function getAllMenuItems(_: Request, res: Response): Promise<void> {
  try {
    const menuItems = await prisma.menuItem.findMany({
      include: {
        college: true,
        days: true,
        exceptions: true,
      }
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
        id: req.params.menuItemId
      }, 
      include: {
        college: true,
        days: true,
        exceptions: true,
      }
    }) 
    res.send(JSON.stringify(menuItem))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function createMenuItem(req: Request, res: Response): Promise<void> {
  try {
    const { item, price, days, college, exceptions, ingredients } = req.body
    const associatedDays = []
    const associatedExceptions = []
    const associatedIngredients = []
    for (const day of days) {
      const associatedDay = await prisma.day.findUnique({ where: { day: day }})
      associatedDays.push(associatedDay)
    }
    for (const exception of exceptions) {
      const associatedException = await prisma.exception.findUnique({ where: { day_start: exception.day_start, day_stop: exception.day_stop }})
      associatedExceptions.push(associatedException)
    }
    for (const ingredient of ingredients) {
      const associatedIngredient = await prisma.ingredient.findUnique({ where: {ingredient: ingredient}})
      associatedIngredients.push(associatedIngredient)
    }
    const associatedCollege = await prisma.college.findUnique({where: {college: college}})
    const newMenuItem = await prisma.menuItem.create({
      data: {
        item: item,
        price: price,
        item_ratings: [],
        days: associatedDays,
        exceptions: associatedExceptions,
        ingredients: associatedIngredients,
        college: associatedCollege 
      }
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
        id: req.body.id
      },
      data: {
        item: req.body.item || undefined,
        price: req.body.price || undefined
      }
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
