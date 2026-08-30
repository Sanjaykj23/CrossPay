import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CrossPay Enterprise Console | Hybrid Global Remittance Protocol',
  description: 'Production-grade enterprise console and marketing showcase for CrossPay - The Hybrid B2B Protocol for Inclusive Global Remittances.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-900 text-slate-100 min-h-screen antialiased selection:bg-cyan-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
