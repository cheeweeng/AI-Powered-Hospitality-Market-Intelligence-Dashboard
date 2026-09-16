/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { SuccessMetricsBar } from './components/SuccessMetricsBar';
import { MarketOverviewView } from './components/MarketOverviewView';
import { RateParityMonitorView } from './components/RateParityMonitorView';
import { CompetitorSignalsView } from './components/CompetitorSignalsView';
import { AISummaryView } from './components/AISummaryView';
import { PipelineAuditView } from './components/PipelineAuditView';

import {
  MarketSummary,
  HotelPropertyRate,
  FlightCorridor,
  CompetitorPromo,
  PricingSignal,
  PipelineHealth,
  ManualAuditCheck,
  ExecutiveSummaryResponse,
  MarketId
} from './types/market';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('overview');
  const [selectedMarket, setSelectedMarket] = useState<MarketId>('ALL');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

  // Core Data States
  const [markets, setMarkets] = useState<MarketSummary[]>([]);
  const [hotels, setHotels] = useState<HotelPropertyRate[]>([]);
  const [flights, setFlights] = useState<FlightCorridor[]>([]);
  const [promos, setPromos] = useState<CompetitorPromo[]>([]);
  const [signals, setSignals] = useState<PricingSignal[]>([]);
  const [pipelineHealth, setPipelineHealth] = useState<PipelineHealth | null>(null);
  const [audits, setAudits] = useState<ManualAuditCheck[]>([]);
  const [aiSummary, setAiSummary] = useState<ExecutiveSummaryResponse | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCollecting, setIsCollecting] = useState<boolean>(false);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Fetch all initial data
  const fetchData = async () => {
    try {
      const [overviewRes, hotelsRes, flightsRes, promosRes, signalsRes, auditsRes] = await Promise.all([
        fetch('/api/overview').then(r => r.json()),
        fetch('/api/hotels').then(r => r.json()),
        fetch('/api/flights').then(r => r.json()),
        fetch('/api/promos').then(r => r.json()),
        fetch('/api/signals').then(r => r.json()),
        fetch('/api/audits').then(r => r.json()),
      ]);

      setMarkets(overviewRes.markets || []);
      setPipelineHealth(overviewRes.pipelineHealth || null);
      setHotels(hotelsRes || []);
      setFlights(flightsRes || []);
      setPromos(promosRes || []);
      setSignals(signalsRes || []);
      setAudits(auditsRes || []);
    } catch (err) {
      console.error('Failed to load market data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Preload initial AI synthesis
    generateAISummary('ALL', 'Comprehensive');
  }, []);

  // Automated Ingestion Trigger handler
  const handleTriggerCollection = async () => {
    setIsCollecting(true);
    try {
      const res = await fetch('/api/pipeline/trigger-collection', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setPipelineHealth(data.pipelineHealth);
        showNotification('Ingestion completed: Ingested fresh rates across 19 OTAs and GDS feeds.');
        // Refresh hotels and signals
        const [updatedHotels, updatedSignals] = await Promise.all([
          fetch('/api/hotels').then(r => r.json()),
          fetch('/api/signals').then(r => r.json()),
        ]);
        setHotels(updatedHotels);
        setSignals(updatedSignals);
      }
    } catch (err) {
      console.error('Trigger collection error:', err);
    } finally {
      setIsCollecting(false);
    }
  };

  // Generate AI Summary handler
  const generateAISummary = async (market: MarketId = 'ALL', focusArea: string = 'Comprehensive') => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ market, focusArea })
      });
      const data = await res.json();
      setAiSummary(data);
      showNotification('Executive Briefing synthesized via OpenRouter (free models).');
    } catch (err) {
      console.error('AI summary error:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Signal action update handler
  const handleUpdateSignalStatus = async (id: string, status: PricingSignal['status']) => {
    try {
      const res = await fetch(`/api/signals/${id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setSignals(prev => prev.map(s => s.id === id ? { ...s, status } : s));
        showNotification(`Signal status updated to ${status}.`);
      }
    } catch (err) {
      console.error('Signal status update error:', err);
    }
  };

  // Add manual spot-check audit handler
  const handleAddAudit = async (auditData: any) => {
    try {
      const res = await fetch('/api/audits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auditData)
      });
      const data = await res.json();
      if (data.success) {
        setAudits(prev => [data.audit, ...prev]);
        if (pipelineHealth) {
          setPipelineHealth({
            ...pipelineHealth,
            accuracyErrorRate: data.updatedAccuracyErrorRate
          });
        }
        showNotification(`Audit logged: ${data.audit.variancePercentage}% variance. System error rate calibrated to ${data.updatedAccuracyErrorRate}%.`);
      }
    } catch (err) {
      console.error('Add audit error:', err);
    }
  };

  const criticalSignalsCount = signals.filter(s => s.severity === 'CRITICAL' && s.status === 'NEW').length;
  const parityViolationsCount = hotels.filter(h => h.rateParityStatus === 'CRITICAL_DISPARITY' || h.rateParityStatus === 'OTA_UNDERCUT').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-indigo-900/90 border border-indigo-500/50 text-white text-xs px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        selectedMarket={selectedMarket}
        onMarketChange={setSelectedMarket}
        selectedCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
        isCollecting={isCollecting}
        onTriggerCollection={handleTriggerCollection}
        criticalSignalsCount={criticalSignalsCount}
      />

      {/* Sleek SLA Telemetry Bar */}
      {pipelineHealth && (
        <SuccessMetricsBar
          health={pipelineHealth}
          totalHotels={hotels.length}
          parityViolations={parityViolationsCount}
          onOpenAudit={() => setCurrentTab('pipeline')}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-3">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400">Loading ACCOMY travel market data feeds...</p>
          </div>
        ) : (
          <>
            {currentTab === 'overview' && (
              <MarketOverviewView
                markets={markets}
                hotels={hotels}
                flights={flights}
                selectedCurrency={selectedCurrency}
                onOpenBriefing={() => {
                  setCurrentTab('ai_briefing');
                  generateAISummary('ALL', 'Regional Market Synthesis');
                }}
                onSelectMarketTab={(mId) => {
                  setSelectedMarket(mId as MarketId);
                  setCurrentTab('rates');
                }}
              />
            )}

            {currentTab === 'rates' && (
              <RateParityMonitorView
                hotels={hotels}
                selectedMarket={selectedMarket}
                onMarketChange={setSelectedMarket}
                selectedCurrency={selectedCurrency}
              />
            )}

            {currentTab === 'signals' && (
              <CompetitorSignalsView
                signals={signals}
                promos={promos}
                onUpdateSignalStatus={handleUpdateSignalStatus}
                onOpenBriefing={() => {
                  setCurrentTab('ai_briefing');
                  generateAISummary('ALL', 'Pricing Signals & Competitor Moves');
                }}
                selectedMarket={selectedMarket}
                onMarketChange={setSelectedMarket}
              />
            )}

            {currentTab === 'ai_briefing' && (
              <AISummaryView
                summary={aiSummary}
                isLoading={isAiLoading}
                onGenerate={generateAISummary}
                selectedMarket={selectedMarket}
              />
            )}

            {currentTab === 'pipeline' && pipelineHealth && (
              <PipelineAuditView
                health={pipelineHealth}
                audits={audits}
                onAddAudit={handleAddAudit}
                onTriggerCollection={handleTriggerCollection}
                isCollecting={isCollecting}
              />
            )}
          </>
        )}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span>© 2026 ACCOMY Travel & Hospitality Intelligence.</span>
            <span>•</span>
            <span className="text-slate-400">Hong Kong • Singapore • Malaysia • Mainland China</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Automated 6h Ingestion Cycle</span>
            <span>•</span>
            <span>Powered by OpenRouter</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
