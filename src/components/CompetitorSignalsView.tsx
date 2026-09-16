import React, { useState } from 'react';
import { 
  PricingSignal, 
  CompetitorPromo, 
  MarketId 
} from '../types/market';
import { 
  BellRing, 
  AlertTriangle, 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Send, 
  Crosshair,
  Filter,
  Sparkles,
  Tag
} from 'lucide-react';

interface CompetitorSignalsViewProps {
  signals: PricingSignal[];
  promos: CompetitorPromo[];
  onUpdateSignalStatus: (id: string, status: PricingSignal['status']) => void;
  onOpenBriefing: () => void;
  selectedMarket: MarketId;
  onMarketChange: (market: MarketId) => void;
}

export const CompetitorSignalsView: React.FC<CompetitorSignalsViewProps> = ({
  signals,
  promos,
  onUpdateSignalStatus,
  onOpenBriefing,
  selectedMarket,
  onMarketChange
}) => {
  const [activeTab, setActiveTab] = useState<'signals' | 'promos'>('signals');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const filteredSignals = signals.filter((s) => {
    const matchesMarket = selectedMarket === 'ALL' || s.market === selectedMarket;
    const matchesSeverity = severityFilter === 'ALL' || s.severity === severityFilter;
    const matchesCategory = categoryFilter === 'ALL' || s.category === categoryFilter;
    return matchesMarket && matchesSeverity && matchesCategory;
  });

  const filteredPromos = selectedMarket === 'ALL'
    ? promos
    : promos.filter(p => p.market === selectedMarket);

  const criticalSignalsCount = signals.filter(s => s.severity === 'CRITICAL' && s.status === 'NEW').length;

  return (
    <div className="space-y-6">
      {/* Header with Navigation Pills */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BellRing className="w-5 h-5 text-indigo-400" />
              <span>Competitor Surveillance & Pricing Signal Radar</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Automated detection of demand surges, price cutting, rate parity violations, and OTA marketing campaigns across HK, SG, MY, and China.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {criticalSignalsCount > 0 && (
              <div className="px-3 py-1.5 bg-rose-950/80 border border-rose-500/40 rounded-lg text-xs text-rose-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span><strong>{criticalSignalsCount} Critical</strong> Signals Active</span>
              </div>
            )}
            <button
              onClick={onOpenBriefing}
              className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>AI Strategic Briefing</span>
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('signals')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'signals'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Pricing Signals & Anomalies ({signals.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('promos')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'promos'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>Competitor Campaigns & OTA Promos ({promos.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PRICING SIGNALS */}
      {activeTab === 'signals' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Severity:
              </span>
              {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-2 py-1 rounded transition-colors ${
                    severityFilter === sev
                      ? 'bg-rose-600 text-white font-medium'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sev}
                </button>
              ))}

              <span className="text-slate-400 font-medium ml-2">Category:</span>
              {['ALL', 'DEMAND_SURGE', 'PARITY_VIOLATION', 'RATE_WAR', 'FLIGHT_CORRIDOR'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2 py-1 rounded transition-colors ${
                    categoryFilter === cat
                      ? 'bg-indigo-600 text-white font-medium'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat.replace('_', ' ')}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Market:</span>
              {(['ALL', 'HK', 'SG', 'MY', 'CN'] as MarketId[]).map((m) => (
                <button
                  key={m}
                  onClick={() => onMarketChange(m)}
                  className={`px-2 py-1 rounded transition-colors ${
                    selectedMarket === m
                      ? 'bg-slate-700 text-white font-semibold'
                      : 'bg-slate-850 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Signals Cards */}
          <div className="grid grid-cols-1 gap-3.5">
            {filteredSignals.map((sig) => {
              const isCritical = sig.severity === 'CRITICAL';
              const isHigh = sig.severity === 'HIGH';

              return (
                <div
                  key={sig.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isCritical
                      ? 'bg-gradient-to-r from-rose-950/30 via-slate-900 to-slate-900 border-rose-500/40'
                      : isHigh
                      ? 'bg-slate-900 border-amber-500/30'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          isCritical
                            ? 'bg-rose-500 text-white'
                            : isHigh
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {sig.severity}
                        </span>

                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-indigo-300 border border-slate-700">
                          {sig.category.replace('_', ' ')}
                        </span>

                        <span className="text-xs text-slate-400 font-mono">
                          [{sig.market}] {sig.propertyOrRouteName}
                        </span>

                        <span className="text-[11px] text-slate-500 flex items-center gap-1 ml-auto sm:ml-0">
                          <Clock className="w-3 h-3" />
                          {sig.detectedAt}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white mb-1">{sig.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{sig.description}</p>

                      {/* Impact & Recommended Action */}
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-950/70 p-3 rounded-lg border border-slate-850 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 font-medium uppercase block mb-0.5">
                            Estimated Impact
                          </span>
                          <span className="font-semibold text-emerald-400">{sig.impactEstimate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-indigo-300 font-medium uppercase block mb-0.5">
                            ACCOMY Recommended Action
                          </span>
                          <span className="text-slate-200">{sig.recommendedAction}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Dispatch Controls */}
                    <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Signal Confidence</span>
                        <span className="text-xs font-bold text-emerald-400">{sig.confidenceScore}%</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {sig.status === 'NEW' && (
                          <>
                            <button
                              onClick={() => onUpdateSignalStatus(sig.id, 'ACKNOWLEDGED')}
                              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-medium transition-colors"
                            >
                              Acknowledge
                            </button>
                            <button
                              onClick={() => onUpdateSignalStatus(sig.id, 'DISPATCHED')}
                              className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-semibold shadow-sm transition-colors"
                            >
                              <Send className="w-3 h-3" />
                              Dispatch
                            </button>
                          </>
                        )}
                        {sig.status === 'ACKNOWLEDGED' && (
                          <button
                            onClick={() => onUpdateSignalStatus(sig.id, 'DISPATCHED')}
                            className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-semibold"
                          >
                            <Send className="w-3 h-3" />
                            Dispatch
                          </button>
                        )}
                        {sig.status === 'DISPATCHED' && (
                          <button
                            onClick={() => onUpdateSignalStatus(sig.id, 'RESOLVED')}
                            className="flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-semibold"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            Resolved
                          </button>
                        )}
                        {sig.status === 'RESOLVED' && (
                          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Action Resolved
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredSignals.length === 0 && (
              <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 text-xs">
                No active pricing signals match your current filter parameters.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: COMPETITOR CAMPAIGNS & PROMOTIONS */}
      {activeTab === 'promos' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPromos.map((promo) => {
              const isHighThreat = promo.strategicThreat === 'HIGH';

              return (
                <div
                  key={promo.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-xs font-bold text-white">{promo.competitor}</span>
                        <span className="text-[10px] text-slate-400 block">Market: [{promo.market}]</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isHighThreat
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        Threat: {promo.strategicThreat}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-indigo-300 leading-snug mb-2">
                      {promo.promoTitle}
                    </h4>

                    <div className="space-y-1.5 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-lg border border-slate-850">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Discount:</span>
                        <strong className="text-emerald-400">{promo.discountValue}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Target Segment:</span>
                        <span className="text-right text-slate-200">{promo.targetSegment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Validity:</span>
                        <span className="text-slate-300">{promo.validPeriod}</span>
                      </div>
                    </div>

                    <div className="mt-3 bg-indigo-950/30 border border-indigo-500/20 rounded p-2 text-xs">
                      <span className="text-[10px] text-indigo-400 font-semibold uppercase block mb-0.5">
                        ACCOMY Counter-Tactic
                      </span>
                      <p className="text-[11px] text-slate-200 leading-relaxed">
                        {promo.recommendedCounterAction}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Impact Score: <strong className="text-slate-300">{promo.impactScore}/10</strong></span>
                    <span>Detected {promo.detectedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
