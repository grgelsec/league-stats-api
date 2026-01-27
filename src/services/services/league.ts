import "dotenv/config";

const RIOT_API_KEY = process.env.RIOT_API_KEY;

const summonerByName = async () => {
  try {
    const name = "Georgie";
    const tag = "EZLL";

    if (!RIOT_API_KEY) {
      throw new Error("RIOT_API_KEY is not set.");
    }

    const res = await fetch(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}`,
      {
        headers: { "X-Riot-Token": RIOT_API_KEY },
      },
    );

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();

    console.log(res.status);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error occoured fetching summoner names");
  }
};

summonerByName();
