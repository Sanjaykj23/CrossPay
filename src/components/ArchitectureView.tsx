'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Cpu, ArrowRight, Zap, Database, Lock, Globe, Server, CheckCircle2 } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="rounded-2xl border border-slate-700 bg-dark-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-950 border border-violet-500/40 text-violet-400">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">CrossPay Protocol Architecture & Settlement Mesh</h2>
            <p className="text-xs text-slate-400">
              Hybrid multi-rail topology bridging CBDCs, Layer 2 state channels, and legacy banking gateways
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          <div className="rounded-xl border border-slate-700/80 bg-dark-900 p-4 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-xs">
              <Zap className="h-4 w-4" />
              <span>1. CBDC Gateway Layer</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Direct API interop with central bank programmable ledgers (mBridge, MAS Project Orchid, RBI e-Rupee).
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/80 bg-dark-900 p-4 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs">
              <ShieldCheck className="h-4 w-4" />
              <span>2. ZK Identity & AML Node</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Zero-Knowledge Proofs for OFAC/sanctions compliance while preserving strict enterprise balance privacy.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/80 bg-dark-900 p-4 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-semibold text-xs">
              <Cpu className="h-4 w-4" />
              <span>3. Offline TEE Vaults</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Hardware SIM/Secure Enclave vouchers enabling non-internet remittances in remote rural areas.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/80 bg-dark-900 p-4 space-y-2">
            <div className="flex items-center space-x-2 text-violet-400 font-semibold text-xs">
              <Database className="h-4 w-4" />
              <span>4. Liquidity Mesh Pool</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Autonomous market-making liquidity pools eliminating pre-funding friction (NOSTRO/VOSTRO replacement).
            </p>
          </div>
        </div>
      </div>

      {/* Protocol Layer Topology Visual Graph */}
      <div className="rounded-2xl border border-slate-700 bg-dark-800 p-6 shadow-xl space-y-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between border-b border-slate-700 pb-3">
          <span>End-to-End Remittance Lifecycle Topology</span>
          <span className="font-mono text-xs text-cyan-400">Atomic Cross-Chain Swap (38ms)</span>
        </h3>

        {/* Dynamic Topology Stack Diagram */}
        <div className="space-y-4">
          
          {/* Layer 4: Application & Ingress */}
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-cyan-300 font-bold">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-cyan-400" />
                <span>APPLICATION INGRESS LAYER</span>
              </div>
              <span className="text-[10px] bg-cyan-900/60 px-2 py-0.5 rounded text-cyan-200">
                REST / gRPC / USSD SMS / Mobile SDK
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-slate-300 font-mono">
              <div className="bg-dark-900 p-2 rounded border border-slate-800 text-center">Corporate Treasury API</div>
              <div className="bg-dark-900 p-2 rounded border border-slate-800 text-center">Neobank Mobile App</div>
              <div className="bg-dark-900 p-2 rounded border border-slate-800 text-center">Feature Phone SIM TEE</div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-5 w-5 text-slate-500 rotate-90" />
          </div>

          {/* Layer 3: Risk & AML Engine */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-emerald-300 font-bold">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>EXPLAINABLE AI (XAI) AML & SANCTIONS ENGINE</span>
              </div>
              <span className="text-[10px] bg-emerald-900/60 px-2 py-0.5 rounded text-emerald-200">
                Sub-50ms Risk Verification
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-slate-300 font-mono">
              <div className="bg-dark-900 p-2 rounded border border-slate-800 text-center">Mule Ring Graph Scan</div>
              <div className="bg-dark-900 p-2 rounded border border-slate-800 text-center">Velocity Check (&lt;2ms)</div>
              <div className="bg-dark-900 p-2 rounded border border-slate-800 text-center">ZK Sanctions Proof</div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-5 w-5 text-slate-500 rotate-90" />
          </div>

          {/* Layer 2: Hybrid Dynamic Rail Router */}
          <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-4 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-violet-300 font-bold">
              <div className="flex items-center space-x-2">
                <Server className="h-4 w-4 text-violet-400" />
                <span>HYBRID MULTI-RAIL ROUTING ENGINE</span>
              </div>
              <span className="text-[10px] bg-violet-900/60 px-2 py-0.5 rounded text-violet-200">
                Lowest Cost / Lowest Latency Path
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-slate-300 font-mono">
              <div className="bg-dark-900 p-2 rounded border border-slate-800 text-center border-l-2 border-l-cyan-400">
                Rail 1: CBDC Bridge (0.01%)
              </div>
              <div className="bg-dark-900 p-2 rounded border border-slate-800 text-center border-l-2 border-l-emerald-400">
                Rail 2: L2 ZK-Rollup (0.05%)
              </div>
              <div className="bg-dark-900 p-2 rounded border border-slate-800 text-center border-l-2 border-l-amber-400">
                Rail 3: PayNow/UPI Fallback
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
