import { AuthenticationError, BadRequestError, NotFoundError } from "@error";
import { getPuuidBySummonerName } from "@queries";
import type { NextFunction, Request, Response } from "express";

export const auth = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const riotId = req.header("x-riot-id");

  if (!riotId) throw new AuthenticationError("X-Riot-ID header required.");

  const validPlayer = getPuuidBySummonerName(riotId);

  if (!validPlayer) {
    throw new AuthenticationError("Invalid riotId.");
  }

  next();
};
