import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import { MenuItem } from 'src/models/menuitem';
import { Day } from 'src/models/day';
import { College } from 'src/models/college';
import { Exception } from 'src/models/exception';
import { Ingredient } from 'src/models/ingredient';

export async function getAllMenuItems(_: Request, res: Response): Promise<void> {
  try {
    const menuItems = await getRepository(MenuItem).find({
      join: {
        alias: "menuItem",
        leftJoinAndSelect: {
          "college": "menuItem.buttery",
          "days": "menuItem.days",
          "exceptions": "menuItem.exceptions",
        }
      }
    });
    res.send(JSON.stringify(menuItems))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getMenuItem(req: Request, res: Response): Promise<void> {
  try {
    const menuItem = await getRepository(MenuItem).findOne(req.params.menuItemId, {
      join: {
        alias: "menuItem",
        leftJoinAndSelect: {
          "college": "menuItem.buttery",
          "days": "menuItem.days",
          "exceptions": "menuItem.exceptions",
        }
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
    const newMenuItem = new MenuItem()
    newMenuItem.item = item
    newMenuItem.price = price
    newMenuItem.days = []
    newMenuItem.exception_dates = []
    newMenuItem.ingredients = []
    newMenuItem.item_ratings = []
    for (const day of days) {
      const associatedDay = await getRepository(Day).findOne({ day: day })
      newMenuItem.days.push(associatedDay)
    }
    for (const exception of exceptions) {
      const associatedException = await getRepository(Exception).findOne({ day_start: exception.day_start, day_stop: exception.day_stop })
      newMenuItem.exception_dates.push(associatedException)
    }
    for (const ingredient of ingredients) {
      const associatedIngredient = await getRepository(Ingredient).findOne({ ingredient: ingredient })
      newMenuItem.ingredients.push(associatedIngredient)
    }
    const associatedCollege = await getRepository(College).findOne({ college: college })
    newMenuItem.buttery = associatedCollege
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateMenuItem(req: Request, res: Response): Promise<void> {
  try {
    const targetMenuItem = await getRepository(MenuItem).findOne(req.body.id)
    if ('item' in req.body) {
      targetMenuItem.item = req.body.item
    }
    if ('price' in req.body) {
      targetMenuItem.price = req.body.price
    }
    const promise = await getRepository(MenuItem).save(targetMenuItem)
    res.send(JSON.stringify(promise))
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
