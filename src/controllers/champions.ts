import type { Request, Response } from "express";
import { championBanRate } from "../services/hexcore/champions.js";

export const getChampionBanRate = async (req: Request, res: Response) => {
  const data = await championBanRate(req.params.championName as string);

  return res.json(data);
};
