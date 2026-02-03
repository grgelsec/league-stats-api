import "dotenv/config";
import type {
  AccountDto,
  region,
  MatchDto,
  RiotMatchDto,
  FetchOptions,
} from "@types";
export class RiotService {
  private apiKey: string;
  private region: string;
  public account: AccountService;
  public match: MatchService;

  constructor(apiKey: string, region: string) {
    if (!apiKey) {
      throw new Error("RIOT_API_KEY is not set.");
    }

    this.apiKey = apiKey;
    this.region = region;

    this.account = new AccountService(this.request.bind(this));
    this.match = new MatchService(this.request.bind(this));
  }

  private get baseURL(): string {
    return `https://${this.region}.api.riotgames.com`;
  }

  private async request<T>(
    endpoint: string,
    options: FetchOptions = {},
  ): Promise<T> {
    const { timeout = 5000, retries = 2, ...fetchOpions } = options;

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= retries; attempt++) {
      const contoller = new AbortController();
      const timeoutId = setTimeout(() => contoller.abort(), timeout);

      try {
        const res = await fetch(`${this.baseURL}${endpoint}`, {
          ...fetchOpions,
          headers: { "X-Riot-Token": this.apiKey, ...fetchOpions.headers },
          signal: contoller.signal,
        });

        if (!res.ok) {
          if (res.status <= 400 && res.status < 500) {
            const body = res.text();
            throw new Error(
              `${res.status}, ${res.statusText} \n Body: ${body}`,
            );
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
        const lastError =
          error instanceof Error ? error : new Error(String(error));

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
}

class AccountService {
  private request: <T>(endpoint: string) => Promise<T>;

  constructor(request: <T>(endpoint: string) => Promise<T>) {
    this.request = request;
  }

  async getSummonerByPuuid(puuid: string) {
    if (!puuid) throw new Error(`Missing player unique user id (puuid).`);

    return this.request<AccountDto>(
      `/riot/account/v1/accounts/by-puuid/${encodeURIComponent(puuid)}`,
    );
  }

  async getSummonerByRiotId(riotId: string) {
    if (!riotId || !riotId.includes("#")) {
      throw new Error(`RiotId not in correct format.`);
    }

    const [name, tag] = riotId.split("#");

    if (!name || !tag) {
      throw new Error("invalid RiotId");
    }

    return this.request<AccountDto>(
      `/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`,
    );
  }
}

class MatchService {
  private request: <T>(endpoint: string) => Promise<T>;

  constructor(request: <T>(endpoint: string) => Promise<T>) {
    this.request = request;
  }

  async getMatchIdsByPuuid(puuid: string) {
    if (!puuid) throw new Error(`Missing player unique user id (puuid).`);

    return this.request<Array<string>>(
      `/lol/match/v5/matches/by-puuid/${encodeURIComponent(puuid)}/ids`,
    );
  }

  async getMatchByMatchId(matchId: string) {
    if (!matchId) throw new Error("Missing match id (matchId");

    return this.request<RiotMatchDto>(
      `/lol/match/v5/matches/${encodeURI(matchId)}`,
    );
  }
}

// const RIOT_API_KEY = process.env.RIOT_API_KEY;

// const league = new RiotService(RIOT_API_KEY!, "americas");

// league.account.getSummonerByRiotId("Georgie#EZLL");
// league.account.getSummonerByPuuid(
//   "UPDmamHMSP2-38FGcerju-z3mBbI2Z6Ti0-64gwd9P6vJ7OyEuN0vpXrXMeDOJNGrGlJY-9hte98Mw",
// );
// league.match.getMatchIdsByPuuid(
//   "UPDmamHMSP2-38FGcerju-z3mBbI2Z6Ti0-64gwd9P6vJ7OyEuN0vpXrXMeDOJNGrGlJY-9hte98Mw",
// );
// league.match.getMatchByMatchId("NA1_5477102812");
