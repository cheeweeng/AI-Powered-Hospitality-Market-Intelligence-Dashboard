export type MarketId = 'HK' | 'SG' | 'MY' | 'CN' | 'ALL';

export type PropertyTier = 'Luxury' | 'Upper Upscale' | 'Midscale' | 'Budget' | 'Serviced Apartments';

export type SignalSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';

export type SignalCategory = 'DEMAND_SURGE' | 'RATE_WAR' | 'PARITY_VIOLATION' | 'EVENT_IMPACT' | 'FLIGHT_CORRIDOR';

export interface MarketSummary {
  id: MarketId;
  name: string;
  country: string;
  flag: string;
  currency: string;
  fxRateToUSD: number;
  averageADR: number; // in local currency
  occupancyRate: number; // percentage 0-100
  revPAR: number; // in local currency
  adrGrowthYoY: number;
  occupancyGrowthYoY: number;
  monitoredPropertiesCount: number;
  coverageRate: number; // e.g. 94.5%
  lastUpdated: string;
  keyDrivers: string[];
}

export interface HotelPropertyRate {
  id: string;
  name: string;
  market: MarketId;
  district: string;
  tier: PropertyTier;
  stars: number;
  basePriceUSD: number;
  currentADR: number; // in local currency
  previousADR: number;
  occupancyRate: number;
  rateParityStatus: 'PARITY' | 'OTA_UNDERCUT' | 'DIRECT_CHEAPER' | 'CRITICAL_DISPARITY';
  disparityPercentage?: number;
  channels: {
    tripCom: number;
    agoda: number;
    bookingCom: number;
    expedia: number;
    meituan?: number;
    brandDirect: number;
  };
  promotions: string[];
  historicalTrend: { date: string; adr: number; occupancy: number }[];
  forwardForecast: { date: string; projectedADR: number; demandIndex: number }[];
}

export interface FlightCorridor {
  id: string;
  origin: string;
  destination: string;
  routeCode: string;
  averageFareUSD: number;
  fareChange7d: number; // percentage
  capacityIndex: number; // 0-100
  demandSurgeLevel: 'NORMAL' | 'ELEVATED' | 'HIGH_SURGE';
  carriers: string[];
}

export interface CompetitorPromo {
  id: string;
  competitor: string; // e.g. "Trip.com", "Marriott Bonvoy", "Shangri-La Circle"
  market: MarketId;
  promoTitle: string;
  discountType: 'PERCENT' | 'FLASH_SALE' | 'MEMBER_ONLY' | 'PACKAGE_ADDON';
  discountValue: string;
  targetSegment: string;
  validPeriod: string;
  impactScore: number; // 1-10
  detectedAt: string;
  strategicThreat: 'HIGH' | 'MEDIUM' | 'LOW';
  recommendedCounterAction: string;
}

export interface PricingSignal {
  id: string;
  market: MarketId;
  category: SignalCategory;
  severity: SignalSeverity;
  title: string;
  description: string;
  propertyOrRouteName: string;
  detectedAt: string;
  confidenceScore: number; // percentage e.g. 92%
  impactEstimate: string;
  recommendedAction: string;
  status: 'NEW' | 'ACKNOWLEDGED' | 'DISPATCHED' | 'RESOLVED';
}

export interface PipelineHealth {
  dataCoverageRate: number; // e.g. 94.2% (Target: >=90%)
  dataFreshnessHours: number; // e.g. 1.8h (Target: <=6h)
  accuracyErrorRate: number; // e.g. 2.6% (Target: <5%)
  stakeholderUsabilityRating: number; // e.g. 4.6 (Target: >=4/5)
  insightQualityScore: number; // e.g. 88% (Target: >=70%)
  systemUptimePercentage: number; // e.g. 98.4% (Target: >=95%)
  activeSources: number;
  totalSources: number;
  lastIngestionTimestamp: string;
  nextScheduledIngestion: string;
  sourceBreakdown: {
    source: string;
    type: 'OTA Scraper' | 'GDS API' | 'Direct PMS' | 'Flight Meta';
    status: 'HEALTHY' | 'DEGRADED' | 'IDLE';
    latencyMs: number;
    successRate: number;
    recordsProcessed: number;
  }[];
}

export interface ExecutiveSummaryResponse {
  summaryTitle: string;
  generatedAt: string;
  modelUsed: string;
  executiveTakeaway: string;
  marketHighlights: {
    market: string;
    keyObservation: string;
    rateDynamics: string;
    strategicSignal: string;
  }[];
  pricingSignals: {
    signal: string;
    urgency: 'IMMEDIATE' | 'WATCHLIST' | 'ROUTINE';
    actionForACCOMY: string;
  }[];
  competitiveIntelligence: string;
  recommendedRateStrategy: {
    segment: string;
    recommendation: string;
    expectedRevParImpact: string;
  }[];
}

export interface ManualAuditCheck {
  id: string;
  timestamp: string;
  auditor: string;
  propertyName: string;
  market: MarketId;
  channel: string;
  systemRecordedRate: number;
  verifiedActualRate: number;
  variancePercentage: number;
  status: 'ACCURATE' | 'ACCEPTABLE' | 'DISCREPANCY_FLAGGED';
  notes: string;
}
