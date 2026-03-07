import express from "express";
import type { Express } from "express";
import { summonerRouter, matchesRouter, championsRouter } from "@routes";
import { backpressure, errorHandler, rateLimit } from "@middleware";
import "dotenv";

const app: Express = express();
const port = 3000;

// register middleware
app.use(express.json());
app.use(rateLimit);
app.use(backpressure);

app.listen(port, () => {
  console.log(`League API listening on port ${port}`);
});

app.get("/api/v1", (request, response) => {
  response.json({ message: "League API server is live!" });
});

app.use("/api/v1", summonerRouter);
app.use("/api/v1", championsRouter);
app.use("/api/v1", matchesRouter);

app.use(errorHandler);
