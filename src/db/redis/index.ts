import "dotenv/config";
import { Redis } from "ioredis";
import { getEnv } from "@utils";

const REDIS_URL = getEnv("REDIS_URL");
export const redis = new Redis(REDIS_URL, {
  retryStrategy(times) {
    const delay = Math.min(times * 50, 200);
    return delay;
  },
  reconnectOnError(err) {
    if (err.message.includes("READONLY")) {
      return true;
    }
    return 2;
  },
});

redis.on("error", (err) => console.error("Redis error: ", err));

redis.on("connect", () => console.log("redis connected"));
