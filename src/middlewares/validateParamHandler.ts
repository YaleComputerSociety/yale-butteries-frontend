import HTTPError from '@src/utils/httpError'
import type { Request, Response, NextFunction } from 'express'

type ValidatorFn = (paramValue: string) => boolean

export function createParamValidator (paramName: string, validator: ValidatorFn, errorMessage: string) {
  return function (req: Request, res: Response, next: NextFunction): void {
    const paramValue = req.params[paramName]

    if (validator(paramValue)) {
      next()
    } else {
      throw new HTTPError(errorMessage, 400)
    }
  }
}

export const isInteger = (value: string): boolean => value != null && /^\d+$/.test(value)
export const isNonEmptyString = (value: string): boolean => typeof value === 'string' && value.trim() !== ''
