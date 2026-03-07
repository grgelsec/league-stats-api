import { returnRecentMatches } from "@services/hexcore";
import type { RiotParticipantDto } from "@types";
import type { Request, Response } from "express";

export const getRecentMatches = async (req: Request, res: Response) => {
  const riotId = req.params.riotId as string;
  const count = Math.min(parseInt(req.query.count as string) || 20, 20);

  const data: RiotParticipantDto[] = await returnRecentMatches(riotId, count);

  return res.json(data);
};
