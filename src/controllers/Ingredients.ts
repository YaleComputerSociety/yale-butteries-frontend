import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import { Ingredient } from 'src/models/ingredient';
import { College } from 'src/models/college';

// TODO: Create function.

export async function getAllIngredients(_: Request, res: Response): Promise<void> {
  try {
    const ingredients = await getRepository(Ingredient).find({ relations: ["college"] });
    res.send(JSON.stringify(ingredients))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getIngredient(req: Request, res: Response): Promise<void> {
  try {
    const ingredient = await getRepository(Ingredient).findOne(req.params.ingredientId, { relations: ["college"] })
    res.send(JSON.stringify(ingredient))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function createIngredient(req: Request, res: Response): Promise<void> {
  try {
    const { ingredient, price, available, college } = req.body
    const newIngredient = new Ingredient()
    newIngredient.ingredient = ingredient
    newIngredient.price = price
    newIngredient.available = available
    const associatedCollege = await getRepository(College).findOne({college: college})
    newIngredient.buttery = associatedCollege
    const promise = await getRepository(Ingredient).save(newIngredient)
    res.send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateIngredient(req: Request, res: Response): Promise<void> {
  try {
    const ingredient = await getRepository(Ingredient).findOne(req.body.id)
    if('ingredient' in req.body) {
      ingredient.ingredient = req.body.ingredient
    }
    if('price' in req.body) {
      ingredient.price = req.body.price
    }
    if('available' in req.body) {
      ingredient.available = req.body.available
    }
    const promise = await getRepository(Ingredient).save(ingredient)
    res.send(JSON.stringify(promise))
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
