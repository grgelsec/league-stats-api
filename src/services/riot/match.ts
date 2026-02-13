import type { RiotMatchDto, MatchDto } from "@types";
import { request } from "./client.js";

export async function getMatchIdsByPuuid(puuid: string) {
  if (!puuid) throw new Error(`Missing player unique user id (puuid).`);

  return request<Array<string>>(
    `/lol/match/v5/matches/by-puuid/${encodeURIComponent(puuid)}/ids`,
  );
}

export async function getMatchByMatchId(matchId: string) {
  if (!matchId) throw new Error("Missing match id (matchId");

  return request<MatchDto>(`/lol/match/v5/matches/${encodeURI(matchId)}`);
}
