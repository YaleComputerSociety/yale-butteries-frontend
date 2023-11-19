import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err)

  if (res.headersSent) {
    return next(err)
  }

  res.status(500).json({ error: 'Internal server error' })
}

export default errorHandler
