import * as crypto from "node:crypto";

export const getParamHashKey = (requestParameter: string) => {
  let retKey = "";
  if (requestParameter) {
    retKey = crypto.createHash("sha256").update(requestParameter).digest("hex");
  }

  return "CACHE_ASIDE_" + retKey;
};
