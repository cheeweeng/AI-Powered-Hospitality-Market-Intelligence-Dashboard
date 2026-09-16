import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Layers, 
  Target, 
  Server, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { PipelineHealth } from '../types/market';

interface SuccessMetricsBarProps {
  health: PipelineHealth;
  totalHotels: number;
  parityViolations: number;
  onOpenAudit: () => void;
}

export const SuccessMetricsBar: React.FC<SuccessMetricsBarProps> = ({
  health,
  totalHotels,
  parityViolations,
  onOpenAudit,
}) => {
  return (
    <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs">
        {/* Left: Pipeline Status Indicator */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Automated Ingestion Pipeline Active</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">
            19 OTA & GDS Connectors across HK / SG / MY / CN
          </span>
        </div>

        {/* Right: Crisp SLA Metrics & Quick Link */}
        <div className="flex items-center gap-3 sm:gap-4 text-slate-300">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Freshness:</span>
            <strong className="text-white font-mono">{health.dataFreshnessHours}h</strong>
          </div>

          <div className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">Coverage:</span>
            <strong className="text-white font-mono">{health.dataCoverageRate}%</strong>
          </div>

          <div className="flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Accuracy:</span>
            <strong className="text-white font-mono">{health.accuracyErrorRate}% err</strong>
          </div>

          {parityViolations > 0 && (
            <div className="flex items-center gap-1 text-amber-400 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              <AlertTriangle className="w-3 h-3" />
              <span>{parityViolations} Parity Flags</span>
            </div>
          )}

          <button
            onClick={onOpenAudit}
            className="text-indigo-400 hover:text-indigo-300 text-[11px] font-semibold flex items-center gap-0.5 hover:underline transition-colors pl-1"
          >
            <span>Telemetry & Audits</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
