import express from "express";
import type { Express, NextFunction, Request, Response } from "express";
import { summonerRouter, matchesRouter, championsRouter } from "@routes";
import { backpressure, errorHandler, slidingWindow } from "@middleware";
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
app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
  const userIp = req.ip;
  console.log(userIp);
  if (!userIp)
    throw new AuthorizationError(
      "IP blocking is suspected, sure IP address is not restricted.",
    );

  console.log("test");
  const rateLimitResponse = await slidingWindow(userIp);

  console.log(res.status(200).json(rateLimitResponse));

  next();
});
app.use(backpressure);

app.use("/api/v1", summonerRouter);
app.use("/api/v1", championsRouter);
app.use("/api/v1", matchesRouter);

app.use((req, res, next) => {
  next(new NotFoundError(`Cannot find ${req.originalUrl}`));
});

app.use(errorHandler);

export default app;
