# Hexcore API

A League of Legends API wrapper built with Express.js v5 and TypeScript. It fetches player and match data from the Riot Games API, stores it in PostgreSQL, caches frequently accessed queries with Redis, and serves it through a set of REST endpoints.

## Tech Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js v5
- **Database:** PostgreSQL (via `pg`)
- **Cache:** Redis (via `ioredis`)
- **Validation:** Zod

## API Endpoints

All routes are prefixed with `/api/v1`.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/summoner/:riotId` | Look up a player's account info |
| GET | `/matches/:riotId/recent/:count?` | Get recent matches (count capped at 20) |
| GET | `/champions/:championName/banrate` | Get a champion's ban rate |

## Project Structure

```
src/
  controllers/    Request handlers
  services/
    riot/         Riot API client and endpoint wrappers
    hexcore/      Internal business logic
    sync/         Data synchronization between Riot API and the database
  db/
    redis/        Cache-aside implementation and Redis connection
    pool.ts       PostgreSQL connection pool
    queries.ts    SQL query functions
  middleware/     Error handler, rate limiter
  errors/         Custom error class hierarchy
  routes/         Route definitions
  utils/          Helpers for env vars, hashing, region validation
  types.ts        Riot API DTOs and shared types
```

## Design

- **Service layer** separates request handling from Riot API calls and database operations
- **Cache-aside** with configurable TTL for expensive queries like match history lookups
- **Sliding window rate limiting** backed by Redis, tracked per IP
- **Exponential backoff** in the Riot API client for retrying transient server errors
- **Centralized error handling** through an `AppError` class hierarchy and a single error-handling middleware
- **Dependency injection** for the Riot HTTP client

## Riot API Coverage

- Account lookup by Riot ID and by PUUID
- Summoner profile by PUUID (region-aware)
- Match history IDs by PUUID
- Full match details by match ID

## Setup

1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file:
   ```
   RIOT_API_KEY=<your Riot Games API key>
   PORT=3000
   DATABASE_URL=<PostgreSQL connection string>
   REDIS_URL=<Redis connection string>
   ```
4. Start the development server:
   ```
   npm run dev
   ```
