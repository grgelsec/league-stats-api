import pool from "./pool.js";
import type { AccountDto, MatchDto, SummonerDto, TeamDto } from "@types";

export const insertPlayer = async (
  account: AccountDto,
  summoner: SummonerDto,
) => {
  return await pool.query(
    `INSERT INTO players (puuid, summoner_name, summoner_level, last_updated)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT(puuid) DO UPDATE SET
      summoner_name = $2,
      summoner_level = $3,
      last_updated = $4`,
    [account.puuid, account.gameName, summoner.summonerLevel, new Date()],
  );
};

export const insertMatch = async (match: MatchDto) => {
  return await pool.query(
    `INSERT INTO matches (match_id, game_mode, game_type, queue_id, map_id, game_duration, game_start_timestamp, game_end_timestamp, game_version, platform_id)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    ON CONFLICT(match_id) DO NOTHING`,
    [
      match.metadata.matchId,
      match.info.gameMode,
      match.info.gameType,
      match.info.queueId,
      match.info.mapId,
      match.info.gameDuration,
      match.info.gameStartTimestamp,
      match.info.gameEndTimestamp,
      match.info.gameVersion,
      match.info.platformId,
    ],
  );
};

export const insertTeams = async (match: MatchDto, team: TeamDto) => {
  return await pool.query(
    `INSERT INTO teams (match_id, team_id, win, baron_first, baron_kills, dragon_first, dragon_kills, herald_first, herald_kills, tower_first, tower_kills, inhibitor_first, inhibitor_kills, champion_kills
    VALUES($1, $2, 3$, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14))
    ON CONFLICT(match_id) DO NOTHING`,
    [
      match.metadata.matchId,
      team.teamId,
      team.win,
      team.objectives.baron.first,
      team.objectives.baron.kills,
      team.objectives.dragon.first,
      team.objectives.dragon.kills,
      team.objectives.riftHerald.first,
      team.objectives.riftHerald.kills,
      team.objectives.tower.first,
      team.objectives.tower.kills,
      team.objectives.inhibitor.first,
      team.objectives.inhibitor.kills,
      team.objectives.champion.kills,
    ],
  );
};
