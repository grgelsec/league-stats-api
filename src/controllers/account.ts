import express, { type Request, type Response } from "express";
import "dotenv/config";
import type { AccountDto } from "@types";
import { BadRequestError, NotFoundError } from "@error";
import { getAccountBySummonerName } from "@queries";

export const getPlayerId = async (req: Request, res: Response) => {
  const riotId = req.params.riotId as string;

  if (!riotId) {
    throw new BadRequestError("Riot ID is required");
  }

  const account: AccountDto = await getAccountBySummonerName(riotId);

  if (!account) throw new NotFoundError();

  return res.json(account);
};
