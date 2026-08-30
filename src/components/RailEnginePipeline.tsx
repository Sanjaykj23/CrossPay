'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cpu, Zap, Radio, AlertTriangle, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { SandboxToggles, RailId, SettlementRail } from '../types';

interface RailEnginePipelineProps {
  toggles: SandboxToggles;
  activeRail: RailId;
  isSimulating: boolean;
  rails: SettlementRail[];
  amount: number;
  sourceCurrency: string;
  targetCurrency: string;
  convertedAmount: number;
}

export const RailEnginePipeline: React.FC<RailEnginePipelineProps> = ({
  toggles,
  activeRail,
  isSimulating,
  rails,
  amount,
  sourceCurrency,
  targetCurrency,
  convertedAmount,
}) => {
  return (
    <div className="relative flex flex-col h-full rounded-2xl border border-slate-700 bg-dark-800 p-5 shadow-xl overflow-hidden">
      {/* Background Subtle Radar Grid */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      {/* Engine Header */}
      <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-700/80">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <Zap className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Dynamic Multi-Rail Execution Engine
            </h3>
            <p className="text-[11px] text-slate-400">
              Autonomous path optimization with atomic settlement guarantees
            </p>
          </div>
        </div>

        {/* Selected Highway Badge */}
        <div className="flex items-center space-x-2">
          {toggles.offlineMode ? (
            <span className="inline-flex items-center space-x-1 rounded-full border border-amber-500/40 bg-amber-950/60 px-2.5 py-1 text-[11px] font-mono text-amber-300">
              <Cpu className="h-3 w-3" />
              <span>Offline TEE Queue</span>
            </span>
          ) : toggles.injectFraud ? (
            <span className="inline-flex items-center space-x-1 rounded-full border border-rose-500/40 bg-rose-950/60 px-2.5 py-1 text-[11px] font-mono text-rose-300 animate-pulse">
              <AlertTriangle className="h-3 w-3 text-rose-400" />
              <span>AML Pipeline Blocked</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-2.5 py-1 text-[11px] font-mono text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>
                {activeRail === 'rail_cbdc'
                  ? 'Rail 1: CBDC Bridge Active'
                  : activeRail === 'rail_l2'
                  ? 'Rail 2: L2 State Channel'
                  : 'Rail 3: Legacy Fallback'}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* SVG Pipeline Visualization Canvas */}
      <div className="relative z-10 my-4 flex-1 flex flex-col justify-between py-2">
        
        {/* Node Labels: Sender -> Router -> Rails -> Recipient */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2 px-1">
          <div className="flex items-center space-x-1 text-slate-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            <span>ORIGIN NODE</span>
          </div>
          <div className="flex items-center space-x-1 text-cyan-400 font-semibold">
            <Radio className="h-3 w-3 animate-spin" />
            <span>CROSSPAY AI MESH ROUTER</span>
          </div>
          <div className="flex items-center space-x-1 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>TARGET NODE</span>
          </div>
        </div>

        {/* Visual Highway Container */}
        <div className="space-y-3 relative">
          
          {/* Animated SVG Connections */}
          <div className="absolute inset-0 pointer-events-none hidden sm:block">
            <svg className="w-full h-full" overflow="visible">
              <defs>
                <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Render the 3 Rails */}
          {rails.map((rail) => {
            const isSelected = activeRail === rail.id && !toggles.injectFraud && !toggles.offlineMode;
            const isBlocked = toggles.injectFraud;
            const isOfflineQueued = toggles.offlineMode && rail.id === 'rail_l2';

            let borderClass = 'border-slate-700/70 bg-dark-900/60';
            let badgeColor = 'bg-slate-800 text-slate-400 border-slate-700';

            if (isSelected) {
              borderClass = 'border-cyan-500/80 bg-cyan-950/20 shadow-lg shadow-cyan-500/10';
              badgeColor = 'bg-cyan-950 border-cyan-500/50 text-cyan-300';
            } else if (isBlocked) {
              borderClass = 'border-rose-900/40 bg-rose-950/10 opacity-60';
              badgeColor = 'bg-rose-950 border-rose-800 text-rose-400';
            } else if (isOfflineQueued) {
              borderClass = 'border-amber-500/60 bg-amber-950/20 shadow-md shadow-amber-500/10';
              badgeColor = 'bg-amber-950 border-amber-500/50 text-amber-300';
            }

            return (
              <motion.div
                key={rail.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative rounded-xl border p-3.5 transition-all duration-300 ${borderClass}`}
              >
                {/* Active Packet Laser Pulse Effect */}
                {isSelected && isSimulating && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-emerald-500/20 to-transparent pointer-events-none"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  />
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  {/* Left Rail Metadata */}
                  <div className="flex items-start space-x-3">
                    <div
                      className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg border font-mono font-bold text-xs ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                          : isBlocked
                          ? 'border-rose-700 bg-rose-900/30 text-rose-400'
                          : isOfflineQueued
                          ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                          : 'border-slate-700 bg-dark-800 text-slate-500'
                      }`}
                    >
                      {rail.type === 'CBDC' ? 'C1' : rail.type === 'L2_STABLECOIN' ? 'L2' : 'L3'}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-xs text-white">{rail.name}</span>
                        <span
                          className={`rounded border px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider ${badgeColor}`}
                        >
                          {rail.protocolBadge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{rail.subTitle}</p>
                    </div>
                  </div>

                  {/* Right Rail Performance Stats */}
                  <div className="flex items-center justify-between sm:justify-end space-x-4 font-mono text-xs text-slate-300 border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 block uppercase">Protocol Fee</span>
                      <span
                        className={`font-semibold ${
                          isSelected ? 'text-emerald-400' : 'text-slate-300'
                        }`}
                      >
                        {rail.feePercentage}% (${((amount * rail.feePercentage) / 100).toFixed(2)})
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 block uppercase">Settlement</span>
                      <span
                        className={`font-semibold ${
                          isSelected ? 'text-cyan-400' : 'text-slate-300'
                        }`}
                      >
                        {rail.latencyMs < 1000
                          ? `${rail.latencyMs}ms`
                          : `${(rail.latencyMs / 1000).toFixed(1)}s`}
                      </span>
                    </div>

                    {/* Status Pill */}
                    <div>
                      {isSelected ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                      ) : isBlocked ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40">
                          <AlertTriangle className="h-4 w-4" />
                        </span>
                      ) : isOfflineQueued ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
                          <Lock className="h-4 w-4" />
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 uppercase">Standby</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Simulation Payload Pulse Bar */}
        <AnimatePresence>
          {isSimulating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-3 rounded-xl border border-cyan-500/40 bg-cyan-950/40 p-3 text-xs"
            >
              <div className="flex items-center justify-between font-mono">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500" />
                  </span>
                  <span className="text-cyan-300 font-medium">
                    Streaming Payload: {amount} {sourceCurrency} → {convertedAmount.toLocaleString('en-US')} {targetCurrency}
                  </span>
                </div>
                <span className="text-[10px] text-cyan-400/80">Executing Atomic State Transfer...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Protocol Guarantee */}
      <div className="relative z-10 pt-3 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Zero-Knowledge Balance Proofs Enforced</span>
        </div>
        <div className="flex items-center space-x-1 font-mono text-slate-500">
          <span>Non-Custodial Multi-Sig</span>
        </div>
      </div>
    </div>
  );
};
