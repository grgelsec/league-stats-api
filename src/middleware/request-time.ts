import type { NextFunction, Request, Response } from "express";

export const requestTime = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestTime = Date.now();
  // req.body = requestTime;
  next();
};
