import { insertPlayer } from "@queries";
import { getAccountByRiotId } from "@services/riot/account.js";
import { getSummonerByPuuid } from "@services/riot/summoner.js";

export async function syncPlayer(riotId: string) {
  if (!riotId) throw new Error("Missing player riot id (riotId with tagline).");

  const accountData = await getAccountByRiotId(riotId);

  if (!accountData.puuid)
    throw new Error("Puuid was not returned by getAccountByRiotId!");

  console.log("account data: ", accountData);

  const summonerData = await getSummonerByPuuid(accountData.puuid);
  console.log("summoner data: ", summonerData);

  return await insertPlayer(accountData, summonerData);
}

syncPlayer("Georgie#EZLL");
