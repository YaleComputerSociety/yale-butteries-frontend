import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import { Exception } from 'src/models/exception';
import { MenuItem } from 'src/models/menuitem';

export async function getAllExceptionDates(_: Request, res: Response): Promise<void> {
  try {
    const exceptionDates = await getRepository(Exception).find();
    res.send(JSON.stringify(exceptionDates))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function getExceptionDate(req: Request, res: Response): Promise<void> {
  try {
    const exceptionDate = await getRepository(Exception).findOne(req.params.exceptionDateId)
    res.send(JSON.stringify(exceptionDate))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function createExceptionDate(req: Request, res: Response): Promise<void> {
  try {
    const { day_start, day_stop, menu_item_names } = req.body
    const newExceptionDate = new Exception()
    newExceptionDate.day_start = day_start
    newExceptionDate.day_stop = day_stop
    newExceptionDate.menu_items = []
    for (const menu_item_name of menu_item_names) { 
      const associatedMenuItem = await getRepository(MenuItem).findOne({ item: menu_item_name })
      newExceptionDate.menu_items.push(associatedMenuItem)
    }
    const promise = await getRepository(Exception).save(newExceptionDate)
    res.send(JSON.stringify(promise))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function updateExceptionDate(req: Request, res: Response): Promise<void> {
  try {
    const targetExceptionDate = await getRepository(Exception).findOne(req.body.id)
    if ('day_start' in req.body) {
      targetExceptionDate.day_start = req.body.day_start
    }
    if ('day_stop' in req.body) {
      targetExceptionDate.day_stop = req.body.day_stop
    }
    const promise = await getRepository(Exception).save(targetExceptionDate)
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
