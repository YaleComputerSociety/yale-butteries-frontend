import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export async function getAllItemRatings(_req: Request, res: Response): Promise<void> {
  try {
    const itemRatings = await prisma.itemRating.findMany({
      include: {
        menu_item: {
          include: {
            college: true,
          },
        },
      },
    })
    res.send(JSON.stringify(itemRatings))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getRating(req: Request, res: Response): Promise<void> {
  try {
    const rating = await prisma.itemRating.findUnique({
      where: {
        id: parseInt(req.params.ratingId),
      },
      include: {
        menu_item: {
          include: {
            college: true,
          },
        },
      },
    })
    res.send(JSON.stringify(rating))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function createRating(req: Request, res: Response): Promise<void> {
  try {
    const { rating, order_complete, menu_item_id, rating_ids } = req.body
    const formatted_rating_ids = (rating_ids as number[] | string[]).map((id) => {
      return { id: parseInt(id) }
    })
    const newRating = await prisma.itemRating.create({
      data: {
        rating: rating,
        order_complete: order_complete,
        menu_item: {
          connect: {
            id: menu_item_id,
          },
        },
        ingredients: {
          connect: formatted_rating_ids,
        },
      },
    })
    res.send(JSON.stringify(newRating))
  } catch (e) {
    res.status(400).send(e)
  }
}
