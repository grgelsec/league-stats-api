import "dotenv/config";
import type { FetchOptions } from "@types";
import { validPlatformRegion } from "@utils";

const RIOT_API_KEY = process.env.RIOT_API_KEY!;
let REGION = process.env.RIOT_REGION || "americas";
let BASE_URL = `https://${REGION}.api.riotgames.com`;

export async function request<T>(endpoint: string, options: FetchOptions = {}) {
  const { timeout = 5000, retries = 2, ...fetchOptions } = options;

  let lastError: Error | null = null;

  if (options.region && validPlatformRegion(options.region)) {
    REGION = options.region;
    BASE_URL = `https://${REGION}.api.riotgames.com`;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...fetchOptions,
        headers: { "X-Riot-Token": RIOT_API_KEY, ...fetchOptions.headers },
        signal: controller.signal,
      });

      if (!res.ok) {
        if (res.status >= 400 && res.status < 500) {
          const body = res.text();
          console.log(endpoint);
          throw new Error(`${res.status}, ${res.statusText} \n Body: ${body}`);
        }
        throw new Error(`HTTP: ${res.status}`);
      }

      //Clear timrout timer, call succeeded
      clearTimeout(timeoutId);

      const data = (await res.json()) as T;

      return data;
    } catch (error) {
      //Ensure the error caught is an error, if not then
      lastError = error instanceof Error ? error : new Error(String(error));

      const isTimeout = lastError.name === "AbortError";
      const isServerError = !lastError.message.startsWith("HTTP 4");

      if ((isServerError || isTimeout) && attempt < retries) {
        //retry the call with exponential backoff
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
        continue;
      }
      break;
    }
  }
  throw lastError;
}
