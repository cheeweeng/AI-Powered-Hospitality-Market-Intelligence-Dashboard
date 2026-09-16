# ACCOMY Market Intelligence & Pricing Signal Monitor

An AI-enabled travel and hospitality market intelligence dashboard for ACCOMY — tracking hotel rates, occupancy, flight corridors, competitor pricing signals, and executive AI briefings across Hong Kong, Singapore, Malaysia, and Mainland China.

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

