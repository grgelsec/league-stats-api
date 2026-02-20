export type region = "americas" | "europe" | "asia";

export interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  region?: string;
}

export interface SummonerDto {
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

export interface AccountDto {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface MatchDto {
  metadata: MetadataDto;
  info: InfoDto;
}

export interface MetadataDto {
  dataVersion: string;
  matchId: string;
  participants: string[];
}

export interface InfoDto {
  endOfGameResult: string;
  gameCreation: number;
  gameDuration: number;
  gameEndTimestamp: number;
  gameId: number;
  gameMode: string;
  gameName: string;
  gameStartTimestamp: number;
  gameType: string;
  gameVersion: string;
  mapId: number;
  participants: ParticipantDto[];
  platformId: string;
  queueId: number;
  teams: TeamDto[];
  tournamentCode: string;
}

export interface ParticipantDto {
  allInPings: number;
  assistMePings: number;
  assists: number;
  baronKills: number;
  bountyLevel: number;
  champExperience: number;
  champLevel: number;
  championId: number;
  championName: string;
  commandPings: number;
  championTransform: 0 | 1 | 2;
  consumablesPurchased: number;
  challenges: ChallengesDto;
  damageDealtToBuildings: number;
  damageDealtToObjectives: number;
  damageDealtToTurrets: number;
  damageSelfMitigated: number;
  deaths: number;
  detectorWardsPlaced: number;
  doubleKills: number;
  dragonKills: number;
  eligibleForProgression: boolean;
  enemyMissingPings: number;
  enemyVisionPings: number;
  firstBloodAssist: boolean;
  firstBloodKill: boolean;
  firstTowerAssist: boolean;
  firstTowerKill: boolean;
  gameEndedInEarlySurrender: boolean;
  gameEndedInSurrender: boolean;
  holdPings: number;
  getBackPings: number;
  goldEarned: number;
  goldSpent: number;
  individualPosition: string;
  inhibitorKills: number;
  inhibitorTakedowns: number;
  inhibitorsLost: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  itemsPurchased: number;
  killingSprees: number;
  kills: number;
  lane: string;
  largestCriticalStrike: number;
  largestKillingSpree: number;
  largestMultiKill: number;
  longestTimeSpentLiving: number;
  magicDamageDealt: number;
  magicDamageDealtToChampions: number;
  magicDamageTaken: number;
  missions: MissionsDto;
  neutralMinionsKilled: number;
  needVisionPings: number;
  nexusKills: number;
  nexusTakedowns: number;
  nexusLost: number;
  objectivesStolen: number;
  objectivesStolenAssists: number;
  onMyWayPings: number;
  participantId: number;
  playerScore0: number;
  playerScore1: number;
  playerScore2: number;
  playerScore3: number;
  playerScore4: number;
  playerScore5: number;
  playerScore6: number;
  playerScore7: number;
  playerScore8: number;
  playerScore9: number;
  playerScore10: number;
  playerScore11: number;
  pentaKills: number;
  perks: PerksDto;
  physicalDamageDealt: number;
  physicalDamageDealtToChampions: number;
  physicalDamageTaken: number;
  placement: number;
  playerAugment1: number;
  playerAugment2: number;
  playerAugment3: number;
  playerAugment4: number;
  playerSubteamId: number;
  pushPings: number;
  profileIcon: number;
  puuid: string;
  quadraKills: number;
  riotIdGameName: string;
  riotIdTagline: string;
  role: string;
  sightWardsBoughtInGame: number;
  spell1Casts: number;
  spell2Casts: number;
  spell3Casts: number;
  spell4Casts: number;
  subteamPlacement: number;
  summoner1Casts: number;
  summoner1Id: number;
  summoner2Casts: number;
  summoner2Id: number;
  summonerId: string;
  summonerLevel: number;
  summonerName: string;
  teamEarlySurrendered: boolean;
  teamId: number;
  teamPosition: string;
  timeCCingOthers: number;
  timePlayed: number;
  totalAllyJungleMinionsKilled: number;
  totalDamageDealt: number;
  totalDamageDealtToChampions: number;
  totalDamageShieldedOnTeammates: number;
  totalDamageTaken: number;
  totalEnemyJungleMinionsKilled: number;
  totalHeal: number;
  totalHealsOnTeammates: number;
  totalMinionsKilled: number;
  totalTimeCCDealt: number;
  totalTimeSpentDead: number;
  totalUnitsHealed: number;
  tripleKills: number;
  trueDamageDealt: number;
  trueDamageDealtToChampions: number;
  trueDamageTaken: number;
  turretKills: number;
  turretTakedowns: number;
  turretsLost: number;
  unrealKills: number;
  visionScore: number;
  visionClearedPings: number;
  visionWardsBoughtInGame: number;
  wardsKilled: number;
  wardsPlaced: number;
  win: boolean;
}

export interface ChallengesDto {
  "12AssistStreakCount": number;
  baronBuffGoldAdvantageOverThreshold: number;
  controlWardTimeCoverageInRiverOrEnemyHalf: number;
  earliestBaron: number;
  earliestDragonTakedown: number;
  earliestElderDragon: number;
  earlyLaningPhaseGoldExpAdvantage: number;
  fasterSupportQuestCompletion: number;
  fastestLegendary: number;
  hadAfkTeammate: number;
  highestChampionDamage: number;
  highestCrowdControlScore: number;
  highestWardKills: number;
  junglerKillsEarlyJungle: number;
  killsOnLanersEarlyJungleAsJungler: number;
  laningPhaseGoldExpAdvantage: number;
  legendaryCount: number;
  maxCsAdvantageOnLaneOpponent: number;
  maxLevelLeadLaneOpponent: number;
  mostWardsDestroyedOneSweeper: number;
  mythicItemUsed: number;
  playedChampSelectPosition: number;
  soloTurretsLategame: number;
  takedownsFirst25Minutes: number;
  teleportTakedowns: number;
  thirdInhibitorDestroyedTime: number;
  threeWardsOneSweeperCount: number;
  visionScoreAdvantageLaneOpponent: number;
  InfernalScalePickup: number;
  fistBumpParticipation: number;
  voidMonsterKill: number;
  abilityUses: number;
  acesBefore15Minutes: number;
  alliedJungleMonsterKills: number;
  baronTakedowns: number;
  blastConeOppositeOpponentCount: number;
  bountyGold: number;
  buffsStolen: number;
  completeSupportQuestInTime: number;
  controlWardsPlaced: number;
  damagePerMinute: number;
  damageTakenOnTeamPercentage: number;
  dancedWithRiftHerald: number;
  deathsByEnemyChamps: number;
  dodgeSkillShotsSmallWindow: number;
  doubleAces: number;
  dragonTakedowns: number;
  legendaryItemUsed: number[];
  effectiveHealAndShielding: number;
  elderDragonKillsWithOpposingSoul: number;
  elderDragonMultikills: number;
  enemyChampionImmobilizations: number;
  enemyJungleMonsterKills: number;
  epicMonsterKillsNearEnemyJungler: number;
  epicMonsterKillsWithin30SecondsOfSpawn: number;
  epicMonsterSteals: number;
  epicMonsterStolenWithoutSmite: number;
  firstTurretKilled: number;
  firstTurretKilledTime: number;
  flawlessAces: number;
  fullTeamTakedown: number;
  gameLength: number;
  getTakedownsInAllLanesEarlyJungleAsLaner: number;
  goldPerMinute: number;
  hadOpenNexus: number;
  immobilizeAndKillWithAlly: number;
  initialBuffCount: number;
  initialCrabCount: number;
  jungleCsBefore10Minutes: number;
  junglerTakedownsNearDamagedEpicMonster: number;
  kda: number;
  killAfterHiddenWithAlly: number;
  killedChampTookFullTeamDamageSurvived: number;
  killingSprees: number;
  killParticipation: number;
  killsNearEnemyTurret: number;
  killsOnOtherLanesEarlyJungleAsLaner: number;
  killsOnRecentlyHealedByAramPack: number;
  killsUnderOwnTurret: number;
  killsWithHelpFromEpicMonster: number;
  knockEnemyIntoTeamAndKill: number;
  kTurretsDestroyedBeforePlatesFall: number;
  landSkillShotsEarlyGame: number;
  laneMinionsFirst10Minutes: number;
  lostAnInhibitor: number;
  maxKillDeficit: number;
  mejaisFullStackInTime: number;
  moreEnemyJungleThanOpponent: number;
  multiKillOneSpell: number;
  multikills: number;
  multikillsAfterAggressiveFlash: number;
  multiTurretRiftHeraldCount: number;
  outerTurretExecutesBefore10Minutes: number;
  outnumberedKills: number;
  outnumberedNexusKill: number;
  perfectDragonSoulsTaken: number;
  perfectGame: number;
  pickKillWithAlly: number;
  poroExplosions: number;
  quickCleanse: number;
  quickFirstTurret: number;
  quickSoloKills: number;
  riftHeraldTakedowns: number;
  saveAllyFromDeath: number;
  scuttleCrabKills: number;
  shortestTimeToAceFromFirstTakedown: number;
  skillshotsDodged: number;
  skillshotsHit: number;
  snowballsHit: number;
  soloBaronKills: number;
  SWARM_DefeatAatrox: number;
  SWARM_DefeatBriar: number;
  SWARM_DefeatMiniBosses: number;
  SWARM_EvolveWeapon: number;
  SWARM_Have3Passives: number;
  SWARM_KillEnemy: number;
  SWARM_PickupGold: number;
  SWARM_ReachLevel50: number;
  SWARM_Survive15Min: number;
  SWARM_WinWith5EvolvedWeapons: number;
  soloKills: number;
  stealthWardsPlaced: number;
  survivedSingleDigitHpCount: number;
  survivedThreeImmobilizesInFight: number;
  takedownOnFirstTurret: number;
  takedowns: number;
  takedownsAfterGainingLevelAdvantage: number;
  takedownsBeforeJungleMinionSpawn: number;
  takedownsFirstXMinutes: number;
  takedownsInAlcove: number;
  takedownsInEnemyFountain: number;
  teamBaronKills: number;
  teamDamagePercentage: number;
  teamElderDragonKills: number;
  teamRiftHeraldKills: number;
  tookLargeDamageSurvived: number;
  turretPlatesTaken: number;
  turretsTakenWithRiftHerald: number;
  turretTakedowns: number;
  twentyMinionsIn3SecondsCount: number;
  twoWardsOneSweeperCount: number;
  unseenRecalls: number;
  visionScorePerMinute: number;
  wardsGuarded: number;
  wardTakedowns: number;
  wardTakedownsBefore20M: number;
}

export interface MissionsDto {
  playerScore0: number;
  playerScore1: number;
  playerScore2: number;
  playerScore3: number;
  playerScore4: number;
  playerScore5: number;
  playerScore6: number;
  playerScore7: number;
  playerScore8: number;
  playerScore9: number;
  playerScore10: number;
  playerScore11: number;
}

export interface PerksDto {
  statPerks: PerkStatsDto;
  styles: PerkStyleDto[];
}

export interface PerkStatsDto {
  defense: number;
  flex: number;
  offense: number;
}

export interface PerkStyleDto {
  description: string;
  selections: PerkStyleSelectionDto[];
  style: number;
}

export interface PerkStyleSelectionDto {
  perk: number;
  var1: number;
  var2: number;
  var3: number;
}

export interface MatchTeamDto {
  matchId: string;
  teamId: number;
  win: boolean;
  objectives: {
    baron: {
      first: boolean;
      kills: number;
    };
    dragon: {
      first: boolean;
      kills: number;
    };
    herald: {
      first: boolean;
      kills: number;
    };
    tower: {
      first: boolean;
      kills: number;
    };
    inhibitor: {
      first: boolean;
      kills: number;
    };
    champion: {
      first: boolean;
      kills: number;
    };
  };
}

export interface TeamDto {
  matchId: string;
  teamId: number;
  objectives: ObjectivesDto;
  win: boolean;
}

export interface BanDto {
  championId: number;
  pickTurn: number;
}

export interface ObjectivesDto {
  baron: ObjectiveDto;
  champion: ObjectiveDto;
  dragon: ObjectiveDto;
  horde: ObjectiveDto;
  inhibitor: ObjectiveDto;
  riftHerald: ObjectiveDto;
  tower: ObjectiveDto;
}

export interface ObjectiveDto {
  first: boolean;
  kills: number;
}

export interface RiotMatchDto {
  metadata: {
    matchId: string;
    participants: string[]; // Array of PUUIDs
  };
  info: {
    gameDuration: number; // seconds
    gameMode: string;
    gameEndTimestamp: number;
    queueId: number;
    participants: RiotParticipantDto[];
    teams: RiotTeamDto[];
  };
}

export interface RiotParticipantDto {
  puuid: string;
  championName: string;
  championId: number;
  teamPosition: string; // TOP, JUNGLE, MID, BOTTOM, UTILITY
  teamId: number;

