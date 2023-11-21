import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

interface ExtendedError extends Error {
  status?: number
  // Add any other custom properties that your errors might have
}

const errorHandler: ErrorRequestHandler = (err: ExtendedError, req: Request, res: Response, next: NextFunction) => {
  console.error(err)

  if (res.headersSent) {
    next(err)
    return
  }

  const statusCode = err.status ?? 500
  res.status(statusCode).json({ error: err.message ?? 'Internal server error' })
}

export default errorHandler
