import type { NextFunction, Request, Response } from "express";
import { redis } from "@redis";
import { AuthorizationError, RateLimitError } from "@error";
//TODO: Re-implment with sliding window

export interface SlidingWindowCounterConfig {
  maxRequests: number;
  windowSeconds: number;
}

export const DEFAULT_CONFIG: SlidingWindowCounterConfig = {
  maxRequests: 10,
  windowSeconds: 10,
};

export interface RateLimitResult {
  allowed: boolean;
  remaining: number; // requests left in the current window
  limit: number; // configured maximum
  retryAfter: number | null; // seconds untilt he client should retry
  delay?: number | null;
}

export const slidingWindow = async (
  key: string,
  config: SlidingWindowCounterConfig = DEFAULT_CONFIG,
): Promise<RateLimitResult> => {
  const { maxRequests, windowSeconds } = config;

  const now = Math.floor(Date.now() / 1000);
  const currentWindow = Math.floor(now / windowSeconds);
  const previousWindow = currentWindow - 1;

  const currKey = `${key}:${currentWindow}`;
  const prevKey = `${key}:${previousWindow}`;

  // "weight" factor, ratio from 0 to 1 representing how far into the current window you are
  // 3 seconds into a 10 second window, elapsed is 0.3
  const elapsed = (now % windowSeconds) / windowSeconds;

  const prevCount = parseInt((await redis.get(prevKey)) ?? "0", 10);

  const weightedPrev = prevCount * (1 - elapsed);

  const currCount = parseInt((await redis.get(currKey)) ?? "0", 10);

  const estimatedCount = weightedPrev + currCount;

  if (estimatedCount >= maxRequests) {
    // calculate time left in current window
    const retryAfter = Math.ceil(windowSeconds * (1 - elapsed));
    return {
      allowed: false,
      remaining: 0,
      limit: maxRequests,
      retryAfter: Math.max(1, retryAfter),
    };
  }

  const newCount = await redis.incr(currKey);
  /*
    - if this is the first incr for that key, sets the TTL to 2x windowSeconds
    - TTL is 2x windowSeconds so the request count for that key persists across
    - current window and next window. automatic cleanup after 2x seconds.
  */
  if (newCount === 1) {
    await redis.expire(currKey, windowSeconds * 2);
  }

  const newEstimate = weightedPrev + newCount;
  const remaining = Math.max(0, Math.floor(maxRequests - newEstimate));

  return {
    allowed: true,
    remaining: remaining,
    limit: maxRequests,
    retryAfter: null,
  };
};

export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userIp = req.ip;

  if (!userIp)
    throw new AuthorizationError(
      "IP blocking is suspected, sure IP address is not restricted.",
    );

  const rateLimitRes = await slidingWindow(userIp);
  console.log(rateLimitRes);

  if (!rateLimitRes.allowed) {
    throw new RateLimitError(
      `Too many requests, please try in ${rateLimitRes.retryAfter} seconds.`,
    );
  }

  next();
};

// //Rate-Limit constants
// const maxRequests = 5;
// const windowSize = 20000;

// //Tracking
// let requestCount = 0;
// let lastRequestTime = 0;

// //Rate limiting with fixed window, currWindow calculated on each request. If maxRequests is hit while window size is small, error is thrown.
// export const rateLimit = (req: Request, res: Response, next: NextFunction) => {
//   const requestTime = Date.now();
//   const currWindow = requestTime - lastRequestTime;

//   //Request passes through if requestInterval
//   if (requestCount >= maxRequests && currWindow <= windowSize) {
//     res.status(429).json({
//       success: "false",
//       error: "Rate limit exceeded",
//     });
//     return console.log("Rate limit exceeded!");
//   }

//   if (currWindow > windowSize) {
//     requestCount = 0;
//   }

//   console.log("Request recieved!");
//   requestCount += 1;
//   lastRequestTime = requestTime;

//   //TEST
//   console.log(
//     `Rate Limit Metrics: \n Request Count: ${requestCount} \n Request time: ${requestTime} \n Time From Last Request: ${currWindow}`,
//   );

//   next();
// };
