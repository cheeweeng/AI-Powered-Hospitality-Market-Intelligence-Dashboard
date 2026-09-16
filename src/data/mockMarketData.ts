import {
  MarketSummary,
  HotelPropertyRate,
  FlightCorridor,
  CompetitorPromo,
  PricingSignal,
  PipelineHealth,
  ManualAuditCheck
} from '../types/market';

export const INITIAL_MARKETS: MarketSummary[] = [
  {
    id: 'HK',
    name: 'Hong Kong SAR',
    country: 'Hong Kong',
    flag: '🇭🇰',
    currency: 'HKD',
    fxRateToUSD: 7.78,
    averageADR: 1850,
    occupancyRate: 84.5,
    revPAR: 1563,
    adrGrowthYoY: 12.4,
    occupancyGrowthYoY: 8.2,
    monitoredPropertiesCount: 48,
    coverageRate: 95.8,
    lastUpdated: '12 mins ago',
    keyDrivers: [
      'Canton Fair spillover from Guangzhou',
      'Art Basel & Autumn Corporate summits',
      'Cross-boundary high-speed rail passenger flow +18%'
    ]
  },
  {
    id: 'SG',
    name: 'Singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    currency: 'SGD',
    fxRateToUSD: 1.34,
    averageADR: 380,
    occupancyRate: 81.2,
    revPAR: 308,
    adrGrowthYoY: 6.8,
    occupancyGrowthYoY: 4.1,
    monitoredPropertiesCount: 36,
    coverageRate: 94.2,
    lastUpdated: '25 mins ago',
    keyDrivers: [
      'Marina Bay MICE & FinTech Festival demand surge',
      'Regional leisure travel from Malaysia & Indonesia',
      'Corporate transient stays steady in Tanjong Pagar'
    ]
  },
  {
    id: 'MY',
    name: 'Malaysia (KL & Penang)',
    country: 'Malaysia',
    flag: '🇲🇾',
    currency: 'MYR',
    fxRateToUSD: 4.45,
    averageADR: 440,
    occupancyRate: 72.8,
    revPAR: 320,
    adrGrowthYoY: 9.1,
    occupancyGrowthYoY: 7.5,
    monitoredPropertiesCount: 32,
    coverageRate: 92.5,
    lastUpdated: '40 mins ago',
    keyDrivers: [
      'Visa-free tourism surge from mainland China',
      'KLCC business travel & medical tourism inbound from Indonesia',
      'Penang heritage boutique rate firmness'
    ]
  },
  {
    id: 'CN',
    name: 'China (SH / SZ / BJ / GZ)',
    country: 'China',
    flag: '🇨🇳',
    currency: 'CNY',
    fxRateToUSD: 7.23,
    averageADR: 820,
    occupancyRate: 78.4,
    revPAR: 642,
    adrGrowthYoY: 5.4,
    occupancyGrowthYoY: 6.2,
    monitoredPropertiesCount: 64,
    coverageRate: 91.8,
    lastUpdated: '18 mins ago',
    keyDrivers: [
      'Shenzhen-Hong Kong corridor daily commute surge',
      'Canton Fair preparations in Guangzhou',
      'Shanghai domestic corporate transient travel revival'
    ]
  }
];

