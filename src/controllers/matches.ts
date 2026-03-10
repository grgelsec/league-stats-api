import { BadRequestError, NotFoundError } from "@error";
import { returnRecentMatches } from "@services/hexcore";
import type { RiotParticipantDto } from "@types";
import type { Request, Response } from "express";

export const getRecentMatches = async (req: Request, res: Response) => {
  const riotId = req.params.riotId as string;
  const count = Math.min(parseInt(req.query.count as string) || 20, 20);

  if (!riotId) throw new BadRequestError("Riot ID is required");

  const recentMatches: RiotParticipantDto[] = await returnRecentMatches(
    riotId,
    count,
  );

  if (!recentMatches) throw new NotFoundError("Recent matches not found");

  return res.json(recentMatches);
};
