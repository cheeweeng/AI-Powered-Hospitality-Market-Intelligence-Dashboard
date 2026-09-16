import React from 'react';
import { 
  Building2, 
  Sparkles, 
  LayoutDashboard, 
  Scale, 
  BellRing, 
  RefreshCw,
  ShieldCheck,
  Globe2
} from 'lucide-react';
import { MarketId } from '../types/market';

export type NavTab = 'overview' | 'rates' | 'signals' | 'ai_briefing' | 'pipeline';

interface NavbarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  selectedMarket: MarketId;
  onMarketChange: (market: MarketId) => void;
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  isCollecting: boolean;
  onTriggerCollection: () => void;
  criticalSignalsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  selectedMarket,
  onMarketChange,
  selectedCurrency,
  onCurrencyChange,
  isCollecting,
  onTriggerCollection,
  criticalSignalsCount
}) => {
  const tabs = [
    { id: 'overview' as NavTab, label: 'Market Overview', icon: LayoutDashboard },
    { id: 'rates' as NavTab, label: 'Rate & Parity Monitor', icon: Scale },
    { 
      id: 'signals' as NavTab, 
      label: 'Competitor & Signals', 
      icon: BellRing, 
      badge: criticalSignalsCount > 0 ? criticalSignalsCount : undefined 
    },
    { id: 'ai_briefing' as NavTab, label: 'AI Executive Briefing', icon: Sparkles },
    { id: 'pipeline' as NavTab, label: 'Data Pipeline & Audit', icon: ShieldCheck },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 p-0.5 shadow-md shadow-indigo-500/10 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                <Building2 className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">ACCOMY</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                  Market Intel
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden lg:block">
                Hong Kong • Singapore • Malaysia • China
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/20 text-white border border-indigo-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="px-1.5 py-0.2 bg-rose-500 text-white rounded-full text-[10px] font-bold">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Global Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Market Filter */}
            <div className="hidden sm:flex items-center bg-slate-800/80 border border-slate-700/80 rounded-lg p-0.5 text-xs font-medium">
              {(['ALL', 'HK', 'SG', 'MY', 'CN'] as MarketId[]).map((m) => (
                <button
                  key={m}
                  onClick={() => onMarketChange(m)}
                  className={`px-2 py-1 rounded transition-colors ${
                    selectedMarket === m
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {m === 'ALL' ? 'All' : m}
                </button>
              ))}
            </div>

            {/* Currency Selector */}
            <select
              value={selectedCurrency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
            >
              <option value="USD">USD ($)</option>
              <option value="HKD">HKD ($)</option>
              <option value="SGD">SGD (S$)</option>
              <option value="MYR">MYR (RM)</option>
              <option value="CNY">CNY (¥)</option>
            </select>

            {/* Automated Collection Trigger */}
            <button
              onClick={onTriggerCollection}
              disabled={isCollecting}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all disabled:opacity-50"
              title="Trigger continuous automated collection cycle across 19 feeds"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCollecting ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isCollecting ? 'Collecting...' : 'Run Ingestion'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation */}
        <div className="flex md:hidden items-center space-x-1 py-2 overflow-x-auto scrollbar-none border-t border-slate-800/60">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1 py-0.2 bg-rose-500 text-white rounded-full text-[10px] font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
