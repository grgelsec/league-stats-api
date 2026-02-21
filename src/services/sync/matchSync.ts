import { insertMatch, insertMatchParticipants, insertPlayer } from "@queries";
import { getMatchByMatchId } from "@services/riot/match.js";
import type {
  MatchDto,
  ParticipantDto,
  RiotMatchDto,
  RiotParticipantDto,
} from "@types";

export const syncMatch = async (matchid: string) => {
  if (!matchid) throw new Error("missing matchid!");

  const match: MatchDto = await getMatchByMatchId(matchid);

  try {
    await insertMatch(match);
  } catch (error) {
    throw new Error(
      `Failed to insert match ${matchid}: ${(error as Error).message} `,
    );
  }
};

export const syncParticipants = async (matchid: string) => {
  if (!matchid) throw new Error("missing matchid!");

  const match: MatchDto = await getMatchByMatchId(matchid);
  const participants: ParticipantDto[] = match.info.participants;
  const participantsCleaned: RiotParticipantDto[] = [];

  // upserts players if they're not already in db. this repeats queries which i am not sure is good. Might change this flow.
  await Promise.all(
    participants.map((participant) => {
      insertPlayer(
        participant.puuid,
        `${participant.riotIdGameName}#${participant.riotIdTagline}`,
        participant.summonerLevel,
      );
    }),
  );

  await syncMatch(matchid);

  participants.map((participant) =>
    participantsCleaned.push({
      puuid: participant.puuid,
      championName: participant.championName,
      championId: participant.championId,
      teamPosition: participant.teamPosition,
      teamId: participant.teamId,
      kills: participant.kills,
      deaths: participant.deaths,
      assists: participant.assists,
      win: participant.win,
      goldEarned: participant.goldEarned,
      totalMinionsKilled: participant.totalMinionsKilled,
      neutralMinionsKilled: participant.neutralMinionsKilled,
      totalDamageDealtToChampions: participant.totalDamageDealtToChampions,
      visionScore: participant.visionScore,
      wardsPlaced: participant.wardsPlaced,
      controlWardsPlaced: participant.detectorWardsPlaced,
      wardsKilled: participant.wardsKilled,
      item_0: participant.item0,
      item_1: participant.item1,
      item_2: participant.item2,
      item_3: participant.item3,
      item_4: participant.item4,
      item_5: participant.item5,
      item_6: participant.item6,
      timePlayed: participant.timePlayed,
    }),
  );

  try {
    await Promise.all(
      participantsCleaned.map((participant) =>
        insertMatchParticipants(match, participant),
      ),
    );
  } catch (error) {
    throw new Error(
      `Failed to insert participants for match ${matchid}, ${(error as Error).message}`,
    );
  }
};
