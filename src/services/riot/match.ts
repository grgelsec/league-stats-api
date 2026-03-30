import type { RiotMatchDto, MatchDto } from "@types";
import { request } from "./client.js";

export async function getMatchIdsByPuuid(puuid: string, count: number) {
  if (!puuid) throw new Error(`Missing player unique user id (puuid).`);

  const params = new URLSearchParams({
    count: count.toString(),
  });

  return request<Array<string>>(
    `/lol/match/v5/matches/by-puuid/${encodeURIComponent(puuid)}/ids?${params}`,
  );
}

export async function getMatchByMatchId(matchId: string) {
  if (!matchId) throw new Error("Missing match id (matchId");

  return request<MatchDto>(`/lol/match/v5/matches/${encodeURI(matchId)}`);
}