export const INITIAL_HOTELS: HotelPropertyRate[] = [
  // --- HONG KONG (Phase 1 MVP Focus) ---
  {
    id: 'hk-01',
    name: 'The Upper House Hong Kong',
    market: 'HK',
    district: 'Central / Admiralty',
    tier: 'Luxury',
    stars: 5,
    basePriceUSD: 620,
    currentADR: 4820,
    previousADR: 4350,
    occupancyRate: 91.0,
    rateParityStatus: 'PARITY',
    channels: {
      tripCom: 4820,
      agoda: 4850,
      bookingCom: 4820,
      expedia: 4890,
      brandDirect: 4800
    },
    promotions: ['Complimentary breakfast & HK$500 dining credit', 'Stay 3 Pay 2 Autumn Executive'],
    historicalTrend: [
      { date: 'Sep 08', adr: 4350, occupancy: 82 },
      { date: 'Sep 09', adr: 4400, occupancy: 85 },
      { date: 'Sep 10', adr: 4520, occupancy: 88 },
      { date: 'Sep 11', adr: 4680, occupancy: 89 },
      { date: 'Sep 12', adr: 4790, occupancy: 90 },
      { date: 'Sep 13', adr: 4820, occupancy: 91 }
    ],
    forwardForecast: [
      { date: 'Sep 15', projectedADR: 4850, demandIndex: 88 },
      { date: 'Sep 16', projectedADR: 4920, demandIndex: 92 },
      { date: 'Sep 17', projectedADR: 5100, demandIndex: 96 },
      { date: 'Sep 18', projectedADR: 5250, demandIndex: 98 },
      { date: 'Sep 19', projectedADR: 5150, demandIndex: 94 }
    ]
  },
  {
    id: 'hk-02',
    name: 'Rosewood Hong Kong',
    market: 'HK',
    district: 'Tsim Sha Tsui Victoria Dockside',
    tier: 'Luxury',
    stars: 5,
    basePriceUSD: 710,
    currentADR: 5520,
    previousADR: 5200,
    occupancyRate: 93.5,
    rateParityStatus: 'OTA_UNDERCUT',
    disparityPercentage: 8.2,
    channels: {
      tripCom: 5060, // undercutting direct!
      agoda: 5490,
      bookingCom: 5520,
      expedia: 5550,
      meituan: 5120,
      brandDirect: 5520
    },
    promotions: ['Trip.com Mega Sale -8%', 'Asaya Wellness Package'],
    historicalTrend: [
      { date: 'Sep 08', adr: 5100, occupancy: 86 },
      { date: 'Sep 09', adr: 5200, occupancy: 88 },
      { date: 'Sep 10', adr: 5350, occupancy: 91 },
      { date: 'Sep 11', adr: 5400, occupancy: 92 },
      { date: 'Sep 12', adr: 5480, occupancy: 93 },
      { date: 'Sep 13', adr: 5520, occupancy: 93.5 }
    ],
    forwardForecast: [
      { date: 'Sep 15', projectedADR: 5600, demandIndex: 94 },
      { date: 'Sep 16', projectedADR: 5750, demandIndex: 97 },
      { date: 'Sep 17', projectedADR: 5900, demandIndex: 99 },
      { date: 'Sep 18', projectedADR: 5800, demandIndex: 95 }
    ]
  },
  {
    id: 'hk-03',
    name: 'The Murray, Hong Kong, a Niccolo Hotel',
    market: 'HK',
    district: 'Central Cotton Tree Drive',
    tier: 'Luxury',
    stars: 5,
    basePriceUSD: 390,
    currentADR: 3050,
    previousADR: 3200,
    occupancyRate: 82.0,
    rateParityStatus: 'PARITY',
    channels: {
      tripCom: 3050,
      agoda: 3080,
      bookingCom: 3050,
      expedia: 3050,
      brandDirect: 3000
    },
    promotions: ['Pet-cation Deluxe Suite Addon', 'Weekday Business Stay with Late Checkout'],
    historicalTrend: [
      { date: 'Sep 08', adr: 3250, occupancy: 78 },
      { date: 'Sep 09', adr: 3200, occupancy: 80 },
      { date: 'Sep 10', adr: 3150, occupancy: 81 },
      { date: 'Sep 11', adr: 3100, occupancy: 81 },
      { date: 'Sep 12', adr: 3080, occupancy: 82 },
      { date: 'Sep 13', adr: 3050, occupancy: 82 }
    ],
    forwardForecast: [
      { date: 'Sep 15', projectedADR: 3120, demandIndex: 83 },
      { date: 'Sep 16', projectedADR: 3200, demandIndex: 85 },
      { date: 'Sep 17', projectedADR: 3350, demandIndex: 89 }
    ]
  },
  {
    id: 'hk-04',
    name: 'Eaton HK (Jordan / Yau Ma Tei)',
    market: 'HK',
    district: 'Kowloon Central',
    tier: 'Upper Upscale',
    stars: 4,
    basePriceUSD: 160,
    currentADR: 1240,
    previousADR: 1100,
    occupancyRate: 88.0,
    rateParityStatus: 'PARITY',
    channels: {
      tripCom: 1240,
      agoda: 1240,
      bookingCom: 1260,
      expedia: 1250,
      brandDirect: 1200
    },
    promotions: ['Cultural nomad workspace pass included'],
    historicalTrend: [
      { date: 'Sep 08', adr: 1080, occupancy: 81 },
      { date: 'Sep 09', adr: 1100, occupancy: 83 },
      { date: 'Sep 10', adr: 1150, occupancy: 84 },
      { date: 'Sep 11', adr: 1190, occupancy: 86 },
      { date: 'Sep 12', adr: 1220, occupancy: 87 },
      { date: 'Sep 13', adr: 1240, occupancy: 88 }
    ],
    forwardForecast: [
      { date: 'Sep 15', projectedADR: 1280, demandIndex: 87 },
      { date: 'Sep 16', projectedADR: 1350, demandIndex: 91 },
      { date: 'Sep 17', projectedADR: 1400, demandIndex: 94 }
    ]
  },
  {
    id: 'hk-05',
    name: 'Shama Serviced Apartments Mid-Levels',
    market: 'HK',
    district: 'Mid-Levels / Central',
    tier: 'Serviced Apartments',
    stars: 4,
    basePriceUSD: 230,
    currentADR: 1790,
    previousADR: 1750,
    occupancyRate: 89.2,
    rateParityStatus: 'DIRECT_CHEAPER',
    disparityPercentage: 5.5,
    channels: {
      tripCom: 1890,
      agoda: 1880,
      bookingCom: 1890,
      expedia: 1910,
      brandDirect: 1790
    },
    promotions: ['Extended Stay 14+ nights 15% discount', 'Direct corporate booking rebate'],
    historicalTrend: [
      { date: 'Sep 08', adr: 1720, occupancy: 87 },
      { date: 'Sep 09', adr: 1750, occupancy: 88 },
      { date: 'Sep 10', adr: 1750, occupancy: 88 },
      { date: 'Sep 11', adr: 1780, occupancy: 89 },
      { date: 'Sep 12', adr: 1790, occupancy: 89 },
      { date: 'Sep 13', adr: 1790, occupancy: 89.2 }
    ],
    forwardForecast: [
      { date: 'Sep 15', projectedADR: 1800, demandIndex: 90 },
      { date: 'Sep 16', projectedADR: 1820, demandIndex: 91 },
      { date: 'Sep 17', projectedADR: 1850, demandIndex: 92 }
    ]
  },
  {
    id: 'hk-06',
    name: 'Dorsett Wanchai Hong Kong',
    market: 'HK',
    district: 'Wan Chai / Happy Valley',
    tier: 'Midscale',
    stars: 4,
    basePriceUSD: 140,
    currentADR: 1090,
    previousADR: 980,
    occupancyRate: 86.4,
    rateParityStatus: 'CRITICAL_DISPARITY',
    disparityPercentage: 14.7,
    channels: {
      tripCom: 930, // heavy undercut
      agoda: 1090,
      bookingCom: 1110,
      expedia: 1100,
      meituan: 920,
      brandDirect: 1090
    },
    promotions: ['Trip.com Flash Deal Flash 48H', 'Meituan Cross-Border Voucher'],
    historicalTrend: [
      { date: 'Sep 08', adr: 960, occupancy: 82 },
      { date: 'Sep 09', adr: 980, occupancy: 83 },
      { date: 'Sep 10', adr: 1020, occupancy: 85 },
      { date: 'Sep 11', adr: 1050, occupancy: 85 },
      { date: 'Sep 12', adr: 1080, occupancy: 86 },
      { date: 'Sep 13', adr: 1090, occupancy: 86.4 }
    ],
    forwardForecast: [
      { date: 'Sep 15', projectedADR: 1120, demandIndex: 88 },
      { date: 'Sep 16', projectedADR: 1160, demandIndex: 90 },
      { date: 'Sep 17', projectedADR: 1220, demandIndex: 93 }
    ]
  },

  // --- SINGAPORE (Phase 2 Expansion) ---
  {
    id: 'sg-01',
    name: 'Marina Bay Sands',
    market: 'SG',
    district: 'Marina Bay',
    tier: 'Luxury',
    stars: 5,
    basePriceUSD: 680,
    currentADR: 910, // SGD
    previousADR: 850,
    occupancyRate: 94.0,
    rateParityStatus: 'PARITY',
    channels: {
      tripCom: 910,
      agoda: 915,
      bookingCom: 910,
      expedia: 920,
      brandDirect: 900
    },
    promotions: ['Sands Rewards Lifestyle Tier Match', 'SkyPark Observation Deck complimentary bundle'],
    historicalTrend: [
      { date: 'Sep 08', adr: 830, occupancy: 91 },
      { date: 'Sep 09', adr: 850, occupancy: 92 },
      { date: 'Sep 10', adr: 870, occupancy: 93 },
      { date: 'Sep 11', adr: 890, occupancy: 93 },
      { date: 'Sep 12', adr: 905, occupancy: 94 },
      { date: 'Sep 13', adr: 910, occupancy: 94 }
    ],
    forwardForecast: [
      { date: 'Sep 15', projectedADR: 940, demandIndex: 96 },
      { date: 'Sep 16', projectedADR: 980, demandIndex: 98 },
      { date: 'Sep 17', projectedADR: 1050, demandIndex: 99 }
    ]
  },
  {
    id: 'sg-02',
    name: 'The Clan Hotel Singapore by Far East',
    market: 'SG',
    district: 'Telok Ayer / CBD',
    tier: 'Upper Upscale',
    stars: 5,
    basePriceUSD: 280,
    currentADR: 375, // SGD
    previousADR: 360,
    occupancyRate: 85.5,
    rateParityStatus: 'OTA_UNDERCUT',
    disparityPercentage: 6.7,
    channels: {
      tripCom: 350,
      agoda: 365,
      bookingCom: 375,
      expedia: 380,
      brandDirect: 375
    },
    promotions: ['Far East Insider 10% Member Rate'],
    historicalTrend: [
      { date: 'Sep 08', adr: 350, occupancy: 82 },
      { date: 'Sep 09', adr: 360, occupancy: 83 },
      { date: 'Sep 10', adr: 365, occupancy: 84 },
      { date: 'Sep 11', adr: 370, occupancy: 85 },
      { date: 'Sep 12', adr: 375, occupancy: 85.5 }
    ],
    forwardForecast: [
      { date: 'Sep 15', projectedADR: 385, demandIndex: 88 },
      { date: 'Sep 16', projectedADR: 395, demandIndex: 90 }
    ]
  },

  // --- MALAYSIA (Phase 2 Expansion) ---
  {
    id: 'my-01',
    name: 'EQ Kuala Lumpur',
    market: 'MY',
    district: 'Jalan Sultan Ismail / KLCC',
    tier: 'Luxury',
    stars: 5,
    basePriceUSD: 190,
    currentADR: 845, // MYR
    previousADR: 790,
    occupancyRate: 83.0,
    rateParityStatus: 'PARITY',
    channels: {
      tripCom: 845,
      agoda: 850,
      bookingCom: 845,
      expedia: 860,
      brandDirect: 830
    },
    promotions: ['Blue at EQ Sky Bar Package', 'Early Bird 21 Days 15% off'],
    historicalTrend: [
      { date: 'Sep 08', adr: 770, occupancy: 78 },
      { date: 'Sep 09', adr: 790, occupancy: 80 },
      { date: 'Sep 10', adr: 810, occupancy: 81 },
      { date: 'Sep 11', adr: 830, occupancy: 82 },
      { date: 'Sep 12', adr: 845, occupancy: 83 }
    ],
    forwardForecast: [
      { date: 'Sep 15', projectedADR: 860, demandIndex: 85 },
      { date: 'Sep 16', projectedADR: 890, demandIndex: 89 }
    ]
  },
  {
    id: 'my-02',
    name: 'Eastern & Oriental Hotel Penang',
    market: 'MY',
    district: 'George Town Heritage',
    tier: 'Luxury',
    stars: 5,
    basePriceUSD: 210,
    currentADR: 935, // MYR
    previousADR: 910,
    occupancyRate: 87.5,
    rateParityStatus: 'DIRECT_CHEAPER',
    channels: {
      tripCom: 955,
      agoda: 960,
      bookingCom: 955,
      expedia: 970,
      brandDirect: 935
    },
    promotions: ['Heritage Suite Afternoon Tea Included'],
    historicalTrend: [
      { date: 'Sep 08', adr: 890, occupancy: 84 },
      { date: 'Sep 09', adr: 910, occupancy: 85 },
      { date: 'Sep 10', adr: 920, occupancy: 86 },
      { date: 'Sep 11', adr: 930, occupancy: 87 },
      { date: 'Sep 12', adr: 935, occupancy: 87.5 }
    ],
    forwardForecast: [
      { date: 'Sep 15', projectedADR: 950, demandIndex: 89 },
      { date: 'Sep 16', projectedADR: 980, demandIndex: 92 }
    ]
  },

  // --- CHINA (Phase 2 Expansion) ---
  {
    id: 'cn-01',
    name: 'The Middle House Shanghai',
    market: 'CN',
    district: 'Jing’an / West Nanjing Road',
    tier: 'Luxury',
    stars: 5,
    basePriceUSD: 360,
    currentADR: 2600, // CNY
    previousADR: 2450,
    occupancyRate: 81.5,
    rateParityStatus: 'PARITY',
    channels: {
      tripCom: 2600,
      agoda: 2630,
      bookingCom: 2600,
      expedia: 2650,
      meituan: 2580,
      brandDirect: 2550
    },
    promotions: ['Autumn Art Walk Stay', 'Swire Hotels House Collective Perks'],
    historicalTrend: [
      { date: 'Sep 08', adr: 2400, occupancy: 78 },
      { date: 'Sep 09', adr: 2450, occupancy: 79 },
      { date: 'Sep 10', adr: 2520, occupancy: 80 },
      { date: 'Sep 11', adr: 2580, occupancy: 81 },
      { date: 'Sep 12', adr: 2600, occupancy: 81.5 }
    ],
    forwardForecast: [
      { date: 'Sep 15', projectedADR: 2650, demandIndex: 84 },
      { date: 'Sep 16', projectedADR: 2750, demandIndex: 88 }
    ]
  },
  {
    id: 'cn-02',
    name: 'Park Hyatt Shenzhen',
    market: 'CN',
    district: 'Futian CBD',
    tier: 'Luxury',
    stars: 5,
    basePriceUSD: 290,
    currentADR: 2100, // CNY
    previousADR: 1980,
    occupancyRate: 86.0,
    rateParityStatus: 'OTA_UNDERCUT',
    disparityPercentage: 9.5,
    channels: {
      tripCom: 1900,
      agoda: 2050,
      bookingCom: 2100,
      expedia: 2150,
      meituan: 1880,
      brandDirect: 2100
    },
    promotions: ['Meituan High-Speed Rail Traveler Special', 'World of Hyatt Double Points'],
    historicalTrend: [
      { date: 'Sep 08', adr: 1950, occupancy: 82 },
      { date: 'Sep 09', adr: 1980, occupancy: 83 },
      { date: 'Sep 10', adr: 2030, occupancy: 84 },
      { date: 'Sep 11', adr: 2070, occupancy: 85 },
      { date: 'Sep 12', adr: 2100, occupancy: 86 }
    ],
    forwardForecast: [
      { date: 'Sep 15', projectedADR: 2180, demandIndex: 89 },
      { date: 'Sep 16', projectedADR: 2280, demandIndex: 93 }
    ]
  }
];

