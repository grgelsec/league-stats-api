import pool from "./pool.js";
import type { AccountDto, SummonerDto } from "@types";

export const insertPlayer = async (
  account: AccountDto,
  summoner: SummonerDto,
) => {
  return await pool.query(
    "INSERT INTO players (puuid, summoner_name, summoner_level, last_updated) VALUES ($1, $2, $3, $4) ON CONFLICT(puuid) DO UPDATE SET",
    [account.puuid, account.gameName, summoner.summonerLevel, new Date()],
  );
};
