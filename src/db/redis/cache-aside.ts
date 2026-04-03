import { getParamHashKey } from "@utils";
import { redis } from "@redis";

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
  const cachedData = await redis.get(hashkey);
  const docArr = cachedData ? JSON.parse(cachedData) : [];

  if (docArr && docArr.length) {
    res.data = docArr;
    res.isFromCache = true;
  } else {
    const result: T = await fn(requestParam);

    if (result) {
      redis.set(hashkey, JSON.stringify(result), "EX", ttl);
    }

    res.data = result;
  }

  return res;
}
