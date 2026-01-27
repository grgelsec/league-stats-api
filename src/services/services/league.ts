import "dotenv/config";
import type { AccountDto, region } from "@types";
class LeagueService {
  private apiKey: string;
  private region: string;

  constructor(apiKey: string, region: string) {
    if (!apiKey) {
      throw new Error("RIOT_API_KEY is not set.");
    }

    this.apiKey = apiKey;
    this.region = region;
  }

  private get baseURL(): string {
    return `https://${this.region}.api.riotgames.com`;
  }

  private async request<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      headers: { "X-Riot-Token": this.apiKey },
    });

    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`);
    }

    const data = await res.json();

    return data;
  }

  async getSummonerByRiotId(riotId: string) {
    if (!riotId || !riotId.includes("#")) {
      throw new Error(`RiotId not in correct format.`);
    }

    const [name, tag] = riotId.split("#");

    if (!name || !tag) {
      throw new Error("invalid RiotId");
    }
    console.log(name, tag);

    return this.request<AccountDto>(
      `/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`,
    );
  }
}

const RIOT_API_KEY = process.env.RIOT_API_KEY;

const leage = new LeagueService(RIOT_API_KEY!, "americas");

leage.getSummonerByRiotId("Georgie#EZLL");
