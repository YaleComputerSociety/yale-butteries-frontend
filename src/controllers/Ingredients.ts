import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export async function getAllIngredients(_: Request, res: Response): Promise<void> {
  try {
    const ingredients = await prisma.ingredient.findMany({
      include: {
        college: true
      }
    })
    res.send(JSON.stringify(ingredients))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getIngredient(req: Request, res: Response): Promise<void> {
  try {
    const ingredient = await prisma.ingredient.findUnique({
      where: {
        id: req.params.ingredientId
      },
      include: {
        college: true
      }
    })
    res.send(JSON.stringify(ingredient))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function createIngredient(req: Request, res: Response): Promise<void> {
  try {
    const { ingredient, price, available, college } = req.body
    const associatedCollege = await prisma.college.findUnique({
      where: {
        college: college
      }
    })
    const newIngredient = await prisma.ingredient.create({
      data: {
        ingredient: ingredient,
        price: price,
        available: available,
        college: associatedCollege
      }
    })
    res.send(JSON.stringify(newIngredient))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateIngredient(req: Request, res: Response): Promise<void> {
  try {
    const ingredient = await prisma.ingredient.update({
      where: {
        id: req.body.id
      },
      data: {
        ingredient: req.body.ingredient || undefined,
        price: req.body.price || undefined,
        available: req.body.available || undefined
      }
    })
    res.send(JSON.stringify(ingredient))
  } catch (e) {
    res.status(400).send(e)
  }
}

// export async function deleteExceptionDate(req: Request, res: Response): Promise<void> {
//   try {
//     const deletedExceptionDate = await getRepository(Exception).delete(req.params.exceptionDateId)
//     res.send(JSON.stringify({ message: 'Success', exceptionDate: deletedExceptionDate }))
//   } catch (e) {
//     res.status(400).send(e)
//   }
// }
