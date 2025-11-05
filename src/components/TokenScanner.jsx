import React, { useState } from 'react';
import { Search, Shield, AlertTriangle, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import RiskBadge from './RiskBadge';
import { usePaymentContext } from '../hooks/usePaymentContext';

const TokenScanner = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [dailyScans, setDailyScans] = useState(3); // User has used 3/5 free scans

  const { createSession } = usePaymentContext();

  const mockScanResults = {
    safe: {
      riskScore: 85,
      status: 'safe',
      tokenInfo: {
        name: 'Bonk',
        symbol: 'BONK',
        price: '$0.000012',
        marketCap: '$847M',
        holders: '125,432'
      },
      checks: [
        { name: 'Liquidity Locked', status: 'pass', description: 'LP tokens are locked for 6 months' },
        { name: 'Contract Verified', status: 'pass', description: 'Source code verified on Solscan' },
        { name: 'Top Holder Check', status: 'pass', description: 'No single holder owns >10%' },
        { name: 'Mint Authority', status: 'pass', description: 'Mint authority has been revoked' },
        { name: 'Social Signals', status: 'warning', description: 'Limited social media presence' }
      ]
    },
    risky: {
      riskScore: 25,
      status: 'danger',
      tokenInfo: {
        name: 'SafeMoon Clone',
        symbol: 'SCAM',
        price: '$0.00001',
        marketCap: '$12K',
        holders: '23'
      },
      checks: [
        { name: 'Liquidity Locked', status: 'fail', description: 'No liquidity lock detected' },
        { name: 'Contract Verified', status: 'fail', description: 'Source code not verified' },
        { name: 'Top Holder Check', status: 'fail', description: 'Top holder owns 67% of supply' },
        { name: 'Mint Authority', status: 'fail', description: 'Mint authority still active' },
        { name: 'Social Signals', status: 'fail', description: 'No official social media accounts' }
      ]
    }
  };

  const scanToken = async () => {
    if (!tokenAddress.trim()) return;

    // Check if user needs to pay for premium scan
    if (dailyScans >= 5) {
      try {
        await createSession(); // $0.50 for premium scan
      } catch (error) {
        console.error('Payment failed:', error);
        return;
      }
    }

    setScanning(true);
    
    // Simulate API call
    setTimeout(() => {
      const isRisky = tokenAddress.toLowerCase().includes('scam') || Math.random() < 0.3;
      setScanResult(isRisky ? mockScanResults.risky : mockScanResults.safe);
      setDailyScans(prev => prev + 1);
      setScanning(false);
    }, 3000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass':
        return <CheckCircle size={16} className="text-accent" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-warning" />;
      case 'fail':
        return <XCircle size={16} className="text-danger" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Scanner Input */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <Shield size={24} className="text-primary" />
          <div>
            <h2 className="text-xl font-semibold">Token Safety Scanner</h2>
            <p className="text-sm text-textMuted">Analyze any Solana token for rug-pull risks</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted" />
            <input
              type="text"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="Enter token contract address..."
              className="w-full pl-10 pr-4 py-3 bg-bg border border-border rounded-lg focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-textMuted">
              Daily scans: {dailyScans}/5 free
              {dailyScans >= 5 && <span className="text-warning ml-2">($0.50 per additional scan)</span>}
            </div>
            <button
              onClick={scanToken}
              disabled={!tokenAddress.trim() || scanning}
              className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white rounded-lg font-medium transition-colors"
            >
              {scanning ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Shield size={16} />
                  Scan Token
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Scanning Progress */}
      {scanning && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Loader2 size={20} className="animate-spin text-primary" />
              <span className="font-medium">Analyzing token safety...</span>
            </div>
            
            <div className="space-y-2">
              {[
                'Checking liquidity lock status...',
                'Analyzing holder distribution...',
                'Verifying contract source code...',
                'Scanning for honeypot patterns...',
                'Evaluating social signals...'
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-textMuted">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scan Results */}
      {scanResult && !scanning && (
        <div className="space-y-4">
          {/* Risk Score Card */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{scanResult.tokenInfo.name} ({scanResult.tokenInfo.symbol})</h3>
                <p className="text-sm text-textMuted">Contract: {tokenAddress}</p>
              </div>
              <RiskBadge score={scanResult.riskScore} status={scanResult.status} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div>
                <div className="text-sm text-textMuted">Price</div>
                <div className="font-medium">{scanResult.tokenInfo.price}</div>
              </div>
              <div>
                <div className="text-sm text-textMuted">Market Cap</div>
                <div className="font-medium">{scanResult.tokenInfo.marketCap}</div>
              </div>
              <div>
                <div className="text-sm text-textMuted">Holders</div>
                <div className="font-medium">{scanResult.tokenInfo.holders}</div>
              </div>
              <div>
                <div className="text-sm text-textMuted">Risk Score</div>
                <div className={`font-bold ${
                  scanResult.riskScore >= 70 ? 'text-accent' :
                  scanResult.riskScore >= 40 ? 'text-warning' : 'text-danger'
                }`}>
                  {scanResult.riskScore}/100
                </div>
              </div>
            </div>

            {scanResult.riskScore >= 70 && (
              <button className="w-full py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-colors">
                Quick Swap This Token
              </button>
            )}
          </div>

          {/* Detailed Checks */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h4 className="font-semibold mb-4">Security Analysis</h4>
            <div className="space-y-3">
              {scanResult.checks.map((check, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-bg rounded-lg">
                  {getStatusIcon(check.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{check.name}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        check.status === 'pass' ? 'bg-accent/20 text-accent' :
                        check.status === 'warning' ? 'bg-warning/20 text-warning' :
                        'bg-danger/20 text-danger'
                      }`}>
                        {check.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-textMuted">{check.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Examples */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="font-semibold mb-4">Try These Examples</h4>
        <div className="grid gap-2">
          <button
            onClick={() => setTokenAddress('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')}
            className="text-left p-3 bg-bg hover:bg-surfaceHover rounded-lg transition-colors"
          >
            <div className="font-medium">USDC (Safe Token)</div>
            <div className="text-sm text-textMuted">EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v</div>
          </button>
          <button
            onClick={() => setTokenAddress('scam123456789')}
            className="text-left p-3 bg-bg hover:bg-surfaceHover rounded-lg transition-colors"
          >
            <div className="font-medium">Risky Token Example</div>
            <div className="text-sm text-textMuted">scam123456789 (Demo risky token)</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenScanner;