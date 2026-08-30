'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  Share2, 
  Smartphone, 
  Key, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter, 
  Lock, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { TransactionPayload, XAIDecisionNode } from '../types';

interface ComplianceStreamProps {
  transactions: TransactionPayload[];
}

export const ComplianceStream: React.FC<ComplianceStreamProps> = ({ transactions }) => {
  const [expandedTxId, setExpandedTxId] = useState<string | null>(transactions[0]?.id || null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleExpand = (id: string) => {
    setExpandedTxId(expandedTxId === id ? null : id);
  };

  const filteredTxs = transactions.filter((tx) => {
    if (filterStatus === 'APPROVED' && tx.status !== 'APPROVED') return false;
    if (filterStatus === 'FLAGGED' && tx.status !== 'FLAGGED') return false;
    if (filterStatus === 'OFFLINE' && tx.status !== 'QUEUED_OFFLINE') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        tx.id.toLowerCase().includes(q) ||
        tx.senderName.toLowerCase().includes(q) ||
        tx.recipientName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="h-4 w-4" />;
      case 'Share2':
        return <Share2 className="h-4 w-4" />;
      case 'Smartphone':
        return <Smartphone className="h-4 w-4" />;
      case 'Key':
        return <Key className="h-4 w-4" />;
      case 'Lock':
        return <Lock className="h-4 w-4" />;
      case 'ShieldAlert':
        return <ShieldAlert className="h-4 w-4" />;
      default:
        return <ShieldCheck className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Stream Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-slate-700 bg-dark-800 p-5 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white">Real-Time Explainable AI (XAI) Compliance & AML Stream</h2>
              <span className="rounded bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-mono font-medium text-emerald-400">
                Latency &lt; 50ms
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Autonomous risk-scoring engine with verifiable decision tree audit trails
            </p>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search sender, recipient or TX..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 sm:w-64 rounded-xl border border-slate-700 bg-dark-900 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none font-mono"
            />
          </div>

          <div className="flex items-center space-x-1 rounded-xl border border-slate-700 bg-dark-900 p-1 text-xs">
            {['ALL', 'APPROVED', 'FLAGGED', 'OFFLINE'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-mono font-medium transition-all ${
                  filterStatus === status
                    ? 'bg-slate-800 text-emerald-400 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Log Cards List */}
      <div className="space-y-4">
        {filteredTxs.length === 0 ? (
          <div className="rounded-2xl border border-slate-700 bg-dark-800 p-8 text-center text-slate-400 text-xs">
            No compliance payloads match your filter settings.
          </div>
        ) : (
          filteredTxs.map((tx) => {
            const isExpanded = expandedTxId === tx.id;
            const isApproved = tx.status === 'APPROVED';
            const isFlagged = tx.status === 'FLAGGED';
            const isOffline = tx.status === 'QUEUED_OFFLINE';

            let statusBadgeClass = 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400';
            if (isFlagged) statusBadgeClass = 'bg-rose-950/60 border-rose-500/40 text-rose-400';
            if (isOffline) statusBadgeClass = 'bg-amber-950/60 border-amber-500/40 text-amber-300';

            return (
              <div
                key={tx.id}
                className={`rounded-2xl border transition-all ${
                  isFlagged
                    ? 'border-rose-900/60 bg-dark-800/90 shadow-lg shadow-rose-950/20'
                    : isExpanded
                    ? 'border-cyan-500/50 bg-dark-800 shadow-xl'
                    : 'border-slate-700/80 bg-dark-800 hover:border-slate-600'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleExpand(tx.id)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer gap-3"
                >
                  <div className="flex items-center space-x-3.5">
                    {/* Status Icon */}
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border ${
                        isApproved
                          ? 'border-emerald-500/40 bg-emerald-950 text-emerald-400'
                          : isFlagged
                          ? 'border-rose-500/40 bg-rose-950 text-rose-400 animate-pulse'
                          : 'border-amber-500/40 bg-amber-950 text-amber-300'
                      }`}
                    >
                      {isApproved ? (
                        <ShieldCheck className="h-5 w-5" />
                      ) : isFlagged ? (
                        <ShieldAlert className="h-5 w-5" />
                      ) : (
                        <Lock className="h-5 w-5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-white">{tx.id}</span>
                        <span className="text-[11px] text-slate-400 font-mono">• {tx.timestamp}</span>
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-mono ${statusBadgeClass}`}>
                          {tx.status === 'APPROVED'
                            ? `🟢 APPROVED (Risk: ${tx.riskScore.toFixed(2)})`
                            : tx.status === 'FLAGGED'
                            ? `🔴 FLAGGED (Risk: ${tx.riskScore.toFixed(2)})`
                            : `🟡 TEE OFFLINE QUEUE`}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 mt-1 flex items-center space-x-2">
                        <span className="font-semibold">{tx.senderName}</span>
                        <span className="text-slate-500">→</span>
                        <span className="font-semibold">{tx.recipientName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Amount & Risk Badge */}
                  <div className="flex items-center justify-between sm:justify-end space-x-4 border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                    <div className="text-right font-mono">
                      <div className="text-xs font-bold text-white">
                        {tx.senderAmount} {tx.senderCurrency}
                      </div>
                      <div className="text-[10px] text-emerald-400">
                        ≈ {tx.recipientAmount.toLocaleString('en-US')} {tx.recipientCurrency}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-dark-900 text-slate-400 hover:text-white">
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expandable Explainable AI (XAI) Decision Tree */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-slate-700/80 bg-dark-900/90 p-5 rounded-b-2xl space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-cyan-400" />
                          <span>Explainable Decision Tree Audit Trail</span>
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">
                          Execution Time: {tx.latencyMs}ms | Fee: ${tx.feeUsd.toFixed(2)}
                        </span>
                      </div>

                      {/* Decision Tree Nodes */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {tx.xaiTree.map((node, index) => {
                          const isPass = node.status === 'PASS';
                          const isWarn = node.status === 'WARNING';
                          const isFail = node.status === 'FAIL';

                          let nodeBorder = 'border-emerald-500/30 bg-emerald-950/20';
                          let nodeIcon = <CheckCircle className="h-4 w-4 text-emerald-400" />;
                          let nodeTextColor = 'text-emerald-300';

                          if (isWarn) {
                            nodeBorder = 'border-amber-500/30 bg-amber-950/20';
                            nodeIcon = <AlertCircle className="h-4 w-4 text-amber-400" />;
                            nodeTextColor = 'text-amber-300';
                          } else if (isFail) {
                            nodeBorder = 'border-rose-500/40 bg-rose-950/30';
                            nodeIcon = <XCircle className="h-4 w-4 text-rose-400" />;
                            nodeTextColor = 'text-rose-300';
                          }

                          return (
                            <div
                              key={index}
                              className={`rounded-xl border p-3.5 flex items-start space-x-3 ${nodeBorder}`}
                            >
                              <div className="mt-0.5 flex-shrink-0">{nodeIcon}</div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between text-xs font-semibold">
                                  <span className="text-white">{node.checkName}</span>
                                  <span className={`font-mono text-[10px] uppercase ${nodeTextColor}`}>
                                    {node.status} (Score: {node.score.toFixed(2)})
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400 leading-snug">{node.detail}</p>
                                <div className="text-[9px] font-mono text-slate-500">Category: {node.category}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Cryptographic Hardware Nonce & Proof Details */}
                      <div className="rounded-xl border border-slate-800 bg-dark-950 p-3.5 text-xs font-mono space-y-2">
                        <div className="flex items-center justify-between text-slate-400 text-[11px]">
                          <span>Cryptographic Enclave Verification</span>
                          <span className="text-cyan-400">Verifiable ZK Proof v1.2</span>
                        </div>
                        <div className="break-all text-[10px] text-slate-500 bg-dark-900 p-2 rounded border border-slate-800">
                          {tx.isOfflineTEE
                            ? `[TEE VOUCHER HASH]: ${tx.teeVoucherSignature || '0x99a8b7...ecdsa_signed'}`
                            : `[ON-CHAIN TX HASH]: 0x7f9a2b8e4c1d09e25a83b190f842a19c3e2187fa1203498bd34a9`}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
