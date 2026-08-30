export type CurrencyCode = 'SGD' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'INR' | 'PHP' | 'KES' | 'MXN' | 'BDT';

export interface CurrencyInfo {
  code: CurrencyCode;
  name: string;
  symbol: string;
  flag: string;
  isCBDCAvailable: boolean;
  rateToUSD: number;
}

export interface Corridor {
  id: string;
  sourceCurrency: CurrencyCode;
  targetCurrency: CurrencyCode;
  sourceCountry: string;
  targetCountry: string;
  exchangeRate: number;
  avgLatencyMs: number;
  dailyVolume: string;
}

export type ChannelMode = 'app' | 'web' | 'ussd';

export interface SandboxToggles {
  cbdcEnabled: boolean;
  offlineMode: boolean;
  injectFraud: boolean;
}

export type RailId = 'rail_cbdc' | 'rail_l2' | 'rail_legacy';

export interface SettlementRail {
  id: RailId;
  name: string;
  subTitle: string;
  type: 'CBDC' | 'L2_STABLECOIN' | 'LEGACY_FAST';
  status: 'active' | 'standby' | 'fallback' | 'offline';
  feePercentage: number;
  fixedFeeUsd: number;
  latencyMs: number;
  successRate: number;
  description: string;
  protocolBadge: string;
}

export interface XAIDecisionNode {
  category: string;
  checkName: string;
  status: 'PASS' | 'WARNING' | 'FAIL';
  score: number; // 0 to 1
  detail: string;
  iconName: string;
}

export interface TransactionPayload {
  id: string;
  timestamp: string;
  senderName: string;
  senderAccount: string;
  senderCurrency: CurrencyCode;
  senderAmount: number;
  recipientName: string;
  recipientAccount: string;
  recipientCurrency: CurrencyCode;
  recipientAmount: number;
  channel: ChannelMode;
  selectedRail: RailId;
  status: 'APPROVED' | 'FLAGGED' | 'QUEUED_OFFLINE' | 'PROCESSING';
  riskScore: number; // 0.00 to 1.00
  latencyMs: number;
  feeUsd: number;
  isOfflineTEE: boolean;
  teeVoucherSignature?: string;
  xaiTree: XAIDecisionNode[];
}

export type ActiveTab = 'sandbox' | 'compliance' | 'ussd' | 'architecture' | 'analytics';
