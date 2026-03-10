import express, { type Request, type Response } from "express";
import "dotenv/config";
import type { AccountDto } from "@types";
import { getAccountByRiotId } from "@services/riot";
import { BadRequestError, NotFoundError } from "@error";

export const getPlayerId = async (req: Request, res: Response) => {
  const riotId = req.params.riotId as string;

  if (!riotId) {
    throw new BadRequestError("Riot ID is required");
  }

  const account: AccountDto = await getAccountByRiotId(riotId);

  if (!account) throw new NotFoundError();

  return res.json(account);
};
