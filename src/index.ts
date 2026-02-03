import express, { request, response } from "express";
import type { Express } from "express";
import { summonerRouter } from "@routes";
import { rateLimit } from "@middleware";
import "dotenv";

const app: Express = express();
const port = 3000;

app.listen(port, () => {
  console.log(`League API listening on port ${port}`);
});

app.use(express.json());

app.use(rateLimit);

app.get("/api/v1", (request, response) => {
  response.json({ message: "League API server is live!" });
});

app.use("/api/v1/summoner", summonerRouter);
