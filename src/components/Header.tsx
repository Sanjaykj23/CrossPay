'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Zap, Cpu, Layers, BarChart3, Activity, Globe, ArrowRightLeft, Radio } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  txCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, txCount }) => {
  // Live ticking settlement counter
  const [netSettlement, setNetSettlement] = useState(4218940);

  useEffect(() => {
    const interval = setInterval(() => {
      setNetSettlement((prev) => prev + Math.floor(Math.random() * 180) + 20);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-dark-900/90 backdrop-blur-md">
      {/* Top Banner / Brand & Metrics */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-4 border-b border-slate-800">
          
          {/* Brand Logo & Mesh Status */}
          <div className="flex items-center space-x-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-dark-900">
                <ArrowRightLeft className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold tracking-tight text-white">CrossPay</h1>
                <span className="rounded border border-cyan-500/30 bg-cyan-950/60 px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider text-cyan-400 uppercase">
                  Enterprise Console
                </span>
              </div>
              <p className="text-xs text-slate-400">Hybrid B2B Protocol for Inclusive Global Remittances</p>
            </div>

            {/* Live Mesh Status Pill */}
            <div className="hidden lg:flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="font-mono text-emerald-400 text-[11px] font-medium">
                Global Mesh Active: 3 Settlement Rails Online
              </span>
            </div>
          </div>

          {/* Key Live Metrics Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-xs">
            <div className="flex items-center space-x-2 rounded-lg border border-slate-700/60 bg-dark-800 px-3 py-1.5">
              <Activity className="h-3.5 w-3.5 text-cyan-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Avg Latency</span>
                <span className="font-semibold text-cyan-300 tabular-nums">38ms</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 rounded-lg border border-slate-700/60 bg-dark-800 px-3 py-1.5">
              <Globe className="h-3.5 w-3.5 text-emerald-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Net Settlement</span>
                <span className="font-semibold text-emerald-300 tabular-nums">
                  ${netSettlement.toLocaleString('en-US')} USD
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center space-x-2 rounded-lg border border-slate-700/60 bg-dark-800 px-3 py-1.5">
              <Radio className="h-3.5 w-3.5 text-amber-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Corridors</span>
                <span className="font-semibold text-amber-300 text-[11px]">
                  SGD ↔ INR | USD ↔ PHP | EUR ↔ KES
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Console Nav Tabs */}
        <div className="flex overflow-x-auto space-x-1 py-2 no-scrollbar">
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'sandbox'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800/60'
            }`}
          >
            <Zap className="h-4 w-4 text-cyan-400" />
            <span>Live Routing Sandbox</span>
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'compliance'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800/60'
            }`}
          >
            <Shield className="h-4 w-4 text-emerald-400" />
            <span>XAI Compliance & AML Stream</span>
            {txCount > 0 && (
              <span className="ml-1.5 rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-mono text-emerald-300">
                {txCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('ussd')}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'ussd'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800/60'
            }`}
          >
            <Cpu className="h-4 w-4 text-amber-400" />
            <span>Offline USSD / Feature Phone TEE</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'bg-violet-950/80 text-violet-300 border border-violet-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800/60'
            }`}
          >
            <Layers className="h-4 w-4 text-violet-400" />
            <span>Protocol Architecture & Mesh</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800/60'
            }`}
          >
            <BarChart3 className="h-4 w-4 text-indigo-400" />
            <span>Analytics & Fee Savings Matrix</span>
          </button>
        </div>
      </div>
    </header>
  );
};
