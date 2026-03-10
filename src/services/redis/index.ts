import "dotenv/config";
import { Redis } from "ioredis";
import { getEnv } from "@utils";

const REDIS_URL = getEnv("REDIS_URL");
export const redis = new Redis(REDIS_URL);

redis.on("error", (err) => console.error("Redis error: ", err));

redis.on("connect", () => console.log("redis connected"));
