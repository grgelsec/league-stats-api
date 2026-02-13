export function validRegion(region: string): boolean {
  const regions = ["americas", "europe", "korea"];

  return region.includes(region);
}

export function validPlatformRegion(region: string): boolean {
  const platformRegions = [
    "BR1",
    "EUN1",
    "EUW1",
    "JP1",
    "KR",
    "KR",
    "LA1",
    "LA2",
    "ME1",
    "na1",
    "OC1",
    "RU",
    "SG2",
    "TR1",
    "TW2",
    "VN2",
  ];

  return platformRegions.includes(region);
}
