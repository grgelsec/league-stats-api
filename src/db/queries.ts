import pool from "./pool.js";
import type {
  AccountDto,
  BanDto,
  MatchDto,
  MatchTeamDto,
  RiotParticipantDto,
  SummonerDto,
  TeamDto,
} from "@types";

export const insertPlayer = async (
  puuid: string,
  summonerName: string,
  summonerLevel: number,
) => {
  return await pool.query(
    `INSERT INTO players (puuid, summoner_name, summoner_level, last_updated)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT(puuid) DO UPDATE SET
      summoner_name = $2,
      summoner_level = $3,
      last_updated = $4`,
    [puuid, summonerName, summonerLevel, new Date()],
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

export const insertTeams = async (match: MatchDto, team: MatchTeamDto) => {
  return await pool.query(
    `INSERT INTO teams (match_id, team_id, win, baron_first, baron_kills, dragon_first, dragon_kills, herald_first, herald_kills, tower_first, tower_kills, inhibitor_first, inhibitor_kills, champion_first, champion_kills)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    ON CONFLICT(match_id, team_id) DO NOTHING`,
    [
      match.metadata.matchId,
      team.teamId,
      team.win,
      team.objectives.baron.first,
      team.objectives.baron.kills,
      team.objectives.dragon.first,
      team.objectives.dragon.kills,
      team.objectives.herald.first,
      team.objectives.herald.kills,
      team.objectives.tower.first,
      team.objectives.tower.kills,
      team.objectives.inhibitor.first,
      team.objectives.inhibitor.kills,
      team.objectives.champion.first,
      team.objectives.champion.kills,
    ],
  );
};

export const insertMatchParticipants = async (
  match: MatchDto,
  participant: RiotParticipantDto,
) => {
  return await pool.query(
    `INSERT INTO match_participants (match_id, puuid, team_id, champion_id, champion_name, team_position, win, kills, deaths, assists, gold_earned, total_minions_killed, neutral_minions_killed, total_damage_to_champions, vision_score, wards_placed, wards_killed, detector_wards_placed, item_0, item_1, item_2, item_3, item_4, item_5, item_6, time_played)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)
    ON CONFLICT(match_id, puuid) DO NOTHING`,
    [
      match.metadata.matchId,
      participant.puuid,
      participant.teamId,
      participant.championId,
      participant.championName,
      participant.teamPosition,
      participant.win,
      participant.kills,
      participant.deaths,
      participant.assists,
      participant.goldEarned,
      participant.totalMinionsKilled,
      participant.neutralMinionsKilled,
      participant.totalDamageDealtToChampions,
      participant.visionScore,
      participant.wardsPlaced,
      participant.wardsKilled,
      participant.controlWardsPlaced,
      participant.item_0,
      participant.item_1,
      participant.item_2,
      participant.item_3,
      participant.item_4,
      participant.item_5,
      participant.item_6,
      participant.timePlayed,
    ],
  );
};

export const insertBans = async (
  match: MatchDto,
  team: TeamDto,
  ban: BanDto,
) => {
  return await pool.query(
    `INSERT INTO bans (match_id, team_id, champion_id, pick_turn)
    VALUES($1, $2, $3, $4)
    ON CONFLICT(match_id, team_id, pick_turn) DO NOTHING`,
    [match.metadata.matchId, team.teamId, ban.championId, ban.pickTurn],
  );
};

export const getAccountBySummonerName = async (riotId: string) => {
  const result = await pool.query(
    `SELECT * FROM players WHERE summoner_name = $1`,
    [riotId],
  );
  return result.rows[0] || null;
};

export const getMissingMatchIds = async (matchIds: string[]) => {
  const result = await pool.query(
    `SELECT unnest($1::varchar[]) AS match_id
    EXCEPT
    SELECT match_id from matches`,
    [matchIds],
  );
  return result.rows.map((row) => row.match_id);
};

export const getPastNGames = async (puuid: string, count: number) => {
  const result = await pool.query(
    `SELECT mp.*
    FROM match_participants mp
    JOIN matches m ON mp.match_id = m.match_id
    WHERE mp.puuid = $1
    ORDER BY m.game_end_timestamp DESC
    LIMIT $2`,
    [puuid, count],
  );
  return result.rows;
};

export const getChampionBanRate = async (championId: number) => {
  //Need to write ban rate query
  const result = await pool.query(
    `SELECT
      COUNT(*) FILTER (WHERE champion_id = $1) AS champ_bans,
      COUNT(*) AS total_bans
    FROM bans`,
    [championId],
  );

  const { champ_bans, total_bans } = result.rows[0];

  return total_bans > 0 ? champ_bans / total_bans : 0;
};
