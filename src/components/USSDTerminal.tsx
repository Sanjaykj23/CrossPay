'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, WifiOff, Wifi, ShieldCheck, Lock, ArrowRight, RefreshCw, Key, Smartphone, AlertCircle } from 'lucide-react';
import { TransactionPayload } from '../types';

interface USSDTerminalProps {
  onOfflineVoucherGenerated: (tx: TransactionPayload) => void;
}

export const USSDTerminal: React.FC<USSDTerminalProps> = ({ onOfflineVoucherGenerated }) => {
  // Step 1: Initial state or USSD code input
  // Step 2: Select recipient
  // Step 3: Enter amount
  // Step 4: Enter PIN
  // Step 5: TEE Hardware Voucher Signed & Generated
  const [ussdStep, setUssdStep] = useState<number>(1);
  const [ussdCode, setUssdCode] = useState<string>('*99*1#');
  const [recipient, setRecipient] = useState<string>('+91 98765 43210');
  const [amount, setAmount] = useState<string>('100');
  const [pin, setPin] = useState<string>('4921');
  const [isMeshConnected, setIsMeshConnected] = useState<boolean>(false);
  const [signedVouchers, setSignedVouchers] = useState<
    Array<{
      id: string;
      recipient: string;
      amount: string;
      signature: string;
      timestamp: string;
      synced: boolean;
    }>
  >([]);

  const handleKeyPress = (char: string) => {
    if (ussdStep === 1) {
      setUssdCode((prev) => prev + char);
    } else if (ussdStep === 2) {
      setRecipient((prev) => prev + char);
    } else if (ussdStep === 3) {
      setAmount((prev) => prev + char);
    } else if (ussdStep === 4) {
      if (pin.length < 4) setPin((prev) => prev + char);
    }
  };

  const handleClear = () => {
    if (ussdStep === 1) setUssdCode('*99*1#');
    if (ussdStep === 2) setRecipient('+91 987');
    if (ussdStep === 3) setAmount('0');
    if (ussdStep === 4) setPin('');
  };

  const handleSend = () => {
    if (ussdStep < 5) {
      setUssdStep(ussdStep + 1);
      if (ussdStep === 4) {
        // Generate TEE Voucher
        const voucherId = `tee_vch_${Math.floor(100000 + Math.random() * 900000)}`;
        const signature = `0x${Math.random().toString(16).substring(2, 10)}_TEE_QUALCOMM_SECURE_ENCLAVE_SIGNED`;
        
        const newVoucher = {
          id: voucherId,
          recipient,
          amount: `${amount} SGD`,
          signature,
          timestamp: new Date().toLocaleTimeString(),
          synced: false,
        };

        setSignedVouchers((prev) => [newVoucher, ...prev]);

        // Trigger transaction payload creation
        onOfflineVoucherGenerated({
          id: voucherId,
          timestamp: 'Just now (Offline TEE)',
          senderName: 'M-Pesa Feature Phone TEE',
          senderAccount: 'USSD Hardware Vault •• 901',
          senderCurrency: 'SGD',
          senderAmount: Number(amount),
          recipientName: `Lakshmi Devi (${recipient})`,
          recipientAccount: 'UPI Mobile Wallet •• 4321',
          recipientCurrency: 'INR',
          recipientAmount: Number(amount) * 62.45,
          channel: 'ussd',
          selectedRail: 'rail_cbdc',
          status: 'QUEUED_OFFLINE',
          riskScore: 0.02,
          latencyMs: 12,
          feeUsd: 0.04,
          isOfflineTEE: true,
          teeVoucherSignature: signature,
          xaiTree: [
            { category: 'Hardware Enclave', checkName: 'Hardware TEE Key Voucher', status: 'PASS', score: 0.01, detail: 'Signed inside ARM TrustZone secure enclave', iconName: 'Cpu' },
            { category: 'Offline Proof', checkName: 'ZK State Channel Balance', status: 'PASS', score: 0.01, detail: 'Sufficient offline balance proven without double-spend risk', iconName: 'Lock' },
          ],
        });
      }
    }
  };

  const handleReset = () => {
    setUssdStep(1);
    setUssdCode('*99*1#');
    setPin('4921');
  };

  const handleSyncAll = () => {
    setIsMeshConnected(true);
    setSignedVouchers((prev) => prev.map((v) => ({ ...v, synced: true })));
    setTimeout(() => {
      setIsMeshConnected(false);
    }, 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Phone Simulator Frame */}
      <div className="lg:col-span-6 flex flex-col items-center">
        <div className="w-full max-w-sm rounded-[36px] border-4 border-slate-700 bg-dark-950 p-5 shadow-2xl shadow-cyan-950/30">
          
          {/* Phone Header / Earpiece */}
          <div className="flex items-center justify-between px-2 pb-3">
            <div className="flex items-center space-x-1 text-[10px] font-mono text-amber-400">
              <WifiOff className="h-3 w-3 animate-pulse" />
              <span>OFFLINE MESH MODE</span>
            </div>
            <div className="h-1.5 w-12 rounded-full bg-slate-800" />
            <div className="text-[10px] font-mono text-slate-400">BATTERY 98%</div>
          </div>

          {/* Retro LCD Screen */}
          <div className="rounded-2xl border-2 border-emerald-900/60 bg-emerald-950/40 p-4 font-mono shadow-inner min-h-[220px] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] text-emerald-400/80 border-b border-emerald-900/40 pb-1">
                <span>CROSSPAY USSD v3.1</span>
                <span>STEP {ussdStep}/5</span>
              </div>

              {/* USSD Menu Screen Content */}
              {ussdStep === 1 && (
                <div className="space-y-1 text-emerald-300 text-xs">
                  <p className="font-semibold text-emerald-200">CROSSPAY GLOBAL REMIT</p>
                  <p>1. Send Money (Cross-Border)</p>
                  <p>2. Check TEE Offline Balance</p>
                  <p>3. View Signed Vouchers</p>
                  <div className="pt-2 text-emerald-400 font-bold">
                    Command: <span className="bg-emerald-900/60 px-1 py-0.5">{ussdCode}</span>
                  </div>
                </div>
              )}

              {ussdStep === 2 && (
                <div className="space-y-1 text-emerald-300 text-xs">
                  <p className="font-semibold text-emerald-200">ENTER RECIPIENT PHONE:</p>
                  <p className="text-[10px] text-emerald-400/80">Format: +91 98765 43210</p>
                  <div className="pt-2 text-emerald-400 font-bold">
                    To: <span className="bg-emerald-900/60 px-1 py-0.5">{recipient}</span>
                  </div>
                </div>
              )}

              {ussdStep === 3 && (
                <div className="space-y-1 text-emerald-300 text-xs">
                  <p className="font-semibold text-emerald-200">TRANSFER AMOUNT (SGD):</p>
                  <p className="text-[10px] text-emerald-400/80">Recipient gets ≈ INR {Number(amount) * 62.45}</p>
                  <div className="pt-2 text-emerald-400 font-bold">
                    Amt: <span className="bg-emerald-900/60 px-1 py-0.5">${amount} SGD</span>
                  </div>
                </div>
              )}

              {ussdStep === 4 && (
                <div className="space-y-1 text-emerald-300 text-xs">
                  <p className="font-semibold text-emerald-200">ENTER SECURE TEE PIN:</p>
                  <p className="text-[10px] text-emerald-400/80">Hardware Enclave Key Sign</p>
                  <div className="pt-2 text-emerald-400 font-bold">
                    PIN: <span className="bg-emerald-900/60 px-1 py-0.5">{'*'.repeat(pin.length)}</span>
                  </div>
                </div>
              )}

              {ussdStep === 5 && (
                <div className="space-y-1 text-emerald-300 text-xs">
                  <p className="font-semibold text-emerald-200 text-center">✓ VOUCHER SIGNED!</p>
                  <p className="text-[10px] text-emerald-300">Local TEE Enclave Cryptographic Proof Created.</p>
                  <p className="text-[10px] text-emerald-400/80">
                    Payload will auto-settle when mesh connects.
                  </p>
                </div>
              )}
            </div>

            {/* Screen Softkeys */}
            <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold border-t border-emerald-900/40 pt-1.5">
              <span>{ussdStep < 5 ? '[SEND/OK]' : '[NEW TX]'}</span>
              <span>[CLEAR]</span>
            </div>
          </div>

          {/* Retro Keypad */}
          <div className="mt-5 grid grid-cols-3 gap-2.5">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="flex h-11 items-center justify-center rounded-xl border border-slate-700 bg-dark-800 font-mono text-sm font-bold text-white transition-all hover:bg-slate-700 active:scale-95 shadow"
              >
                {key}
              </button>
            ))}
          </div>

          {/* Action Soft Buttons */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <button
              onClick={handleSend}
              className="rounded-xl border border-emerald-500/40 bg-emerald-950 p-2.5 text-xs font-bold text-emerald-400 hover:bg-emerald-900"
            >
              SEND / OK
            </button>
            <button
              onClick={handleClear}
              className="rounded-xl border border-slate-700 bg-dark-800 p-2.5 text-xs font-bold text-slate-300 hover:bg-slate-700"
            >
              CLEAR
            </button>
            <button
              onClick={handleReset}
              className="rounded-xl border border-rose-500/40 bg-rose-950 p-2.5 text-xs font-bold text-rose-400 hover:bg-rose-900"
            >
              RESET
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Hardware Enclave Protocol Architecture Explanation */}
      <div className="lg:col-span-6 space-y-5">
        
        {/* Module Header */}
        <div className="rounded-2xl border border-slate-700 bg-dark-800 p-5 shadow-xl space-y-3">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-950 border border-amber-500/40 text-amber-400">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Hardware TEE Offline Voucher System</h3>
              <p className="text-xs text-slate-400">
                Non-network remittance execution using SIM card Trusted Execution Environments
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3.5 text-xs text-amber-200 leading-relaxed">
            <span className="font-semibold text-amber-400">How Offline Remittances Work:</span> When a rural migrant user has zero cellular data or internet coverage, CrossPay triggers a hardware SIM enclave (Qualcomm TEE). A cryptographic voucher is signed locally with a zero-knowledge balance proof.
          </div>

          {/* Sync Mesh Action */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-700">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
              <span className={`h-2 w-2 rounded-full ${isMeshConnected ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
              <span>{isMeshConnected ? 'MESH CONNECTED (RECONCILING)' : 'OFFLINE BUFFER QUEUED'}</span>
            </div>

            <button
              onClick={handleSyncAll}
              disabled={isMeshConnected}
              className="flex items-center space-x-2 rounded-xl border border-cyan-500/40 bg-cyan-950 px-4 py-2 text-xs font-mono font-bold text-cyan-300 hover:bg-cyan-900 transition-all shadow"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isMeshConnected ? 'animate-spin' : ''}`} />
              <span>Reconnect Mesh & Settle</span>
            </button>
          </div>
        </div>

        {/* Signed TEE Vouchers Local Memory List */}
        <div className="rounded-2xl border border-slate-700 bg-dark-800 p-5 shadow-xl space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Offline Hardware Voucher Queue</span>
            <span className="font-mono text-emerald-400">{signedVouchers.length} Vouchers in TEE Vault</span>
          </h4>

          {signedVouchers.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-700 p-6 text-center text-xs text-slate-500 font-mono">
              Use the phone simulator keypad on the left to dial *99*1# and generate a signed TEE voucher.
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {signedVouchers.map((v) => (
                <div
                  key={v.id}
                  className={`rounded-xl border p-3 font-mono text-xs space-y-2 transition-all ${
                    v.synced
                      ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                      : 'border-amber-500/40 bg-amber-950/20 text-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>{v.id}</span>
                    <span className="text-[10px] rounded px-2 py-0.5 bg-dark-900 border border-slate-700">
                      {v.synced ? '✓ SETTLED ON-CHAIN' : 'QUEUED IN TEE VAULT'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300 text-[11px]">
                    <span>Target: {v.recipient}</span>
                    <span className="font-bold text-white">{v.amount}</span>
                  </div>

                  <div className="text-[9px] text-slate-500 break-all bg-dark-900 p-1.5 rounded border border-slate-800">
                    [ECDSA SIGNATURE]: {v.signature}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
