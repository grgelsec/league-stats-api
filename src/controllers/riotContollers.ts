import express, { type Request, type Response } from "express";
import "dotenv/config";
import type { AccountDto } from "@types";

//TODO:
// initialize the riot service for global export and import instead of every in every controller
const RIOT_API_KEY = process.env.RIOT_API_KEY!;

const riot = new RiotService(RIOT_API_KEY, "americas");

export const playerId = async (req: Request, res: Response) => {
  try {
    const { username }: { username: string } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        error: "Username is required.",
      });
    }
    const data: AccountDto = await riot.account.getSummonerByRiotId(username);

    if (!data) {
      return res.status(400).json({
        success: false,
        error: "No response from riot service.",
      });
    }

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};
