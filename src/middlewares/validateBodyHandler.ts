import type { Request, Response, NextFunction } from 'express'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

export function validateBody<T extends object> (bodyType: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const input = plainToInstance(bodyType, req.body)
    const errors = await validate(input)

    if (errors.length > 0) {
      res.status(400).json({ errors })
      return
    }

    next()
  }
}
