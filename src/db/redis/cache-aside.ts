import { getParamHashKey } from "@utils";
import { redis } from "@redis";
import e from "express";
import { time } from "console";

export async function cacheAside<T>(
  fn: (requestParam: string) => Promise<T>,
  requestParam: string,
  ttl: number,
) {
  let res: { data: T | null; isFromCache: boolean } = {
    data: null,
    isFromCache: false,
  };

  const hashkey = getParamHashKey(requestParam);

  try {
    const cachedData = await redis.get(hashkey);
    const docArr = cachedData ? JSON.parse(cachedData) : [];

    if (docArr && docArr.length) {
      res.data = docArr;
      res.isFromCache = true;
    } else {
      const result: T = await fn(requestParam);

      if (result) {
        await redis.set(hashkey, JSON.stringify(result), "EX", ttl);
      }

      res.data = result;
    }

    return res;
  } catch (e) {
    console.log(
      `Cache retrieval failure for key: ${hashkey}\n ${(e as Error).message} \n Falling back to database ${time}`,
    );

    const result: T = await fn(requestParam);

    return result;
  }
}
