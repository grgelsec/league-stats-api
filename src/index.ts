import express from "express";
import type { Express, NextFunction, Request, Response } from "express";
import { summonerRouter, matchesRouter, championsRouter } from "@routes";
import { errorHandler, rateLimiter, slidingWindow } from "@middleware";
import "dotenv";
import { AuthorizationError, NotFoundError } from "@error";

const app: Express = express();
const port = 3000;

app.set("trust proxy", true);

// register middleware
app.use(express.json());

app.listen(port, () => {
  console.log(`League API listening on port ${port}`);
});

// rate limiting
app.use(rateLimiter);

app.use("/api/v1", summonerRouter);
app.use("/api/v1", championsRouter);
app.use("/api/v1", matchesRouter);

app.use((req, res, next) => {
  next(new NotFoundError(`Cannot find ${req.originalUrl}`));
});

app.use(errorHandler);

export default app;
