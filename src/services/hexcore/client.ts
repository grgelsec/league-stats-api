/*
  1. Function paramters: req, res, db query
      * need to see how to type functions as parameters in ts
  2. creates hash key from req
  3. checks cache, if cache hit, set result data and alert is from cache
  4. on cache miss, grab from db, set in redis and set result as db res
*/

const getHashKey = (_filter: Document) => {
  const crypto = require("node:crypto");

  let retKey = "";
  if (_filter) {
    const text = JSON.stringify(_filter);
    retKey = crypto.createHash("sha256").update(text).digest("hex");
  }

  return "CACHE_ASIDE_" + retKey;
};
