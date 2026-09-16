import React, { useState } from 'react';
import { 
  MarketSummary, 
  FlightCorridor, 
  HotelPropertyRate 
} from '../types/market';
import { convertFromLocalToSelected, formatCurrency } from '../utils/formatters';
import { 
  Globe2, 
  Plane, 
  TrendingUp, 
  ArrowUpRight, 
  Sparkles,
  BarChart3,
  Calendar,
  Building,
  CheckCircle2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';

interface MarketOverviewViewProps {
  markets: MarketSummary[];
  hotels: HotelPropertyRate[];
  flights: FlightCorridor[];
  selectedCurrency: string;
  onOpenBriefing: () => void;
  onSelectMarketTab: (marketId: string) => void;
}

export const MarketOverviewView: React.FC<MarketOverviewViewProps> = ({
  markets,
  hotels,
  flights,
  selectedCurrency,
  onOpenBriefing,
  onSelectMarketTab,
}) => {
  const [flightFilter, setFlightFilter] = useState<'ALL' | 'SURGE'>('ALL');

  // Chart data: Normalized comparison across HK, SG, MY, CN
  const benchmarkData = markets.map(m => ({
    name: m.name,
    flag: m.flag,
    adr: convertFromLocalToSelected(m.averageADR, m.currency, selectedCurrency),
    revpar: convertFromLocalToSelected(m.revPAR, m.currency, selectedCurrency),
    occupancy: m.occupancyRate,
    currency: selectedCurrency,
  }));

  const displayFlights = flightFilter === 'SURGE'
    ? flights.filter(f => f.demandSurgeLevel === 'HIGH_SURGE')
    : flights;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-indigo-400" />
            <span>Regional Travel Market Overview</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Live surveillance of hotel rates, occupancy dynamics, and incoming flight demand across Hong Kong, Singapore, Malaysia, and Mainland China.
          </p>
        </div>

        <button
          onClick={onOpenBriefing}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all self-start sm:self-auto shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>AI Executive Briefing</span>
        </button>
      </div>

      {/* 4 Core Market Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {markets.map((m) => {
          const propertyCount = hotels.filter(h => h.market === m.id).length;

          return (
            <div
              key={m.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{m.flag}</span>
                    <div>
                      <h3 className="text-sm font-bold text-white">{m.name}</h3>
                      <span className="text-[10px] text-slate-400">{m.country}</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {m.currency}
                  </span>
                </div>

                {/* Primary Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-800/80">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-medium">Average ADR</span>
                    <div className="text-base font-bold text-white mt-0.5">
                      {convertFromLocalToSelected(m.averageADR, m.currency, selectedCurrency)}
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5 mt-0.5">
                      <ArrowUpRight className="w-3 h-3" /> +{m.adrGrowthYoY}% YoY
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-medium">Occupancy</span>
                    <div className="text-base font-bold text-white mt-0.5">
                      {m.occupancyRate}%
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5 mt-0.5">
                      <ArrowUpRight className="w-3 h-3" /> +{m.occupancyGrowthYoY}% YoY
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span>RevPAR: <strong className="text-slate-200">{convertFromLocalToSelected(m.revPAR, m.currency, selectedCurrency)}</strong></span>
                  <span>Coverage: <strong className="text-emerald-400">{m.coverageRate}%</strong></span>
                </div>

                {/* Catalyst */}
                <div className="mt-3 bg-slate-950/60 p-2.5 rounded-lg border border-slate-850">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">Key Market Driver</span>
                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                    {m.keyDrivers[0]}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>{propertyCount} Tracked Properties</span>
                <span className="text-slate-400">{m.lastUpdated}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Analytics & Flight Leading Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Regional Benchmark Chart (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-indigo-400" />
                  <span>Cross-Regional Benchmark: ADR vs. RevPAR</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Standardized in {selectedCurrency} for direct regional yield comparison
                </p>
              </div>
            </div>

            <div className="h-64 w-full bg-slate-950/50 rounded-lg p-2 border border-slate-800/80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={benchmarkData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                    formatter={(val: any) => [`${val} ${selectedCurrency}`, '']}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar dataKey="adr" name={`Avg ADR (${selectedCurrency})`} fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="revpar" name={`RevPAR (${selectedCurrency})`} fill="#38bdf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Market Leader by ADR: <strong className="text-white">Singapore ($295 USD equiv.)</strong></span>
            <span>Fastest YoY Growth: <strong className="text-emerald-400">Hong Kong (+12.4%)</strong></span>
          </div>
        </div>

        {/* Right: Air Travel Corridors (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Plane className="w-4 h-4 text-cyan-400" />
                  <span>Air Travel Corridors & Forward Demand</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Leading air pricing indicator for incoming accommodation booking surges
                </p>
              </div>

              <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded text-[11px]">
                <button
                  onClick={() => setFlightFilter('ALL')}
                  className={`px-2 py-0.5 rounded ${flightFilter === 'ALL' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFlightFilter('SURGE')}
                  className={`px-2 py-0.5 rounded ${flightFilter === 'SURGE' ? 'bg-rose-600 text-white font-medium' : 'text-slate-400'}`}
                >
                  Surges
                </button>
              </div>
            </div>

            <div className="space-y-2.5 max-h-[270px] overflow-y-auto pr-1">
              {displayFlights.map((route) => {
                const isHighSurge = route.demandSurgeLevel === 'HIGH_SURGE';

                return (
                  <div
                    key={route.id}
                    className={`p-3 rounded-lg border text-xs transition-all ${
                      isHighSurge
                        ? 'bg-rose-950/20 border-rose-500/30'
                        : 'bg-slate-950/60 border-slate-850'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{route.routeCode}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        isHighSurge
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {isHighSurge ? '🔥 High Demand Surge' : '⚡ Elevated Velocity'}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 mt-1">
                      {route.origin} → {route.destination}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-[11px]">
                      <div>
                        <span className="text-slate-400">Avg Fare: </span>
                        <strong className="text-white">{formatCurrency(route.averageFareUSD, selectedCurrency)}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">7d Delta: </span>
                        <strong className={route.fareChange7d > 10 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                          +{route.fareChange7d}%
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Cap: </span>
                        <strong className="text-cyan-400">{route.capacityIndex}%</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 flex justify-between">
            <span>Feeds from GDS & Amadeus</span>
            <span>Leading index: 14-day booking horizon</span>
          </div>
        </div>
      </div>
    </div>
  );
};
