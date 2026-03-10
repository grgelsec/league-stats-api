import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  console.error("Unexpected error:", err);
  res.status(500).json({
    status: "error",
    message:
      process.env.NODE_ENV == "production"
        ? "Internal server error"
        : err.message,
  });
};
