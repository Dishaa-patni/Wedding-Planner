import type { NextFunction, Request, RequestHandler, Response } from 'express'

export const asyncHandler =
  (requestHandler: (req: Request, res: Response, next: NextFunction) => Promise<void>): RequestHandler =>
  (req, res, next) => {
    void Promise.resolve(requestHandler(req, res, next)).catch(next)
  }