export const INITIAL_FLIGHTS: FlightCorridor[] = [
  {
    id: 'fl-01',
    origin: 'HKG (Hong Kong)',
    destination: 'SIN (Singapore Changi)',
    routeCode: 'HKG-SIN',
    averageFareUSD: 310,
    fareChange7d: 14.5,
    capacityIndex: 92,
    demandSurgeLevel: 'HIGH_SURGE',
    carriers: ['Cathay Pacific', 'Singapore Airlines', 'Scoot']
  },
  {
    id: 'fl-02',
    origin: 'PVG (Shanghai Pudong)',
    destination: 'HKG (Hong Kong)',
    routeCode: 'PVG-HKG',
    averageFareUSD: 245,
    fareChange7d: 18.2,
    capacityIndex: 96,
    demandSurgeLevel: 'HIGH_SURGE',
    carriers: ['Cathay Pacific', 'China Eastern', 'Spring Airlines']
  },
  {
    id: 'fl-03',
    origin: 'KUL (Kuala Lumpur)',
    destination: 'SIN (Singapore)',
    routeCode: 'KUL-SIN',
    averageFareUSD: 85,
    fareChange7d: 4.2,
    capacityIndex: 88,
    demandSurgeLevel: 'NORMAL',
    carriers: ['AirAsia', 'Malaysia Airlines', 'Scoot', 'Batik Air']
  },
  {
    id: 'fl-04',
    origin: 'KUL (Kuala Lumpur)',
    destination: 'HKG (Hong Kong)',
    routeCode: 'KUL-HKG',
    averageFareUSD: 220,
    fareChange7d: 8.9,
    capacityIndex: 86,
    demandSurgeLevel: 'ELEVATED',
    carriers: ['Cathay Pacific', 'Malaysia Airlines', 'AirAsia X']
  },
  {
    id: 'fl-05',
    origin: 'CAN (Guangzhou)',
    destination: 'SIN (Singapore)',
    routeCode: 'CAN-SIN',
    averageFareUSD: 275,
    fareChange7d: 11.4,
    capacityIndex: 90,
    demandSurgeLevel: 'ELEVATED',
    carriers: ['China Southern', 'Singapore Airlines', 'Scoot']
  },
  {
    id: 'fl-06',
    origin: 'PEK (Beijing Capital)',
    destination: 'HKG (Hong Kong)',
    routeCode: 'PEK-HKG',
    averageFareUSD: 290,
    fareChange7d: 12.8,
    capacityIndex: 94,
    demandSurgeLevel: 'HIGH_SURGE',
    carriers: ['Air China', 'Cathay Pacific', 'Hong Kong Airlines']
  }
];

