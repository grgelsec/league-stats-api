import { type NextFunction, type Request, type Response } from "express";

//TODO: Re-implment with sliding window

//Rate-Limit constants
const maxRequests = 5;
const windowSize = 20000;

//Tracking
let requestCount = 0;
let lastRequestTime = 0;

//Rate limiting with fixed window, currWindow calculated on each request. If maxRequests is hit while window size is small, error is thrown.
export const rateLimit = (req: Request, res: Response, next: NextFunction) => {
  const requestTime = Date.now();
  const currWindow = requestTime - lastRequestTime;

  //Request passes through if requestInterval
  if (requestCount >= maxRequests && currWindow <= windowSize) {
    res.status(429).json({
      success: "false",
      error: "Rate limit exceeded",
    });
    return console.log("Rate limit exceeded!");
  }

  if (currWindow > windowSize) {
    requestCount = 0;
  }

  console.log("Request recieved!");
  requestCount += 1;
  lastRequestTime = requestTime;

  //TEST
  console.log(
    `Rate Limit Metrics: \n Request Count: ${requestCount} \n Request time: ${requestTime} \n Time From Last Request: ${currWindow}`,
  );

  next();
};
