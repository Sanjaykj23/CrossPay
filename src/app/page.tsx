'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { LiveRoutingSandbox } from '../components/LiveRoutingSandbox';
import { ComplianceStream } from '../components/ComplianceStream';
import { USSDTerminal } from '../components/USSDTerminal';
import { ArchitectureView } from '../components/ArchitectureView';
import { CostCalculator } from '../components/CostCalculator';
import { ActiveTab, SandboxToggles, RailId, TransactionPayload } from '../types';
import { INITIAL_TRANSACTIONS, MOCK_RAILS, CURRENCIES } from '../data/mockData';
import { ShieldAlert, CheckCircle2, Zap } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('sandbox');
  const [transactions, setTransactions] = useState<TransactionPayload[]>(INITIAL_TRANSACTIONS);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'alert' } | null>(null);

  const [toggles, setToggles] = useState<SandboxToggles>({
    cbdcEnabled: true,
    offlineMode: false,
    injectFraud: false,
  });

  // Calculate active rail dynamically based on toggles
  const activeRail: RailId = toggles.offlineMode
    ? 'rail_l2'
    : toggles.cbdcEnabled
    ? 'rail_cbdc'
    : 'rail_legacy';

  const handleSimulateRemittance = (payload: {
    senderCurrency: string;
    targetCurrency: string;
    amount: number;
    channel: 'app' | 'web' | 'ussd';
    toggles: SandboxToggles;
  }) => {
    setIsSimulating(true);
    setNotification(null);

    setTimeout(() => {
      setIsSimulating(false);

      const isFraud = payload.toggles.injectFraud;
      const isOffline = payload.toggles.offlineMode;
      const txId = `tx_cp_${Math.floor(100000 + Math.random() * 900000)}`;

      const chosenRail = isOffline ? 'rail_l2' : payload.toggles.cbdcEnabled ? 'rail_cbdc' : 'rail_legacy';

      const newTx: TransactionPayload = {
        id: txId,
        timestamp: 'Just now',
        senderName: 'Simulated Business Account',
        senderAccount: 'Corporate Vault •• 9921',
        senderCurrency: payload.senderCurrency as any,
        senderAmount: payload.amount,
        recipientName: 'Global Vendor Services',
        recipientAccount: 'Settlement Account •• 4012',
        recipientCurrency: payload.targetCurrency as any,
        recipientAmount: payload.amount * 62.45,
        channel: payload.channel,
        selectedRail: chosenRail,
        status: isFraud ? 'FLAGGED' : isOffline ? 'QUEUED_OFFLINE' : 'APPROVED',
        riskScore: isFraud ? 0.89 : isOffline ? 0.02 : 0.04,
        latencyMs: chosenRail === 'rail_cbdc' ? 38 : chosenRail === 'rail_l2' ? 1200 : 3800,
        feeUsd: (payload.amount * 0.0002) + 0.02,
        isOfflineTEE: isOffline,
        xaiTree: isFraud
          ? [
              { category: 'Mule Detection', checkName: 'Rapid Velocity Anomaly', status: 'FAIL', score: 0.91, detail: 'High risk hop pattern matched flagged syndicate network', iconName: 'ShieldAlert' },
              { category: 'Sanctions & OFAC', checkName: 'Watchlist Screening', status: 'WARNING', score: 0.78, detail: 'Counterparty entity flag in high-risk jurisdiction', iconName: 'ShieldAlert' },
              { category: 'Device Trust', checkName: 'Proxy Nonce Spoofing', status: 'FAIL', score: 0.85, detail: 'Device fingerprint mismatch', iconName: 'Smartphone' },
            ]
          : [
              { category: 'Sanctions & OFAC', checkName: 'Global Sanction List Scan', status: 'PASS', score: 0.0, detail: 'Verified clean recipient identity across all databases', iconName: 'ShieldCheck' },
              { category: 'Identity & Nonce', checkName: 'Hardware TEE Signature', status: 'PASS', score: 0.01, detail: 'Valid cryptographic enclave signature', iconName: 'Cpu' },
              { category: 'Velocity Check', checkName: 'Mule Ring Graph Scan', status: 'PASS', score: 0.02, detail: 'Normal velocity pattern verified', iconName: 'Share2' },
            ],
      };

      setTransactions((prev) => [newTx, ...prev]);

      if (isFraud) {
        setNotification({
          message: `🔴 AML ALERT: Transfer ${txId} FLAGGED by Compliance Engine (Risk Score 0.89)`,
          type: 'alert',
        });
      } else if (isOffline) {
        setNotification({
          message: `🟡 TEE VOUCHER: Transfer ${txId} signed in hardware enclave (Offline Queue)`,
          type: 'success',
        });
      } else {
        setNotification({
          message: `🟢 SUCCESS: Transfer ${txId} cleared via ${
            chosenRail === 'rail_cbdc' ? 'CBDC Bridge' : 'L2 State Channel'
          } in ${newTx.latencyMs}ms!`,
          type: 'success',
        });
      }
    }, 1200);
  };

  const handleOfflineVoucherGenerated = (tx: TransactionPayload) => {
    setTransactions((prev) => [tx, ...prev]);
    setNotification({
      message: `🟡 USSD TEE VOUCHER SIGNED: ${tx.id} saved in local memory queue`,
      type: 'success',
    });
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} txCount={transactions.length} />

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4"
          >
            <div
              className={`flex items-center justify-between rounded-xl border p-3.5 text-xs font-mono shadow-lg ${
                notification.type === 'alert'
                  ? 'border-rose-500/50 bg-rose-950/80 text-rose-300'
                  : 'border-emerald-500/50 bg-emerald-950/80 text-emerald-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                {notification.type === 'alert' ? (
                  <ShieldAlert className="h-4 w-4 text-rose-400" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                )}
                <span>{notification.message}</span>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-slate-400 hover:text-white font-bold text-sm px-2"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'sandbox' && (
          <LiveRoutingSandbox
            onSimulate={handleSimulateRemittance}
            rails={MOCK_RAILS}
            activeRail={activeRail}
            isSimulating={isSimulating}
            toggles={toggles}
            setToggles={setToggles}
          />
        )}

        {activeTab === 'compliance' && <ComplianceStream transactions={transactions} />}

        {activeTab === 'ussd' && <USSDTerminal onOfflineVoucherGenerated={handleOfflineVoucherGenerated} />}

        {activeTab === 'architecture' && <ArchitectureView />}

        {activeTab === 'analytics' && <CostCalculator />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-dark-950 py-4 text-center text-xs text-slate-500 font-mono">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>CrossPay B2B Protocol • Enterprise Global Settlement Console</div>
          <div className="flex items-center space-x-4">
            <span>mBridge Compatible</span>
            <span>•</span>
            <span>ZK-Rollup L2</span>
            <span>•</span>
            <span>TEE SIM Enclave</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
