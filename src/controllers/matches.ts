import { BadRequestError, NotFoundError } from "@error";
import { returnRecentMatches } from "@services/hexcore";
import type { RiotParticipantDto } from "@types";
import type { Request, Response } from "express";
import { redis } from "@redis";
import { getParamHashKey } from "@utils";

export const getRecentMatches = async (req: Request, res: Response) => {
  const riotId = req.params.riotId as string;
  const count = Math.min(parseInt(req.params.count as string) || 20, 20);

  if (!riotId) throw new BadRequestError("Riot ID is required");

  const result = await cacheAside(returnRecentMatches, riotId);

  return res.json(result);
};

async function cacheAside<T>(
  fn: (requestParam: string) => Promise<T>,
  requestParam: string,
) {
  let res: { data: T | null; isFromCache: boolean } = {
    data: null,
    isFromCache: false,
  };

  const hashkey = getParamHashKey(requestParam);
  const cachedData = await redis.get(hashkey);
  const docArr = cachedData ? JSON.parse(cachedData) : [];

  if (docArr && docArr.length) {
    res.data = docArr;
    res.isFromCache = true;
  } else {
    const result: T = await fn(requestParam);

    if (result) {
      redis.set(hashkey, JSON.stringify(result), "EX", 60);
    }

    res.data = result;
  }

  return res;
}
