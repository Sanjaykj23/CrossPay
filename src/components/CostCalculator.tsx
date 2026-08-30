'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, DollarSign, Clock, Zap, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const CostCalculator: React.FC = () => {
  const [transferAmount, setTransferAmount] = useState<number>(1000);
  const [monthlyTransfers, setMonthlyTransfers] = useState<number>(500);

  // CrossPay Specs
  const crossPayFeePct = 0.02; // 0.02%
  const crossPayFxSpreadPct = 0.01; // 0.01%
  const crossPayFixed = 0.05; // $0.05
  const crossPayTotalFee = (transferAmount * crossPayFeePct) / 100 + (transferAmount * crossPayFxSpreadPct) / 100 + crossPayFixed;

  // SWIFT Specs
  const swiftFeePct = 1.2; // 1.2%
  const swiftFxSpreadPct = 2.5; // 2.5%
  const swiftFixed = 25.0; // $25 flat fee
  const swiftTotalFee = (transferAmount * swiftFeePct) / 100 + (transferAmount * swiftFxSpreadPct) / 100 + swiftFixed;

  // Traditional MTO (Western Union / MoneyGram) Specs
  const mtoFeePct = 2.8; // 2.8%
  const mtoFxSpreadPct = 4.5; // 4.5%
  const mtoFixed = 5.0; // $5 fee
  const mtoTotalFee = (transferAmount * mtoFeePct) / 100 + (transferAmount * mtoFxSpreadPct) / 100 + mtoFixed;

  const perTxSavingsVsMTO = mtoTotalFee - crossPayTotalFee;
  const perTxSavingsVsSwift = swiftTotalFee - crossPayTotalFee;

  const annualSavingsVsMTO = perTxSavingsVsMTO * monthlyTransfers * 12;
  const annualSavingsVsSwift = perTxSavingsVsSwift * monthlyTransfers * 12;

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="rounded-2xl border border-slate-700 bg-dark-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-950 border border-indigo-500/40 text-indigo-400">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Analytics & Fee Savings Comparison Engine</h2>
            <p className="text-xs text-slate-400">
              Benchmark CrossPay settlement economics against SWIFT wire and legacy Money Transfer Operators
            </p>
          </div>
        </div>

        {/* Interactive Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Transfer Amount Input */}
          <div className="rounded-xl border border-slate-700/80 bg-dark-900 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Average Transfer Amount</span>
              <span className="text-emerald-400 font-bold tabular-nums">
                ${transferAmount.toLocaleString('en-US')} USD
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={100000}
              step={50}
              value={transferAmount}
              onChange={(e) => setTransferAmount(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>$50</span>
              <span>$10,000</span>
              <span>$100,000</span>
            </div>
          </div>

          {/* Monthly Transaction Volume Input */}
          <div className="rounded-xl border border-slate-700/80 bg-dark-900 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Monthly Remittance Volume</span>
              <span className="text-cyan-400 font-bold tabular-nums">
                {monthlyTransfers.toLocaleString('en-US')} Transactions / Month
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={10000}
              step={10}
              value={monthlyTransfers}
              onChange={(e) => setMonthlyTransfers(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>10 tx/mo</span>
              <span>1,000 tx/mo</span>
              <span>10,000 tx/mo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Comparison Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CrossPay Card (Highlighted Winner) */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border-2 border-emerald-500/60 bg-gradient-to-b from-emerald-950/30 to-dark-800 p-6 shadow-2xl space-y-5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-emerald-500 text-dark-950 font-mono font-bold text-[9px] uppercase px-3 py-1 rounded-bl-xl tracking-wider">
            RECOMMENDED PROTOCOL
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">CrossPay Protocol</h3>
            </div>
            <p className="text-xs text-emerald-300/80">CBDC & ZK-Rollup Hybrid Rail</p>
          </div>

          <div className="space-y-3 font-mono">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Total Cost per Tx</span>
              <span className="text-2xl font-extrabold text-emerald-400 tabular-nums">
                ${crossPayTotalFee.toFixed(2)} USD
              </span>
              <span className="text-[10px] text-slate-400 block">
                ({((crossPayTotalFee / transferAmount) * 100).toFixed(2)}% effective rate)
              </span>
            </div>

            <div className="pt-2 border-t border-slate-700/80 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Clearing Latency:</span>
                <span className="text-cyan-400 font-bold">38ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">FX Markup:</span>
                <span className="text-emerald-400 font-bold">0.01%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Offline USSD Support:</span>
                <span className="text-emerald-400 font-bold">Native (TEE SIM)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Traditional MTO Card */}
        <div className="rounded-2xl border border-slate-700 bg-dark-800 p-6 shadow-xl space-y-5">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-200">Traditional MTO</h3>
            <p className="text-xs text-slate-400">Western Union / MoneyGram</p>
          </div>

          <div className="space-y-3 font-mono">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Total Cost per Tx</span>
              <span className="text-2xl font-bold text-rose-400 tabular-nums">
                ${mtoTotalFee.toFixed(2)} USD
              </span>
              <span className="text-[10px] text-slate-400 block">
                ({((mtoTotalFee / transferAmount) * 100).toFixed(2)}% effective rate)
              </span>
            </div>

            <div className="pt-2 border-t border-slate-700/80 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Clearing Latency:</span>
                <span className="text-rose-400">2 to 24 Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">FX Markup:</span>
                <span className="text-rose-400">4.50%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Offline Support:</span>
                <span className="text-rose-400">Manual Cash Counter</span>
              </div>
            </div>
          </div>
        </div>

        {/* SWIFT Wire Card */}
        <div className="rounded-2xl border border-slate-700 bg-dark-800 p-6 shadow-xl space-y-5">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-200">SWIFT Bank Wire</h3>
            <p className="text-xs text-slate-400">Correspondent Banking Net</p>
          </div>

          <div className="space-y-3 font-mono">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Total Cost per Tx</span>
              <span className="text-2xl font-bold text-amber-400 tabular-nums">
                ${swiftTotalFee.toFixed(2)} USD
              </span>
              <span className="text-[10px] text-slate-400 block">
                ({((swiftTotalFee / transferAmount) * 100).toFixed(2)}% effective rate)
              </span>
            </div>

            <div className="pt-2 border-t border-slate-700/80 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Clearing Latency:</span>
                <span className="text-amber-400">3 to 5 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">FX Markup:</span>
                <span className="text-amber-400">2.50%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Offline Support:</span>
                <span className="text-amber-400">None</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Annual ROI Savings Highlight */}
      <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-6 shadow-xl font-mono space-y-3">
        <div className="flex items-center space-x-2 text-xs text-emerald-400 font-bold uppercase tracking-wider">
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          <span>PROJECTED ANNUAL ENTERPRISE SAVINGS WITH CROSSPAY</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="rounded-xl border border-emerald-500/30 bg-dark-900 p-4">
            <span className="text-xs text-slate-400 block">Annual Savings vs Traditional MTOs:</span>
            <span className="text-3xl font-extrabold text-emerald-400 tabular-nums">
              ${Math.round(annualSavingsVsMTO).toLocaleString('en-US')} USD
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">
              Saves ${(perTxSavingsVsMTO).toFixed(2)} on every single remittance.
            </span>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-dark-900 p-4">
            <span className="text-xs text-slate-400 block">Annual Savings vs SWIFT Wires:</span>
            <span className="text-3xl font-extrabold text-cyan-400 tabular-nums">
              ${Math.round(annualSavingsVsSwift).toLocaleString('en-US')} USD
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">
              Saves ${(perTxSavingsVsSwift).toFixed(2)} on every single remittance.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
