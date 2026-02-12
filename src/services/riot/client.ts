import "dotenv/config";
import type { AccountDto, RiotMatchDto, FetchOptions } from "@types";

const RIOT_API_KEY = process.env.RIOT_API_KEY!;
const REGION = process.env.RIOT_REGION || "americas";
const BASE_URL = `https://${REGION}.api.riotgames.com`;

export async function request<T>(endpoint: string, options: FetchOptions = {}) {
  const { timeout = 5000, retries = 2, ...fetchOpions } = options;

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    const contoller = new AbortController();
    const timeoutId = setTimeout(() => contoller.abort(), timeout);

    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...fetchOpions,
        headers: { "X-Riot-Token": RIOT_API_KEY, ...fetchOpions.headers },
        signal: contoller.signal,
      });

      if (!res.ok) {
        if (res.status >= 400 && res.status < 500) {
          const body = res.text();
          throw new Error(`${res.status}, ${res.statusText} \n Body: ${body}`);
        }
        throw new Error(`HTTP: ${res.status}`);
      }

      //Clear timrout timer, call succeeded
      clearTimeout(timeoutId);

      const data = (await res.json()) as T;
      console.log(data);

      return data;
    } catch (error) {
      //Ensure the error caught is an error, if not then
      lastError = error instanceof Error ? error : new Error(String(error));

      const isTimeout = lastError.name === "AbortError";
      const isServerError = !lastError.message.startsWith("HTTP 4");

      if ((isServerError || isTimeout) && attempt < retries) {
        //retry the call with exponential backoff
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
        continue;
      }
      break;
    }
  }
  throw lastError;
}

export async function getSummonerByPuuid(puuid: string) {
  if (!puuid) throw new Error(`Missing player unique user id (puuid).`);

  return request<AccountDto>(
    `/riot/account/v1/accounts/by-puuid/${encodeURIComponent(puuid)}`,
  );
}

export async function getSummonerByRiotId(riotId: string) {
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

export async function getMatchIdsByPuuid(puuid: string) {
  if (!puuid) throw new Error(`Missing player unique user id (puuid).`);

  return request<Array<string>>(
    `/lol/match/v5/matches/by-puuid/${encodeURIComponent(puuid)}/ids`,
  );
}

export async function getMatchByMatchId(matchId: string) {
  if (!matchId) throw new Error("Missing match id (matchId");

  return request<RiotMatchDto>(`/lol/match/v5/matches/${encodeURI(matchId)}`);
}
