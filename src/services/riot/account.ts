import { request } from "./client.js";
import { type AccountDto } from "@types";

export async function getAccountByPuuid(puuid: string) {
  if (!puuid) throw new Error(`Missing player unique user id (puuid).`);

  return request<AccountDto>(
    `/riot/account/v1/accounts/by-puuid/${encodeURIComponent(puuid)}`,
  );
}

export async function getAccountByRiotId(riotId: string) {
  if (!riotId || !riotId.includes("#")) {
    throw new Error(`RiotId not in correct format.`);
  }

  const [name, tag] = riotId.split("#");

  if (!name || !tag) {
    throw new Error("invalid RiotId");
  }

  return request<AccountDto>(
    `/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`,
  );
}
