# TripWise — MERN Stack (JavaScript)

This is the **plain JavaScript** MERN version of TripWise (no TypeScript anywhere — every `.ts`/`.tsx` file has been converted to `.js`/`.jsx`).

- **`server/`** — Node.js + Express + MongoDB (Mongoose), written in plain JS using CommonJS (`require`/`module.exports`).
- **`client/`** — React + Vite, written in plain JS/JSX (no `tsconfig.json`, no `@types/*`, no type annotations).

Functionally this is identical to the TypeScript version: same routes, same itinerary/budget logic, same pages, same design.

## Project structure

```
trip-planner-mern-js/
├── client/          React + Vite frontend (JavaScript)
│   └── src/
│       ├── pages/       Home.jsx, Planner.jsx, Calculator.jsx, Dashboard.jsx, Destinations.jsx, DestinationDetail.jsx, About.jsx, NotFound.jsx
│       ├── components/  navbar.jsx, footer.jsx, search-form.jsx, destination-card.jsx, budget-breakdown-card.jsx, ui/ (badge.jsx, select.jsx)
│       └── lib/         api.js (fetch wrapper), format.js (currency formatting)
└── server/          Express + MongoDB backend (JavaScript)
    └── src/
        ├── models/       Destination.js, Trip.js (Mongoose schemas)
        ├── routes/       destinations.js, planner.js, trips.js
        ├── utils/        tripCalculations.js (itinerary + budget logic)
        └── seed/         seedDestinations.js + destinationsData.js (the 6 original destinations)
```

## Prerequisites

- Node.js 18+
- A MongoDB instance — local (`mongod` on `mongodb://127.0.0.1:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

## 1. Set up the server

```bash
cd server
cp .env.example .env
# edit .env if you're using Atlas — paste your connection string into MONGODB_URI
npm install
npm run seed     # loads Goa, Manali, Jaipur, Ooty, Mysore, Coorg into MongoDB
npm run dev      # starts the API on http://localhost:5000 (nodemon, auto-restarts on save)
```

Health check: `http://localhost:5000/api/health` → `{"status":"ok"}`.

## 2. Set up the client

In a second terminal:

```bash
cd client
cp .env.example .env
npm install
npm run dev      # starts the frontend on http://localhost:5173
```

Open `http://localhost:5173`.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/destinations` | List all destinations |
| GET | `/api/destinations/:slug` | Single destination detail |
| GET | `/api/planner/options` | Travel categories, day options, budget options |
| GET | `/api/planner/itinerary?dest=&days=&category=` | Day-wise itinerary + budget |
| GET | `/api/planner/budget?dest=&days=&category=` | Budget breakdown + comparison across styles |
| POST | `/api/trips` | Save a planned trip |
| GET | `/api/trips/recent?limit=` | Most recently saved trips (Dashboard) |
| GET | `/api/trips/stats` | Aggregate stats: trip count, destination count, avg budget |

## What's different from the TypeScript version

- No `tsconfig.json`, no `@types/*` packages, no `ts-node`/`typescript` dependency anywhere.
- Server uses CommonJS (`require`/`module.exports`) instead of ES module `import`/`export` + compiled TS.
- Client components are `.jsx` with plain destructured props (no prop-type interfaces). Runtime behavior is identical — Vite handles JSX in `.jsx` files natively, no type checking step.
- `lib/types.ts` (which only held type definitions) is gone; the one runtime helper it exported, `formatINR`, now lives in `lib/format.js`.

## Verified

- `cd server && node --check` on every file → no syntax errors; Express app boots and `/api/health` responds.
- `cd client && npx vite build` → builds cleanly to a production bundle.
