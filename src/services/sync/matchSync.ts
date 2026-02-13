import { insertMatch } from "@queries";
import { getMatchByMatchId } from "@services/riot/match.js";
import type { MatchDto } from "@types";

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

syncMatch("NA1_5490669076");
