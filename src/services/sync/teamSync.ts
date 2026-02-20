import { insertTeams } from "@queries";
import { getMatchByMatchId } from "@services/riot/match.js";
import type { MatchDto, TeamDto, MatchTeamDto } from "@types";

export const syncTeams = async (matchid: string) => {
  if (!matchid) throw Error("Missing matchid (matchid).");

  const match: MatchDto = await getMatchByMatchId(matchid);

  if (!match.info.teams[0] || !match.info.teams[1])
    throw Error("Missing match.");

  const team1: MatchTeamDto = {
    matchId: match.metadata.matchId,
    teamId: match.info.teams[0]?.teamId,
    win: match.info.teams[0].win,
    objectives: {
      baron: {
        first: match.info.teams[0]?.objectives.baron.first,
        kills: match.info.teams[0]?.objectives.baron.kills,
      },
      dragon: {
        first: match.info.teams[0]?.objectives.dragon.first,
        kills: match.info.teams[0]?.objectives.dragon.kills,
      },
      herald: {
        first: match.info.teams[0]?.objectives.riftHerald.first,
        kills: match.info.teams[0]?.objectives.riftHerald.kills,
      },
      tower: {
        first: match.info.teams[0]?.objectives.tower.first,
        kills: match.info.teams[0]?.objectives.tower.kills,
      },
      inhibitor: {
        first: match.info.teams[0]?.objectives.inhibitor.first,
        kills: match.info.teams[0]?.objectives.inhibitor.kills,
      },
      champion: {
        first: match.info.teams[0]?.objectives.champion.first,
        kills: match.info.teams[0]?.objectives.champion.kills,
      },
    },
  };

  const team2: MatchTeamDto = {
    matchId: match.metadata.matchId,
    teamId: match.info.teams[1]?.teamId,
    win: match.info.teams[1].win,
    objectives: {
      baron: {
        first: match.info.teams[1]?.objectives.baron.first,
        kills: match.info.teams[1]?.objectives.baron.kills,
      },
      dragon: {
        first: match.info.teams[1]?.objectives.dragon.first,
        kills: match.info.teams[1]?.objectives.dragon.kills,
      },
      herald: {
        first: match.info.teams[1]?.objectives.riftHerald.first,
        kills: match.info.teams[1]?.objectives.riftHerald.kills,
      },
      tower: {
        first: match.info.teams[1]?.objectives.tower.first,
        kills: match.info.teams[1]?.objectives.tower.kills,
      },
      inhibitor: {
        first: match.info.teams[1]?.objectives.inhibitor.first,
        kills: match.info.teams[1]?.objectives.inhibitor.kills,
      },
      champion: {
        first: match.info.teams[1]?.objectives.champion.first,
        kills: match.info.teams[1]?.objectives.champion.kills,
      },
    },
  };

  try {
    await insertTeams(match, team1);
    await insertTeams(match, team2);
  } catch (error) {
    throw new Error(
      `Failed to insert teams ${matchid}, ${(error as Error).message}`,
    );
  }
};

syncTeams("NA1_5493139552");
