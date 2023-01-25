import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export async function getAllIngredients(_: Request, res: Response): Promise<void> {
  try {
    const ingredients = await prisma.ingredient.findMany({
      include: {
        college: true,
      },
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
        id: parseInt(req.params.ingredientId),
      },
      include: {
        college: true,
      },
    })
    res.send(JSON.stringify(ingredient))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function createIngredient(req: Request, res: Response): Promise<void> {
  try {
    const {
      ingredient,
      price,
      available,
      college_id,
    }: { ingredient: string; price: number; available: boolean; college_id: number } = req.body
    const newIngredient = await prisma.ingredient.create({
      data: {
        ingredient: ingredient,
        price: price,
        available: available,
        college: {
          connect: {
            id: college_id,
          },
        },
      },
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
        id: req.body.id,
      },
      data: {
        ingredient: req.body.ingredient || undefined,
        price: req.body.price || undefined,
        available: req.body.available || undefined,
      },
    })
    res.send(JSON.stringify(ingredient))
  } catch (e) {
    res.status(400).send(e)
  }
}