export const INITIAL_COMPETITOR_PROMOS: CompetitorPromo[] = [
  {
    id: 'promo-01',
    competitor: 'Trip.com (Ctrip Group)',
    market: 'HK',
    promoTitle: 'Hong Kong Autumn Golden Stay 12% Flash Off',
    discountType: 'FLASH_SALE',
    discountValue: '12% Instant Cashback',
    targetSegment: 'Greater Bay Area cross-boundary travelers',
    validPeriod: 'Active: Next 72 Hours',
    impactScore: 8.8,
    detectedAt: '35 mins ago',
    strategicThreat: 'HIGH',
    recommendedCounterAction: 'Enforce rate parity clause on Trip.com; inject ACCOMY bundled breakfast value-add to protect direct conversion.'
  },
  {
    id: 'promo-02',
    competitor: 'Marriott Bonvoy',
    market: 'SG',
    promoTitle: 'Unlock Singapore: Double Elite Night Credits + 2,500 Bonus Points',
    discountType: 'MEMBER_ONLY',
    discountValue: 'Bonus Points / Loyalty Multiplier',
    targetSegment: 'Regional Corporate Business Transient',
    validPeriod: 'Through end of Q4',
    impactScore: 7.4,
    detectedAt: '2 hours ago',
    strategicThreat: 'MEDIUM',
    recommendedCounterAction: 'Promote ACCOMY extended stay corporate packages with complimentary coworking & laundry credits.'
  },
  {
    id: 'promo-03',
    competitor: 'Agoda (Booking Holdings)',
    market: 'MY',
    promoTitle: 'GoLocal Malaysia Super Wednesday - Up to 25% Off',
    discountType: 'PERCENT',
    discountValue: '20-25% Closed User Group Rate',
    targetSegment: 'Domestic staycationers & Singapore weekenders',
    validPeriod: 'Weekly every Wednesday',
    impactScore: 7.9,
    detectedAt: '3 hours ago',
    strategicThreat: 'HIGH',
    recommendedCounterAction: 'Audit Agoda Private Channel rates; verify that geo-fenced rates are not leaking to international IPs.'
  },
  {
    id: 'promo-04',
    competitor: 'Meituan Hotels',
    market: 'CN',
    promoTitle: 'High-Speed Rail Travel Voucher: ¥150 Hotel Coupon for GBA Pass',
    discountType: 'PACKAGE_ADDON',
    discountValue: '¥150 Transit Subsidy',
    targetSegment: 'Shenzhen-Guangzhou weekend leisure travelers',
    validPeriod: 'Active this month',
    impactScore: 8.2,
    detectedAt: '4 hours ago',
    strategicThreat: 'HIGH',
    recommendedCounterAction: 'Partner with local mobility / transit aggregators to offer bundled seamless check-in for ACCOMY listings.'
  },
  {
    id: 'promo-05',
    competitor: 'Shangri-La Circle',
    market: 'HK',
    promoTitle: 'Stay 3 Pay 2 Island Retreat at Island Shangri-La',
    discountType: 'PACKAGE_ADDON',
    discountValue: '33% Effective Rate Reduction on Stays >= 3N',
    targetSegment: 'High-Net-Worth Leisure Stays',
    validPeriod: 'Next 14 days',
    impactScore: 7.1,
    detectedAt: '5 hours ago',
    strategicThreat: 'MEDIUM',
    recommendedCounterAction: 'Monitor Upper Upscale & Luxury competitor length-of-stay minimums; calibrate ACCOMY weekend minimum LOS.'
  }
];

