import express, { type Request, type Response } from "express";
import "dotenv/config";
import type { AccountDto } from "@types";
import { getAccountByRiotId } from "@services/riot";

export const getPlayerId = async (req: Request, res: Response) => {
  const data: AccountDto = await getAccountByRiotId(
    req.params.riotId as string,
  );

  return res.json(data);
};
