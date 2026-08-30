'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Smartphone, 
  Globe, 
  Cpu, 
  ShieldAlert, 
  CheckCircle2, 
  RefreshCw, 
  Sliders, 
  Zap, 
  Wifi, 
  WifiOff, 
  AlertTriangle 
} from 'lucide-react';
import { CurrencyCode, ChannelMode, SandboxToggles, RailId, SettlementRail } from '../types';
import { CURRENCIES, MOCK_CORRIDORS } from '../data/mockData';
import { RailEnginePipeline } from './RailEnginePipeline';

interface LiveRoutingSandboxProps {
  onSimulate: (payload: {
    senderCurrency: CurrencyCode;
    targetCurrency: CurrencyCode;
    amount: number;
    channel: ChannelMode;
    toggles: SandboxToggles;
  }) => void;
  rails: SettlementRail[];
  activeRail: RailId;
  isSimulating: boolean;
  toggles: SandboxToggles;
  setToggles: React.Dispatch<React.SetStateAction<SandboxToggles>>;
}

export const LiveRoutingSandbox: React.FC<LiveRoutingSandboxProps> = ({
  onSimulate,
  rails,
  activeRail,
  isSimulating,
  toggles,
  setToggles,
}) => {
  const [sourceCurrency, setSourceCurrency] = useState<CurrencyCode>('SGD');
  const [targetCurrency, setTargetCurrency] = useState<CurrencyCode>('INR');
  const [amount, setAmount] = useState<number>(100);
  const [channel, setChannel] = useState<ChannelMode>('app');

  // Find FX rate
  const currentCorridor = MOCK_CORRIDORS.find(
    (c) => c.sourceCurrency === sourceCurrency && c.targetCurrency === targetCurrency
  );
  
  const exchangeRate = currentCorridor
    ? currentCorridor.exchangeRate
    : (CURRENCIES[sourceCurrency].rateToUSD / CURRENCIES[targetCurrency].rateToUSD) * 80;

  const convertedAmount = Math.round(amount * exchangeRate * 100) / 100;

  const handleSimulateClick = () => {
    onSimulate({
      senderCurrency: sourceCurrency,
      targetCurrency: targetCurrency,
      amount,
      channel,
      toggles,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT PANEL: Payment Trigger & Simulation Inputs */}
      <div className="lg:col-span-5 flex flex-col space-y-5 rounded-2xl border border-slate-700 bg-dark-800 p-5 shadow-xl">
        
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
          <div className="flex items-center space-x-2">
            <Sliders className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Payment Trigger & Sender Simulation
            </h3>
          </div>
          <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
            Sandbox v2.4
          </span>
        </div>

        {/* Currency & Amount Selection */}
        <div className="space-y-4">
          
          {/* Sender & Target Currencies */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                Sender Country & Currency
              </label>
              <select
                value={sourceCurrency}
                onChange={(e) => setSourceCurrency(e.target.value as CurrencyCode)}
                className="w-full rounded-xl border border-slate-700 bg-dark-900 px-3 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none font-mono"
              >
                {Object.values(CURRENCIES)
                  .filter((c) => ['SGD', 'USD', 'EUR', 'GBP', 'AED'].includes(c.code))
                  .map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code} ({c.name})
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                Destination Currency
              </label>
              <select
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value as CurrencyCode)}
                className="w-full rounded-xl border border-slate-700 bg-dark-900 px-3 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none font-mono"
              >
                {Object.values(CURRENCIES)
                  .filter((c) => ['INR', 'PHP', 'KES', 'MXN', 'BDT'].includes(c.code))
                  .map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code} ({c.name})
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Amount Slider & Input */}
          <div className="rounded-xl border border-slate-700/80 bg-dark-900 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Remittance Amount</span>
              <span className="font-mono text-slate-300">
                1 {sourceCurrency} = {exchangeRate.toFixed(2)} {targetCurrency}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="font-mono text-sm text-cyan-400 font-bold">
                {CURRENCIES[sourceCurrency]?.symbol}
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
                className="w-full bg-transparent font-mono text-xl font-bold text-white focus:outline-none tabular-nums"
              />
            </div>

            <input
              type="range"
              min={10}
              max={5000}
              step={10}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />

            <div className="flex items-center justify-between pt-1 font-mono text-xs border-t border-slate-800">
              <span className="text-slate-400">Recipient Receives:</span>
              <span className="text-emerald-400 font-semibold tabular-nums">
                {CURRENCIES[targetCurrency]?.symbol} {convertedAmount.toLocaleString('en-US')} {targetCurrency}
              </span>
            </div>
          </div>

          {/* Channel Selector */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-2">
              Payment Access Channel
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setChannel('app')}
                className={`flex items-center justify-center space-x-1.5 rounded-xl border p-2.5 text-xs font-medium transition-all ${
                  channel === 'app'
                    ? 'border-cyan-500 bg-cyan-950/60 text-cyan-300 shadow-sm shadow-cyan-500/20'
                    : 'border-slate-700 bg-dark-900 text-slate-400 hover:border-slate-600'
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>Mobile App</span>
              </button>

              <button
                type="button"
                onClick={() => setChannel('web')}
                className={`flex items-center justify-center space-x-1.5 rounded-xl border p-2.5 text-xs font-medium transition-all ${
                  channel === 'web'
                    ? 'border-cyan-500 bg-cyan-950/60 text-cyan-300 shadow-sm shadow-cyan-500/20'
                    : 'border-slate-700 bg-dark-900 text-slate-400 hover:border-slate-600'
                }`}
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Web Portal</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setChannel('ussd');
                  setToggles((prev) => ({ ...prev, offlineMode: true }));
                }}
                className={`flex items-center justify-center space-x-1.5 rounded-xl border p-2.5 text-xs font-medium transition-all ${
                  channel === 'ussd'
                    ? 'border-amber-500 bg-amber-950/60 text-amber-300 shadow-sm shadow-amber-500/20'
                    : 'border-slate-700 bg-dark-900 text-slate-400 hover:border-slate-600'
                }`}
              >
                <Cpu className="h-3.5 w-3.5 text-amber-400" />
                <span>USSD Mode</span>
              </button>
            </div>
          </div>

          {/* Toggleable Corridor Condition Switches */}
          <div className="rounded-xl border border-slate-700/80 bg-dark-900 p-4 space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Hybrid Corridor Condition Switches</span>
              <span className="text-[10px] text-cyan-400 font-mono">Live Chaos Injector</span>
            </h4>

            {/* Toggle A: CBDC Bridge Interoperable */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center space-x-2.5">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg border text-xs ${
                    toggles.cbdcEnabled
                      ? 'border-cyan-500 bg-cyan-950/80 text-cyan-300'
                      : 'border-slate-700 bg-slate-800 text-slate-500'
                  }`}
                >
                  <Zap className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-white">CBDC Bridge Interoperable</div>
                  <div className="text-[10px] text-slate-400">Digital SGD ↔ Digital Rupee / mBridge</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setToggles((prev) => ({ ...prev, cbdcEnabled: !prev.cbdcEnabled }))}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  toggles.cbdcEnabled ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    toggles.cbdcEnabled ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle B: Network Drop / Offline Mode */}
            <div className="flex items-center justify-between py-1 border-t border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg border text-xs ${
                    toggles.offlineMode
                      ? 'border-amber-500 bg-amber-950/80 text-amber-300'
                      : 'border-slate-700 bg-slate-800 text-slate-500'
                  }`}
                >
                  {toggles.offlineMode ? <WifiOff className="h-3.5 w-3.5" /> : <Wifi className="h-3.5 w-3.5" />}
                </div>
                <div>
                  <div className="text-xs font-medium text-white">Network Drop / Offline Mode</div>
                  <div className="text-[10px] text-slate-400">Simulate Rural Migrant TEE Local Voucher</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setToggles((prev) => ({ ...prev, offlineMode: !prev.offlineMode }))}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  toggles.offlineMode ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    toggles.offlineMode ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle C: Inject Fraud / Mule Pattern */}
            <div className="flex items-center justify-between py-1 border-t border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg border text-xs ${
                    toggles.injectFraud
                      ? 'border-rose-500 bg-rose-950/80 text-rose-300'
                      : 'border-slate-700 bg-slate-800 text-slate-500'
                  }`}
                >
                  <ShieldAlert className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-white">Inject Fraud / Mule Pattern</div>
                  <div className="text-[10px] text-slate-400">Triggers XAI Compliance AML Block</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setToggles((prev) => ({ ...prev, injectFraud: !prev.injectFraud }))}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  toggles.injectFraud ? 'bg-rose-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    toggles.injectFraud ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Action Button: Simulate Cross-Border Remittance */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSimulateClick}
          disabled={isSimulating}
          className={`relative flex w-full items-center justify-center space-x-2 rounded-xl py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all ${
            toggles.injectFraud
              ? 'bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 shadow-rose-900/40'
              : toggles.offlineMode
              ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 shadow-amber-900/40'
              : 'bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 shadow-cyan-900/40'
          }`}
        >
          {isSimulating ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin text-white" />
              <span>Routing Payload via Hybrid Engine...</span>
            </>
          ) : toggles.injectFraud ? (
            <>
              <AlertTriangle className="h-4 w-4 text-white" />
              <span>Simulate Fraudulent Remittance</span>
            </>
          ) : toggles.offlineMode ? (
            <>
              <Cpu className="h-4 w-4 text-white" />
              <span>Simulate Offline TEE Voucher Remittance</span>
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 text-white" />
              <span>Simulate Cross-Border Remittance</span>
            </>
          )}
        </motion.button>
      </div>

      {/* RIGHT PANEL: Dynamic Multi-Rail Execution Engine */}
      <div className="lg:col-span-7">
        <RailEnginePipeline
          toggles={toggles}
          activeRail={activeRail}
          isSimulating={isSimulating}
          rails={rails}
          amount={amount}
          sourceCurrency={sourceCurrency}
          targetCurrency={targetCurrency}
          convertedAmount={convertedAmount}
        />
      </div>
    </div>
  );
};
