import type { Request, Response, NextFunction } from 'express'
import HTTPError from '@src/utils/httpError'

export const invalidUrlHandler = (req: Request, res: Response, next: NextFunction): void => {
  throw new HTTPError(`No resource found at ${req.method} ${req.path}`, 404)
}
