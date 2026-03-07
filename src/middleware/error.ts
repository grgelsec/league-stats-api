import type { Request, Response, NextFunction } from "express";
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.statusCode || 500;
  const message = err.message || "Unkown failure";

  res.status(status).json({ success: false, error: message });
};
