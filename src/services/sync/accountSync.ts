import { insertPlayer } from "@queries";
import { getAccountByRiotId } from "@services/riot/account.js";
import { getSummonerByPuuid } from "@services/riot/summoner.js";

export async function syncPlayer(riotId: string) {
  if (!riotId) throw new Error("Missing player riot id (riotId with tagline).");

  const accountData = await getAccountByRiotId(riotId);

  if (!accountData)
    throw new Error("data was not returned by getAccountByRiotId!");

  const summonerData = await getSummonerByPuuid(accountData.puuid);

  try {
    await insertPlayer(
      accountData.puuid,
      `${accountData.gameName}#${accountData.tagLine}`,
      summonerData.summonerLevel,
    );
  } catch (error) {
    throw new Error(
      `Failed to insert player ${accountData.puuid}: ${(error as Error).message}`,
    );
  }
}
