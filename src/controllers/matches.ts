import { BadRequestError, NotFoundError } from "@error";
import { returnRecentMatches } from "@services/hexcore";
import type { RiotParticipantDto } from "@types";
import type { Request, Response } from "express";
import { cacheAside } from "../db/redis/cache-aside.js";

export const getRecentMatches = async (req: Request, res: Response) => {
  const riotId = req.params.riotId as string;
  const count = Math.min(parseInt(req.params.count as string) || 20, 20);

  if (!riotId) throw new BadRequestError("Riot ID is required");

  const result = await cacheAside<RiotParticipantDto[]>(
    returnRecentMatches,
    riotId,
    60,
  );

  return res.json(result);
};
