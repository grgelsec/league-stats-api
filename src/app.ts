import express from "express";
import type { Express } from "express";
import { summonerRouter, matchesRouter, championsRouter } from "@routes";
import { backpressure, errorHandler, rateLimit } from "@middleware";
import "dotenv";
import { NotFoundError } from "@error";

const app: Express = express();
const port = 3000;

app.set("trust proxy", true);

// register middleware
app.use(express.json());
app.use(rateLimit);
app.use(backpressure);

app.use("/api/v1", summonerRouter);
app.use("/api/v1", championsRouter);
app.use("/api/v1", matchesRouter);

app.listen(port, () => {
  console.log(`League API listening on port ${port}`);
});

app.use((req, res, next) => {
  next(new NotFoundError(`Cannot find ${req.originalUrl}`));
});

app.use(errorHandler);

export default app;