export const INITIAL_SIGNALS: PricingSignal[] = [
  {
    id: 'sig-01',
    market: 'HK',
    category: 'DEMAND_SURGE',
    severity: 'CRITICAL',
    title: 'Hong Kong Sevens & Autumn Summit ADR Spike (+24.5%)',
    description: 'Central & Wan Chai luxury & serviced apartment forward rates have jumped 24.5% over the 3-week booking window. Compression index in Wan Chai has reached 94%.',
    propertyOrRouteName: 'Wan Chai & Central Hotel Cluster',
    detectedAt: '18 mins ago',
    confidenceScore: 96,
    impactEstimate: '+$140K USD projected monthly RevPAR opportunity',
    recommendedAction: 'Lift standard hurdle rates for Oct 14-22; restrict discounted OTA inventory channels to protect ADR yield.',
    status: 'NEW'
  },
  {
    id: 'sig-02',
    market: 'HK',
    category: 'PARITY_VIOLATION',
    severity: 'HIGH',
    title: 'Trip.com Undercutting Dorsett & Rosewood Direct Channels by 8-15%',
    description: 'Trip.com has initiated wholesale leakage on Hong Kong properties, displaying rates 8.2% to 14.7% below brand direct and ACCOMY contracted parities.',
    propertyOrRouteName: 'Dorsett Wanchai / Rosewood HK',
    detectedAt: '42 mins ago',
    confidenceScore: 98,
    impactEstimate: 'Estimated 18% direct booking margin degradation',
    recommendedAction: 'Trigger automated parity notification to Trip.com account manager; test rate parity test booking for audit log.',
    status: 'NEW'
  },
  {
    id: 'sig-03',
    market: 'SG',
    category: 'FLIGHT_CORRIDOR',
    severity: 'HIGH',
    title: 'PVG-HKG & HKG-SIN Flight Fare Surge (+18.2% 7-Day Velocity)',
    description: 'Direct airfares between Shanghai, Hong Kong, and Singapore Changi have accelerated sharply, signaling high inbound executive arrivals for the upcoming regional forums.',
    propertyOrRouteName: 'PVG-HKG & HKG-SIN Air Corridors',
    detectedAt: '1 hour ago',
    confidenceScore: 92,
    impactEstimate: 'Inbound demand surge index: 8.9/10',
    recommendedAction: 'Coordinate dynamic rate uplifts (+12%) for properties near airport express and central business hubs.',
    status: 'ACKNOWLEDGED'
  },
  {
    id: 'sig-04',
    market: 'MY',
    category: 'RATE_WAR',
    severity: 'MEDIUM',
    title: 'KLCC Midscale Rate War Detected (-14% ADR Compression)',
    description: 'Three competitor boutique brands in Kuala Lumpur Golden Triangle slashed base rates by 14% to capture China visa-free leisure travelers, threatening midscale ADR.',
    propertyOrRouteName: 'Bukit Bintang / KLCC Midscale CompSet',
    detectedAt: '2.5 hours ago',
    confidenceScore: 89,
    impactEstimate: 'Occupancy displacement risk: 7.5%',
    recommendedAction: 'Do not engage in price-matching race to the bottom; bundle airport transfer or breakfast instead of cutting headline rate.',
    status: 'ACKNOWLEDGED'
  },
  {
    id: 'sig-05',
    market: 'CN',
    category: 'EVENT_IMPACT',
    severity: 'HIGH',
    title: 'Shenzhen Futian Border Crossings Reach 320,000 Daily Commuters',
    description: 'High-speed rail passenger records between West Kowloon and Futian/Shenzhen North have triggered a surge in overnight stays in Shenzhen Futian hotels.',
    propertyOrRouteName: 'Park Hyatt Shenzhen & Futian Corridor',
    detectedAt: '3 hours ago',
    confidenceScore: 94,
    impactEstimate: 'Weekend occupancy surge to 92%+',
    recommendedAction: 'Launch cross-border weekend package targeting HK travelers seeking luxury staycations in Shenzhen.',
    status: 'DISPATCHED'
  }
];