  // Core stats
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;

  // Economy
  goldEarned: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;

  // Damage
  totalDamageDealtToChampions: number;

  // Vision
  visionScore: number;
  wardsPlaced: number;
  controlWardsPlaced: number;
  wardsKilled: number;

  item_0: number;
  item_1: number;
  item_2: number;
  item_3: number;
  item_4: number;
  item_5: number;
  item_6: number;

  timePlayed: number;
}

export interface RiotTeamDto {
  teamId: number;
  win: boolean;
}

export interface StoredMatch {
  // IDs
  match_id: string;
  puuid: string;

  // Champion
  champion_name: string;
  champion_id: number;
  team_position: string;

  // Core stats
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  kda: number; // DERIVED

  // Economy
  gold_earned: number;
  total_minions_killed: number;
  cs_per_min: number; // DERIVED
  gold_per_min: number; // DERIVED

  // Damage
  total_damage_to_champions: number;
  damage_share: number; // DERIVED (needs team data)

  // Vision
  vision_score: number;
  wards_placed: number;
  control_wards_placed: number;
  wards_killed: number;

  // Objectives
  dragon_takedowns: number;
  baron_takedowns: number;
  turret_takedowns: number;

  // Early game
  cs_at_10: number;

  // Game info
  game_mode: string;
  queue_id: number;
  game_duration: number; // seconds
  game_timestamp: Date;
}
