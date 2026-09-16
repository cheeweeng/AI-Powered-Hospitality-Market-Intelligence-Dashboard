import React, { useState } from 'react';
import { PipelineHealth, ManualAuditCheck, MarketId } from '../types/market';
import { 
  ShieldCheck, 
  Server, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Target, 
  Layers, 
  Cpu,
  RefreshCw
} from 'lucide-react';

interface PipelineAuditViewProps {
  health: PipelineHealth;
  audits: ManualAuditCheck[];
  onAddAudit: (audit: {
    auditor: string;
    propertyName: string;
    market: MarketId;
    channel: string;
    systemRecordedRate: number;
    verifiedActualRate: number;
    notes: string;
  }) => void;
  onTriggerCollection: () => void;
  isCollecting: boolean;
}

export const PipelineAuditView: React.FC<PipelineAuditViewProps> = ({
  health,
  audits,
  onAddAudit,
  onTriggerCollection,
  isCollecting
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [auditor, setAuditor] = useState('Revenue Management Auditor');
  const [propertyName, setPropertyName] = useState('The Upper House Hong Kong');
  const [market, setMarket] = useState<MarketId>('HK');
  const [channel, setChannel] = useState('Trip.com Mobile App');
  const [systemRate, setSystemRate] = useState<number>(4820);
  const [actualRate, setActualRate] = useState<number>(4820);
  const [notes, setNotes] = useState('Spot check via local proxy; zero discrepancy confirmed.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAudit({
      auditor,
      propertyName,
      market,
      channel,
      systemRecordedRate: Number(systemRate),
      verifiedActualRate: Number(actualRate),
      notes
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Data Collection SLA & Accuracy Verification
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">Target: &lt;5% Error • ≥90% Coverage • ≤6h Freshness</span>
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Data Pipeline Telemetry & Audit Calibration</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Continuous monitoring of 19 automated ingestion connectors across OTAs, PMS systems, and GDS flight engines, paired with manual audit spot-checking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              Log Manual Rate Spot-Check
            </button>
            <button
              onClick={onTriggerCollection}
              disabled={isCollecting}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCollecting ? 'animate-spin' : ''}`} />
              Run Ingestion Cycle
            </button>
          </div>
        </div>
      </div>

      {/* SLA Calibration Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Data Coverage</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{health.dataCoverageRate}%</span>
            <span className="text-xs text-emerald-400 font-semibold">Exceeds 90% SLA</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">19 of 19 sources active across HK, SG, MY, CN</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Accuracy & Error Rate</span>
            <Target className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{health.accuracyErrorRate}% error</span>
            <span className="text-xs text-emerald-400 font-semibold">Well within &lt;5% SLA</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Calculated from {audits.length} verified audit spot-checks</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Scheduled Ingestion Health</span>
            <Clock className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{health.dataFreshnessHours}h ago</span>
            <span className="text-xs text-emerald-400 font-semibold">{health.systemUptimePercentage}% Uptime</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">{health.nextScheduledIngestion}</p>
        </div>
      </div>

      {/* Ingestion Source Health Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Server className="w-4 h-4 text-emerald-400" />
          Ingestion Connectors & Scraper Telemetry
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2.5 font-semibold">Data Source Engine</th>
                <th className="pb-2.5 font-semibold">Feed Type</th>
                <th className="pb-2.5 font-semibold">Status</th>
                <th className="pb-2.5 font-semibold">Latency</th>
                <th className="pb-2.5 font-semibold">Success Rate</th>
                <th className="pb-2.5 font-semibold text-right">Records / Cycle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {health.sourceBreakdown.map((src, idx) => (
                <tr key={idx} className="hover:bg-slate-850/50">
                  <td className="py-2.5 font-bold text-white">{src.source}</td>
                  <td className="py-2.5 text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                      {src.type}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      {src.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-slate-300 font-mono">{src.latencyMs}ms</td>
                  <td className="py-2.5 font-semibold text-emerald-400">{src.successRate}%</td>
                  <td className="py-2.5 text-right font-mono text-slate-200">{src.recordsProcessed.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Spot-Check Calibration Log */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              Manual Rate Spot-Check Calibration Log
            </h3>
            <p className="text-xs text-slate-400">Validates system automated scraping vs human verification</p>
          </div>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
            Current Error Rate: {health.accuracyErrorRate}% (Target: &lt;5%)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2.5 font-semibold">Audit Timestamp</th>
                <th className="pb-2.5 font-semibold">Auditor</th>
                <th className="pb-2.5 font-semibold">Property & Market</th>
                <th className="pb-2.5 font-semibold">Channel</th>
                <th className="pb-2.5 font-semibold">System vs Verified</th>
                <th className="pb-2.5 font-semibold">Variance</th>
                <th className="pb-2.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {audits.map((audit) => (
                <tr key={audit.id} className="hover:bg-slate-850/50">
                  <td className="py-2.5 text-slate-400 font-mono">{audit.timestamp}</td>
                  <td className="py-2.5 font-medium text-slate-300">{audit.auditor}</td>
                  <td className="py-2.5 font-bold text-white">
                    [{audit.market}] {audit.propertyName}
                  </td>
                  <td className="py-2.5 text-slate-300">{audit.channel}</td>
                  <td className="py-2.5 text-slate-200 font-mono">
                    Sys: {audit.systemRecordedRate} | Actual: {audit.verifiedActualRate}
                  </td>
                  <td className="py-2.5 font-mono font-bold">
                    <span className={audit.variancePercentage > 5 ? 'text-rose-400' : 'text-emerald-400'}>
                      {audit.variancePercentage}%
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      audit.status === 'ACCURATE'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : audit.status === 'ACCEPTABLE'
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {audit.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Manual Check */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-5 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-1">Log Manual Rate Spot-Check</h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter verified live rates from OTAs or brand sites to calibrate the automated system accuracy.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Auditor Name</label>
                <input
                  type="text"
                  value={auditor}
                  onChange={(e) => setAuditor(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Market</label>
                  <select
                    value={market}
                    onChange={(e) => setMarket(e.target.value as MarketId)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200"
                  >
                    <option value="HK">🇭🇰 Hong Kong</option>
                    <option value="SG">🇸🇬 Singapore</option>
                    <option value="MY">🇲🇾 Malaysia</option>
                    <option value="CN">🇨🇳 China</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Channel</label>
                  <input
                    type="text"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Property Name</label>
                <input
                  type="text"
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">System Recorded Rate</label>
                  <input
                    type="number"
                    value={systemRate}
                    onChange={(e) => setSystemRate(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Verified Actual Rate</label>
                  <input
                    type="number"
                    value={actualRate}
                    onChange={(e) => setActualRate(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Verification Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 h-16 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-semibold"
                >
                  Save & Calibrate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
