import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import { ItemRating } from 'src/models/itemrating'
import { MenuItem } from 'src/models/menuitem'

export async function getAllItemRatings(_req: Request, res: Response): Promise<void> {
  try {
    const itemRatings = await getRepository(ItemRating).find({
      join: {
        alias: "rating",
        leftJoinAndSelect: {
          "menu_item": "rating.menu_item",
          "buttery": "menu_item.buttery",
        }
      }
    })
    res.send(JSON.stringify(itemRatings))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getRating(req: Request, res: Response): Promise<void> {
  try {
    const rating = await getRepository(ItemRating).findOne(req.params.ratingId, {
      join: {
        alias: "rating",
        leftJoinAndSelect: {
          "menu_item": "rating.menu_item",
          "buttery": "menu_item.buttery",
        }
      }
    })
    res.send(JSON.stringify(rating))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function createRating(req: Request, res: Response): Promise<void> {
  try {
    const { rating, order_complete, menu_item, college } = req.body
    const newRating = new ItemRating()
    newRating.rating = rating
    newRating.order_complete = order_complete
    const associatedMenuItem = await getRepository(MenuItem).findOne({ item: menu_item, buttery: college })
    newRating.menu_item = associatedMenuItem
    const promise = await getRepository(ItemRating).save(newRating)
    res.send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}
