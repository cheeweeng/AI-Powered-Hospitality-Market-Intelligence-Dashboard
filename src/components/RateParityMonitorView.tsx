import React, { useState } from 'react';
import { 
  HotelPropertyRate, 
  MarketId, 
  PropertyTier 
} from '../types/market';
import { convertFromLocalToSelected } from '../utils/formatters';
import { 
  Building, 
  Scale, 
  AlertOctagon, 
  CheckCircle, 
  MapPin, 
  Star, 
  Info,
  ChevronRight,
  Search,
  Filter,
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

interface RateParityMonitorViewProps {
  hotels: HotelPropertyRate[];
  selectedMarket: MarketId;
  onMarketChange: (market: MarketId) => void;
  selectedCurrency: string;
}

export const RateParityMonitorView: React.FC<RateParityMonitorViewProps> = ({
  hotels,
  selectedMarket,
  onMarketChange,
  selectedCurrency,
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [parityFilter, setParityFilter] = useState<'ALL' | 'ISSUES' | 'PARITY'>('ALL');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(hotels[0]?.id || '');

  // Filter hotels by market, tier, search query, and parity status
  const filteredHotels = hotels.filter((h) => {
    const matchesMarket = selectedMarket === 'ALL' || h.market === selectedMarket;
    const matchesTier = selectedTier === 'ALL' || h.tier === selectedTier;
    const matchesSearch = 
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.district.toLowerCase().includes(searchQuery.toLowerCase());
    
    const hasDisparity = h.rateParityStatus === 'OTA_UNDERCUT' || h.rateParityStatus === 'CRITICAL_DISPARITY';
    const matchesParity = 
      parityFilter === 'ALL' ? true :
      parityFilter === 'ISSUES' ? hasDisparity :
      !hasDisparity;

    return matchesMarket && matchesTier && matchesSearch && matchesParity;
  });

  const selectedHotel = hotels.find(h => h.id === selectedPropertyId) || filteredHotels[0] || hotels[0];

  const totalDisparities = hotels.filter(h => h.rateParityStatus === 'OTA_UNDERCUT' || h.rateParityStatus === 'CRITICAL_DISPARITY').length;

  const marketNames: Record<MarketId, string> = {
    ALL: 'All Markets',
    HK: 'Hong Kong',
    SG: 'Singapore',
    MY: 'Malaysia',
    CN: 'Mainland China'
  };

  const marketCurrencyMap: Record<MarketId, string> = {
    ALL: 'USD',
    HK: 'HKD',
    SG: 'SGD',
    MY: 'MYR',
    CN: 'CNY'
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Summary Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-400" />
              <span>Hotel Rate & OTA Parity Monitor</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Active rate comparison across Trip.com, Agoda, Booking.com, Expedia, and Brand Direct to detect price undercutting and revenue leakage.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Parity Alerts:</span>
            <span className={`px-2.5 py-1 rounded-full font-semibold ${
              totalDisparities > 0
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            }`}>
              {totalDisparities} Properties Undercut
            </span>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-800/80">
          {/* Market Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs">
            {(['ALL', 'HK', 'SG', 'MY', 'CN'] as MarketId[]).map((m) => (
              <button
                key={m}
                onClick={() => onMarketChange(m)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium ${
                  selectedMarket === m
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800/70 text-slate-400 hover:text-slate-200'
                }`}
              >
                {m === 'ALL' ? 'All Markets' : m === 'HK' ? '🇭🇰 Hong Kong' : m === 'SG' ? '🇸🇬 Singapore' : m === 'MY' ? '🇲🇾 Malaysia' : '🇨🇳 China'}
              </button>
            ))}
          </div>

          {/* Parity State Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setParityFilter('ALL')}
              className={`px-2.5 py-1 rounded ${parityFilter === 'ALL' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
            >
              All ({hotels.length})
            </button>
            <button
              onClick={() => setParityFilter('ISSUES')}
              className={`px-2.5 py-1 rounded ${parityFilter === 'ISSUES' ? 'bg-amber-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Undercuts ({totalDisparities})
            </button>
            <button
              onClick={() => setParityFilter('PARITY')}
              className={`px-2.5 py-1 rounded ${parityFilter === 'PARITY' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
            >
              In Parity ({hotels.length - totalDisparities})
            </button>
          </div>
        </div>

        {/* Secondary Filter: Search & Tier */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 pt-3 border-t border-slate-800/50">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hotel name or district..."
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Tier Pills */}
          <div className="flex items-center gap-1 overflow-x-auto text-[11px]">
            {['ALL', 'Luxury', 'Upper Upscale', 'Serviced Apartments', 'Midscale'].map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                  selectedTier === tier
                    ? 'bg-slate-700 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Properties List & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Properties (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs text-slate-400 flex items-center justify-between px-1">
            <span>Showing {filteredHotels.length} of {hotels.length} properties</span>
            <span>Click any property to inspect channels</span>
          </div>

          <div className="space-y-2.5">
            {filteredHotels.map((hotel) => {
              const isSelected = selectedHotel?.id === hotel.id;
              const hasDisparity = hotel.rateParityStatus === 'OTA_UNDERCUT' || hotel.rateParityStatus === 'CRITICAL_DISPARITY';
              const localCurr = marketCurrencyMap[hotel.market] || 'USD';

              return (
                <div
                  key={hotel.id}
                  onClick={() => setSelectedPropertyId(hotel.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-850 border-indigo-500/80 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white truncate">{hotel.name}</span>
                        <span className="flex items-center text-[10px] text-amber-400 font-medium">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                          {hotel.stars}★
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {hotel.tier}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>[{hotel.market}] {hotel.district}</span>
                        <span>•</span>
                        <span>Occ: <strong className="text-slate-200">{hotel.occupancyRate}%</strong></span>
                      </div>
                    </div>

                    {/* Rate & Status Badge */}
                    <div className="text-right shrink-0">
                      <div className="text-base font-bold text-white tracking-tight">
                        {convertFromLocalToSelected(hotel.currentADR, localCurr, selectedCurrency)}
                        <span className="text-[10px] font-normal text-slate-400 ml-1">/ night</span>
                      </div>
                      
                      <div className="mt-1">
                        {hotel.rateParityStatus === 'PARITY' && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                            <CheckCircle className="w-2.5 h-2.5" /> Parity OK
                          </span>
                        )}
                        {hotel.rateParityStatus === 'OTA_UNDERCUT' && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-950/50 border border-amber-500/30 px-2 py-0.5 rounded-full">
                            <AlertOctagon className="w-2.5 h-2.5" /> OTA Undercut -{hotel.disparityPercentage}%
                          </span>
                        )}
                        {hotel.rateParityStatus === 'CRITICAL_DISPARITY' && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-400 bg-rose-950/60 border border-rose-500/40 px-2 py-0.5 rounded-full animate-pulse">
                            <AlertOctagon className="w-2.5 h-2.5" /> Leakage -{hotel.disparityPercentage}%
                          </span>
                        )}
                        {hotel.rateParityStatus === 'DIRECT_CHEAPER' && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-400 bg-cyan-950/50 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                            Direct Best Rate
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Channel Breakdown Row */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-3">
                      <span>Trip.com: <strong className={hotel.channels.tripCom < hotel.channels.brandDirect ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                        {convertFromLocalToSelected(hotel.channels.tripCom, localCurr, selectedCurrency)}
                      </strong></span>
                      <span>Agoda: <strong className="text-slate-300">{convertFromLocalToSelected(hotel.channels.agoda, localCurr, selectedCurrency)}</strong></span>
                      <span>Direct: <strong className="text-emerald-400">{convertFromLocalToSelected(hotel.channels.brandDirect, localCurr, selectedCurrency)}</strong></span>
                    </div>
                    <span className="text-indigo-400 text-xs flex items-center gap-0.5">
                      Inspect <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredHotels.length === 0 && (
              <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 text-xs">
                No properties match your current filters. Try changing your market or tier selection.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Deep Property Inspector & 14-Day Curve (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sticky top-20">
            {selectedHotel ? (
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
                      Property Channel Inspector
                    </span>
                    <span className="text-xs text-slate-400 font-medium">[{selectedHotel.market}] {selectedHotel.district}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">{selectedHotel.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-300">Base ADR:</span>
                    <span className="text-sm font-bold text-emerald-400">
                      {convertFromLocalToSelected(selectedHotel.currentADR, marketCurrencyMap[selectedHotel.market], selectedCurrency)}
                    </span>
                    <span className="text-xs text-slate-400">
                      (Previous: {convertFromLocalToSelected(selectedHotel.previousADR, marketCurrencyMap[selectedHotel.market], selectedCurrency)})
                    </span>
                  </div>
                </div>

                {/* OTA Channel Parity Audit Table */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    OTA Parity Audit & Disparity Matrix
                  </h4>
                  <div className="bg-slate-950 rounded-lg p-2.5 border border-slate-850 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-850">
                      <span className="text-slate-400 font-medium">Brand Direct (ACCOMY Standard)</span>
                      <span className="font-bold text-emerald-400">
                        {convertFromLocalToSelected(selectedHotel.channels.brandDirect, marketCurrencyMap[selectedHotel.market], selectedCurrency)}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-850">
                      <span className="text-slate-400">Trip.com (Ctrip Group)</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${selectedHotel.channels.tripCom < selectedHotel.channels.brandDirect ? 'text-rose-400' : 'text-slate-200'}`}>
                          {convertFromLocalToSelected(selectedHotel.channels.tripCom, marketCurrencyMap[selectedHotel.market], selectedCurrency)}
                        </span>
                        {selectedHotel.channels.tripCom < selectedHotel.channels.brandDirect && (
                          <span className="text-[10px] text-rose-400 bg-rose-950 px-1 rounded">Leakage</span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-850">
                      <span className="text-slate-400">Agoda (Booking Holdings)</span>
                      <span className="text-slate-200 font-medium">
                        {convertFromLocalToSelected(selectedHotel.channels.agoda, marketCurrencyMap[selectedHotel.market], selectedCurrency)}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-850">
                      <span className="text-slate-400">Booking.com</span>
                      <span className="text-slate-200 font-medium">
                        {convertFromLocalToSelected(selectedHotel.channels.bookingCom, marketCurrencyMap[selectedHotel.market], selectedCurrency)}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Expedia</span>
                      <span className="text-slate-200 font-medium">
                        {convertFromLocalToSelected(selectedHotel.channels.expedia, marketCurrencyMap[selectedHotel.market], selectedCurrency)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Active Promotions Detected */}
                {selectedHotel.promotions && selectedHotel.promotions.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Detected Rate Promotions
                    </h4>
                    <div className="space-y-1">
                      {selectedHotel.promotions.map((promo, idx) => (
                        <div key={idx} className="bg-slate-800/60 text-indigo-300 text-xs p-2 rounded border border-indigo-500/20 flex items-start gap-1.5">
                          <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{promo}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Forward Forecast Rate Curve (Recharts) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Forward Projected Rate Curve
                    </h4>
                    <span className="text-[10px] text-slate-400">14-Day Horizon</span>
                  </div>
                  <div className="h-44 w-full bg-slate-950/60 rounded-lg p-2 border border-slate-800">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={selectedHotel.forwardForecast}>
                        <defs>
                          <linearGradient id="rateGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} domain={['auto', 'auto']} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                          formatter={(val: any) => [`${val} ${marketCurrencyMap[selectedHotel.market]}`, 'Projected ADR']}
                        />
                        <Area type="monotone" dataKey="projectedADR" stroke="#818cf8" strokeWidth={2} fillOpacity={1} fill="url(#rateGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Confidence: <strong className="text-emerald-400">97.2%</strong></span>
                  <span>Target: ACCOMY Yield Optimization</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs">
                Select a hotel from the list to view channel breakdown and rate forecast.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
