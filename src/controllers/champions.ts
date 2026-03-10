import type { Request, Response } from "express";
import { championBanRate } from "../services/hexcore/champions.js";
import { BadRequestError, NotFoundError } from "@error";

export const getChampionBanRate = async (req: Request, res: Response) => {
  const championName = req.params.championName as string;

  if (!championBanRate) throw new BadRequestError("Champion name is required");

  const banrate = await championBanRate(championName);

  if (!banrate) throw new NotFoundError("Banrate not found");

  return res.json(banrate);
};
