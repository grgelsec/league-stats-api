import { getChampionId } from "@data";
import { getChampionBanRate } from "@queries";

export const championBanRate = async (championName: string) => {
  if (!championName) throw new Error("Champion input required!");

  const championId = await getChampionId(championName);
  const banRate = await getChampionBanRate(championId);

  return banRate;
};
