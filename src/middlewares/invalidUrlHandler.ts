import HTTPError from '@src/utils/httpError'
import type { Request, Response, NextFunction } from 'express'

export const invalidUrlHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = new HTTPError(`No resource found at ${req.method} ${req.originalUrl}`, 404)
  next(error)
}
