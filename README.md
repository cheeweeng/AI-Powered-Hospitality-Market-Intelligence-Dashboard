# ACCOMY Market Intelligence & Pricing Signal Monitor

An AI-enabled travel and hospitality market intelligence dashboard for ACCOMY — tracking hotel rates, occupancy, flight corridors, competitor pricing signals, and executive AI briefings across Hong Kong, Singapore, Malaysia, and Mainland China.

<p align="center">
  <img width="1200" height="475" alt="ACCOMY Market Intelligence Dashboard" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</p>

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Security & Best Practices](#security--best-practices)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

ACCOMY operates flexible living, serviced accommodations, and hospitality solutions across four APAC markets. This system provides real-time visibility into:

- Hotel ADR, occupancy, and RevPAR trends
- Rate parity across 19 OTA and GDS channels
- Competitor promotional campaigns and strategic threats
- Pricing signals and demand surge detection
- AI-generated executive briefings grounded in live market data

## Features

| Feature | Description |
|---|---|
| **Regional Market Overview** | KPI cards for ADR, occupancy, RevPAR, and coverage across HK, SG, MY, CN |
| **Rate & Parity Monitor** | Channel-by-channel audit (Trip.com, Agoda, Booking.com, Expedia, Direct) with 14-day forward forecast curves |
| **Competitor Surveillance** | Pricing signal radar with severity filtering and status workflow (NEW → ACKNOWLEDGED → DISPATCHED → RESOLVED) |
| **AI Executive Briefing** | Gemini-powered synthesis of market data, competitor moves, and rate strategy recommendations |
| **Data Pipeline Telemetry** | SLA metrics, source health breakdown, and manual audit spot-check calibration |
| **Currency Normalization** | Real-time FX conversion across USD, HKD, SGD, MYR, CNY |
| **Automated Ingestion** | Simulated 6-hour collection cycle with data jitter and anomaly injection |

## Technology Stack

| Layer | Technology | Version |
|---|---|---|
| **Language** | TypeScript | ~5.8 |
| **Frontend** | React 19, React DOM 19 | ^19.0.1 |
| **Build** | Vite 6 | ^6.2.3 |
| **Styling** | Tailwind CSS v4 | ^4.1.14 |
| **Charts** | Recharts | ^2.15.1 |
| **Icons** | lucide-react | ^0.546.0 |
| **Backend** | Node.js + Express 4 | ^4.21.2 |
| **AI** | OpenRouter API (Mistral 7B) | — |
| **Package Manager** | npm / Bun | — |
| **Testing** | Vitest + @vitest/coverage-v8 | ^2.0.5 |

## Architecture

```
accomy-market-intel/
├── data/                    # JSON file store (persistence layer)
│   ├── markets.json
│   ├── hotels.json
│   ├── flights.json
│   ├── promos.json
│   ├── signals.json
│   ├── pipeline.json
│   └── audits.json
├── src/
│   ├── components/          # React UI components
│   │   ├── Navbar.tsx
│   │   ├── SuccessMetricsBar.tsx
│   │   ├── MarketOverviewView.tsx
│   │   ├── RateParityMonitorView.tsx
│   │   ├── CompetitorSignalsView.tsx
│   │   ├── AISummaryView.tsx
│   │   └── PipelineAuditView.tsx
│   ├── routes/              # Express API routers
│   │   ├── health.ts
│   │   ├── markets.ts
│   │   ├── hotels.ts
│   │   ├── flights.ts
│   │   ├── promos.ts
│   │   ├── signals.ts
│   │   ├── pipeline.ts
│   │   ├── audits.ts
│   │   └── aiSummary.ts
│   ├── store/               # JSON file store (persistence)
│   │   └── fileStore.ts
│   ├── types/               # TypeScript interfaces
│   │   └── market.ts
│   ├── data/                # Mock initial data
│   │   └── mockMarketData.ts
│   └── utils/               # Shared utilities
│       ├── formatters.ts
│       ├── formatters.test.ts
│       └── store/
│           └── fileStore.test.ts
├── server.ts                # Express app + Vite integration
├── vitest.config.ts         # Vitest configuration
├── index.html               # SPA entry point
├── package.json
└── tsconfig.json
```

## Prerequisites

- **Node.js** >= 18 (Node.js 22+ recommended)
- **npm** >= 9 or **Bun** >= 1.0
- **OpenRouter API key** — [https://openrouter.ai/](https://openrouter.ai/)

## Installation

### 1. Clone & Install Dependencies

```bash
cd accomy-market-intel
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
# OpenRouter API key for AI-powered executive briefings
OPENROUTER_API_KEY="your-openrouter-api-key"

# App URL (used for self-referential links and OAuth callbacks)
APP_URL="http://localhost:3000"
```

> **Security:** Never commit `.env` files. The `.gitignore` already excludes them.

### 3. Run the Dev Server

```bash
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Usage

### Dashboard Tabs

1. **Market Overview** — Regional KPI cards, ADR vs RevPAR benchmark chart, flight corridor leading indicators
2. **Rate & Parity Monitor** — Filter hotels by market/tier/parity status, inspect OTA channel audit tables, view 14-day rate forecast curves
3. **Competitor & Signals** — Pricing signal workflow (Acknowledge → Dispatch → Resolve), competitor promo cards with threat scoring
4. **AI Executive Briefing** — Generate AI-powered market synthesis with copy-to-clipboard and print support
5. **Data Pipeline & Audit** — SLA metrics, ingestion connector health, manual rate spot-check calibration log

### Triggering Data Collection

Click **"Run Ingestion"** in the navbar to simulate a data collection cycle. This:
- Jitters hotel ADRs by ±2%
- Refreshes pipeline freshness
- Randomly injects a new pricing signal (60% probability)
- Updates data coverage rate

### Logging Manual Audits

In the **Pipeline** tab, click **"Log Manual Rate Spot-Check"** to record a human-verified rate against the system's recorded rate. The system recalculates the accuracy error rate automatically.

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check + OpenRouter configuration status |
| GET | `/api/overview` | Aggregated pipeline health, counts, and markets |
| GET | `/api/markets` | List all market summaries |
| GET | `/api/hotels` | Hotel list (filter by `?market=`, `?tier=`) |
| GET | `/api/flights` | Flight corridor data |
| GET | `/api/promos` | Competitor promos (filter by `?market=`) |
| GET | `/api/signals` | All pricing signals |
| POST | `/api/signals/:id/action` | Update signal status |
| GET | `/api/pipeline` | Pipeline health metrics |
| GET | `/api/audits` | Manual audit log |
| POST | `/api/audits` | Log a new manual audit |
| POST | `/api/pipeline/trigger-collection` | Simulate data collection cycle |
| POST | `/api/ai-summary` | Generate AI executive briefing |

## Project Structure (Key Files)

| File | Purpose |
|---|---|
| `server.ts` | Express app bootstrap, Vite integration |
| `src/types/market.ts` | All TypeScript interfaces (single source of truth) |
| `src/store/fileStore.ts` | JSON file store CRUD operations |
| `src/routes/aiSummary.ts` | OpenRouter AI summary generation |
| `src/utils/formatters.ts` | Currency conversion & formatting |
| `src/data/mockMarketData.ts` | Initial mock data for all resources |
| `vitest.config.ts` | Test configuration |

## Testing

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch
```

Test coverage includes:
- **Formatters**: Currency formatting, FX conversion, round-trip conversion
- **File Store**: CRUD operations, persistence, data integrity

## Security & Best Practices

### Environment Variables
- Store all secrets in `.env` — never hardcode API keys
- `.env` is gitignored — never commit it
- Use `.env.example` to document required variables

### API Key Management
- Rotate OpenRouter API keys periodically
- Use environment-specific keys (dev/staging/production)
- Never expose API keys in client-side code

### Data Validation
- All API inputs are validated server-side before processing
- Audit variance calculations use absolute values with 5% threshold
- Pipeline health metrics are recalculated after each audit entry

### Error Handling
- Graceful fallback: if OpenRouter API is unavailable, a static executive summary is returned
- All API routes include try/catch with appropriate HTTP status codes
- Client-side error boundaries prevent cascading UI failures

### Monitoring
- Pipeline health bar shows real-time SLA metrics (coverage, freshness, accuracy, uptime)
- Source breakdown table tracks per-connector latency and success rates
- Manual audit log provides traceable human verification

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- TypeScript strict mode — no `any` types
- Prettier-compatible formatting
- Component props typed with React.FC\<Props\>
- Route handlers async with proper error handling

## License

This is a personal project. All rights reserved by the author.

## Support

For issues or questions, open an issue in this repository.