export const INITIAL_PIPELINE_HEALTH: PipelineHealth = {
  dataCoverageRate: 94.8, // Success metric 1: >=90%
  dataFreshnessHours: 1.4, // Success metric 2: <=6h
  accuracyErrorRate: 2.3, // Success metric 3: <5%
  stakeholderUsabilityRating: 4.7, // Success metric 4: >=4/5
  insightQualityScore: 86.0, // Success metric 5: >=70%
  systemUptimePercentage: 98.6, // Success metric 6: >=95%
  activeSources: 18,
  totalSources: 19,
  lastIngestionTimestamp: 'Today, 06:10:00 UTC (1.4 hours ago)',
  nextScheduledIngestion: 'In 4.6 hours (Automated 6-Hour Cycle)',
  sourceBreakdown: [
    {
      source: 'Trip.com Regional Hotel Engine',
      type: 'OTA Scraper',
      status: 'HEALTHY',
      latencyMs: 380,
      successRate: 98.4,
      recordsProcessed: 1420
    },
    {
      source: 'Agoda Partner API & Metasearch',
      type: 'OTA Scraper',
      status: 'HEALTHY',
      latencyMs: 420,
      successRate: 97.2,
      recordsProcessed: 1180
    },
    {
      source: 'Booking.com Connectivity Feed',
      type: 'OTA Scraper',
      status: 'HEALTHY',
      latencyMs: 310,
      successRate: 99.1,
      recordsProcessed: 960
    },
    {
      source: 'Meituan Hotels & Lifestyle API',
      type: 'OTA Scraper',
      status: 'HEALTHY',
      latencyMs: 510,
      successRate: 93.8,
      recordsProcessed: 840
    },
    {
      source: 'Amadeus & Sabre GDS Flight Indices',
      type: 'Flight Meta',
      status: 'HEALTHY',
      latencyMs: 290,
      successRate: 99.5,
      recordsProcessed: 320
    },
    {
      source: 'Direct Brand.com Parity Crawler',
      type: 'Direct PMS',
      status: 'HEALTHY',
      latencyMs: 640,
      successRate: 95.0,
      recordsProcessed: 540
    }
  ]
};

