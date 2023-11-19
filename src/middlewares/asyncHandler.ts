import { Request, Response, NextFunction, RequestHandler } from 'express'

const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return function (req: Request, res: Response, next: NextFunction): void {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

export default asyncHandler
