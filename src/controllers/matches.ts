import { BadRequestError, NotFoundError } from "@error";
import { returnRecentMatches } from "@services/hexcore";
import type { RiotParticipantDto } from "@types";
import type { Request, Response } from "express";
import { redis } from "@redis";
import { getParamHashKey } from "@utils";

interface matchesResult {
  data: RiotParticipantDto[];
  isFromCache: boolean;
}

export const getRecentMatches = async (req: Request, res: Response) => {
  let result: matchesResult = { data: [], isFromCache: false };

  const riotId = req.params.riotId as string;
  const count = Math.min(parseInt(req.params.count as string) || 20, 20);

  if (!riotId) throw new BadRequestError("Riot ID is required");

  const hashkey = getParamHashKey(riotId);
  const cachedData = await redis.get(hashkey);
  const docArr = cachedData ? JSON.parse(cachedData) : [];

  if (docArr && docArr.length) {
    result.data = docArr;
    result.isFromCache = true;
  } else {
    const recentMatches: RiotParticipantDto[] =
      await returnRecentMatches(riotId);

    if (!recentMatches) throw new NotFoundError("Recent matches not found");

    if (recentMatches && recentMatches.length) {
      redis.set(hashkey, JSON.stringify(recentMatches), "EX", 60);
    }

    result.data = recentMatches;
  }

  return res.json(result);
};

async function cacheAside<T>(
  fn: (requestParam: string) => Promise<T>,
  requestParam: string,
) {
  let res: { data: T[]; isFromCache: boolean } = {
    data: [],
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

    if (!result) throw new NotFoundError();

    if (result) {
      redis.set(hashkey, JSON.stringify(result), "EX", 60);
    }

    res.data = result;
  }
}

console.log(
  await cacheAside<RiotParticipantDto[]>(returnRecentMatches, "Georgie#EZLL"),
);
