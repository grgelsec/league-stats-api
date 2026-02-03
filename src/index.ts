import express, { request, response } from "express";
import type { Express } from "express";

const app: Express = express();
const port = 3000;

app.listen(port, () => {
  console.log(`League API listening on port ${port}`);
});

app.use(express.json());

app.get("/", (request, response) => {
  response.json({ message: "League API server is live!" });
});
