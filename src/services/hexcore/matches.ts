import {
  getMissingMatchIds,
  getPastNGames,
  getAccountBySummonerName,
} from "@queries";
import { getMatchIdsByPuuid } from "@services/riot";
import { syncParticipants } from "@services/sync";
import type { RiotParticipantDto } from "@types";
import type { Account } from "@db/types";

export const returnRecentMatches = async (
  riotid: string,
  count: number,
): Promise<RiotParticipantDto[]> => {
  if (!riotid) throw new Error("Missing riot id for returnMatches!");
  if (!count) count == 20;

  const account: Account = await getAccountBySummonerName(riotid);

  // grab recent n matchIds from riot api
  const matchIds = await getMatchIdsByPuuid(account.puuid, count);

  // curate a list of the matchIds not already in db
  const missingMatchIds = await getMissingMatchIds(matchIds);

  if (missingMatchIds) {
    await Promise.all(
      missingMatchIds.map((matchId) => {
        syncParticipants(matchId);
      }),
    );
  }

  const recentParticipatedMatches = await getPastNGames(account.puuid, count);

  return recentParticipatedMatches;
};

console.log(await returnRecentMatches("Georgie#EZLL", 40));