export const INITIAL_AUDIT_CHECKS: ManualAuditCheck[] = [
  {
    id: 'aud-01',
    timestamp: '2026-09-14 05:40',
    auditor: 'Sarah Chen (Revenue Analyst)',
    propertyName: 'The Upper House Hong Kong',
    market: 'HK',
    channel: 'Trip.com vs Brand Direct',
    systemRecordedRate: 4820,
    verifiedActualRate: 4820,
    variancePercentage: 0.0,
    status: 'ACCURATE',
    notes: 'Verified via live HK IP proxy with breakfast excluded. Zero variance.'
  },
  {
    id: 'aud-02',
    timestamp: '2026-09-14 04:15',
    auditor: 'Kevin Wong (Data Engineer)',
    propertyName: 'Rosewood Hong Kong',
    market: 'HK',
    channel: 'Trip.com Mobile App',
    systemRecordedRate: 5060,
    verifiedActualRate: 5110,
    variancePercentage: 0.98,
    status: 'ACCEPTABLE',
    notes: 'Slight fluctuation due to mobile app closed-user-group coupon; well within <5% threshold.'
  },
  {
    id: 'aud-03',
    timestamp: '2026-09-13 22:30',
    auditor: 'Alicia Tan (Market Manager SG)',
    propertyName: 'Marina Bay Sands',
    market: 'SG',
    channel: 'Agoda Desktop',
    systemRecordedRate: 915,
    verifiedActualRate: 915,
    variancePercentage: 0.0,
    status: 'ACCURATE',
    notes: 'Exact match with Agoda VIP tier pricing.'
  },
  {
    id: 'aud-04',
    timestamp: '2026-09-13 18:20',
    auditor: 'Marcus Lim (MY Lead)',
    propertyName: 'EQ Kuala Lumpur',
    market: 'MY',
    channel: 'Booking.com Genius',
    systemRecordedRate: 845,
    verifiedActualRate: 850,
    variancePercentage: 0.59,
    status: 'ACCURATE',
    notes: 'Currency conversion rounding within acceptable tolerance.'
  }
];
