CREATE TABLE players (
    puuid VARCHAR(100) PRIMARY KEY,
    summoner_name VARCHAR(100) NOT NULL,
    summoner_level INTEGER NOT NULL,
    last_updated TIMESTAMP NOT NULL
);

CREATE TABLE matches (
    match_id VARCHAR(50) PRIMARY KEY NOT NULL,
    game_mode VARCHAR(30) NOT NULL,
    game_type VARCHAR(30),
    queue_id INTEGER,
    map_id INTEGER,
    game_duration INTEGER,
    game_start_timestamp BIGINT NOT NULL,
    game_end_timestamp BIGINT,
    game_version VARCHAR(20),
    platform_id VARCHAR(10)
);

CREATE TABLE teams (
    id SERIAL PRIMARY KEY NOT NULL,
    match_id VARCHAR(50) REFERENCES matches (match_id),
    team_id SMALLINT NOT NULL,
    win BOOLEAN NOT NULL,
    baron_first BOOLEAN,
    baron_kills INTEGER,
    dragon_first BOOLEAN,
    dragon_kills INTEGER,
    herald_first BOOLEAN,
    herald_kills INTEGER,
    tower_first BOOLEAN,
    tower_kills INTEGER,
    inhibitor_first BOOLEAN,
    inhibitor_kills INTEGER,
    champion_kills INTEGER NOT NULL
);

CREATE TABLE bans (
    id SERIAL PRIMARY KEY NOT NULL,
    match_id VARCHAR(50) REFERENCES matches (match_id),
    team_id SMALLINT NOT NULL,
    champion_id INTEGER NOT NULL,
    pick_turn INTEGER
);

CREATE TABLE match_participants (
    id SERIAL PRIMARY KEY NOT NULL,
    match_id VARCHAR(50) REFERENCES matches (match_id),
    puuid VARCHAR(100) REFERENCES players (puuid),
    team_id SMALLINT NOT NULL,
    champion_id INTEGER NOT NULL,
    champion_name VARCHAR(20) NOT NULL,
    team_position VARCHAR(10) NOT NULL,
    win BOOLEAN NOT NULL,
    kills INTEGER NOT NULL,
    assists INTEGER NOT NULL,
    gold_earned INTEGER,
    total_minions_killed INTEGER NOT NULL,
    neutral_minions_killed INTEGER,
    total_damage_to_champions INTEGER NOT NULL,
    vision_score INTEGER NOT NULL,
    wards_placed INTEGER,
    wards_killed INTEGER,
    detector_wards_placed INTEGER,
    item_0 INTEGER,
    item_1 INTEGER,
    item_2 INTEGER,
    item_3 INTEGER,
    item_4 INTEGER,
    item_5 INTEGER,
    item_6 INTEGER,
    time_played INTEGER
);
