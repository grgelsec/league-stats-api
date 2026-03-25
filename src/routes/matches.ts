import { Router } from "express";
import { getRecentMatches } from "@controllers";

export const matchesRouter = Router();

matchesRouter.get("/matches/:riotId/recent{/:count}", getRecentMatches);
