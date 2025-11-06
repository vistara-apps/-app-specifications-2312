import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Zap, Shield, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import RouteCard from './RouteCard';
import { usePaymentContext } from '../hooks/usePaymentContext.jsx';

const SwapInterface = ({ onSwapComplete }) => {
  const [fromToken, setFromToken] = useState('SOL');
  const [toToken, setToToken] = useState('USDC');
  const [amount, setAmount] = useState('');
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [protectionEnabled, setProtectionEnabled] = useState(true);

  const { createSession } = usePaymentContext();

  // Mock route data
  const mockRoutes = [
    {
      id: 1,
      dex: 'Jupiter',
      outputAmount: '99.85',
      priceImpact: '0.12%',
      fee: '0.0025 SOL',
      route: ['SOL', 'USDC'],
      isBest: true,
      estimatedTime: '~15s'
    },
    {
      id: 2,
      dex: 'Raydium',
      outputAmount: '99.72',
      priceImpact: '0.18%',
      fee: '0.003 SOL',
      route: ['SOL', 'RAY', 'USDC'],
      isBest: false,
      estimatedTime: '~20s'
    },
    {
      id: 3,
      dex: 'Orca',
      outputAmount: '99.68',
      priceImpact: '0.22%',
      fee: '0.0035 SOL',
      route: ['SOL', 'ORCA', 'USDC'],
      isBest: false,
      estimatedTime: '~25s'
    }
  ];

  const fetchRoutes = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRoutes(mockRoutes);
      setSelectedRoute(mockRoutes[0]);
      setLoading(false);
    }, 1500);
  };

  const simulateTransaction = async () => {
    if (!selectedRoute) return;
    
    setSimulating(true);
    // Simulate transaction validation
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate
      setSimulationResult({
        success,
        probability: success ? 95 : 15,
        reason: success ? 'Transaction validated successfully' : 'Insufficient liquidity detected',
        suggestion: success ? null : 'Reduce amount by 20% or increase slippage tolerance'
      });
      setSimulating(false);
    }, 2000);
  };

  const executeSwap = async () => {
    try {
      // For premium features, require payment
      if (protectionEnabled) {
        await createSession(); // $0.25 for route protection
      }
      
      // Simulate swap execution
      const swapData = {
        fromToken,
        toToken,
        amount,
        route: selectedRoute,
        timestamp: new Date(),
        profit: '+$12.45',
        txSignature: '5KJp7...' + Math.random().toString(36).substr(2, 9)
      };
      
      onSwapComplete(swapData);
    } catch (error) {
      console.error('Swap failed:', error);
    }
  };

  const swapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setRoutes([]);
    setSelectedRoute(null);
    setSimulationResult(null);
  };

  useEffect(() => {
    if (amount && parseFloat(amount) > 0) {
      const timer = setTimeout(fetchRoutes, 500);
      return () => clearTimeout(timer);
    }
  }, [amount, fromToken, toToken]);

  return (
    <div className="space-y-6">
      {/* Swap Form */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Quick Swap</h2>
          <div className="flex items-center gap-2">
            <Shield size={16} className={protectionEnabled ? 'text-accent' : 'text-textMuted'} />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={protectionEnabled}
                onChange={(e) => setProtectionEnabled(e.target.checked)}
                className="rounded"
              />
              <span className="text-textMuted">Protection ($0.25)</span>
            </label>
          </div>
        </div>

        {/* From Token */}
        <div className="space-y-4">
          <div className="bg-bg border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-textMuted">From</span>
              <span className="text-sm text-textMuted">Balance: 12.45 SOL</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="flex-1 bg-transparent text-2xl font-semibold outline-none"
              />
              <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-2">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full"></div>
                <span className="font-medium">{fromToken}</span>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={swapTokens}
              className="p-2 bg-surface border border-border rounded-lg hover:bg-surfaceHover transition-colors"
            >
              <ArrowUpDown size={20} />
            </button>
          </div>

          {/* To Token */}
          <div className="bg-bg border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-textMuted">To</span>
              <span className="text-sm text-textMuted">Balance: 1,234.56 USDC</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={selectedRoute ? selectedRoute.outputAmount : ''}
                placeholder="0.0"
                readOnly
                className="flex-1 bg-transparent text-2xl font-semibold outline-none text-textMuted"
              />
              <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-2">
                <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-full"></div>
                <span className="font-medium">{toToken}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Route Comparison */}
      {loading && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Loader2 size={20} className="animate-spin text-primary" />
            <span className="font-medium">Finding best routes...</span>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-bg rounded-lg shimmer-effect"></div>
            ))}
          </div>
        </div>
      )}

      {routes.length > 0 && !loading && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Route Comparison</h3>
          <div className="space-y-3">
            {routes.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                isSelected={selectedRoute?.id === route.id}
                onSelect={() => setSelectedRoute(route)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Transaction Simulation */}
      {selectedRoute && protectionEnabled && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Transaction Simulation</h3>
            {!simulating && !simulationResult && (
              <button
                onClick={simulateTransaction}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80"
              >
                <Shield size={16} />
                Validate Transaction
              </button>
            )}
          </div>

          {simulating && (
            <div className="flex items-center gap-3 text-textMuted">
              <Loader2 size={16} className="animate-spin" />
              <span>Simulating transaction...</span>
            </div>
          )}

          {simulationResult && (
            <div className={`flex items-start gap-3 p-4 rounded-lg ${
              simulationResult.success ? 'bg-accent/10 border border-accent/20' : 'bg-danger/10 border border-danger/20'
            }`}>
              {simulationResult.success ? (
                <CheckCircle size={20} className="text-accent mt-0.5" />
              ) : (
                <AlertTriangle size={20} className="text-danger mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-medium ${simulationResult.success ? 'text-accent' : 'text-danger'}`}> 
                    {simulationResult.probability}% Success Probability
                  </span>
                </div>
                <p className="text-sm text-textMuted mb-2">{simulationResult.reason}</p>
                {simulationResult.suggestion && (
                  <p className="text-sm text-warning">💡 {simulationResult.suggestion}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Execute Button */}
      {selectedRoute && (
        <button
          onClick={executeSwap}
          disabled={protectionEnabled && simulationResult && !simulationResult.success}
          className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
            protectionEnabled && simulationResult && !simulationResult.success
              ? 'bg-danger/20 text-danger cursor-not-allowed'
              : 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-glow hover:scale-[1.02]'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Zap size={20} />
            {protectionEnabled && simulationResult && !simulationResult.success
              ? 'Transaction Likely to Fail'
              : `Swap ${amount} ${fromToken} → ${selectedRoute.outputAmount} ${toToken}`
            }
          </div>
        </button>
      )}
    </div>
  );
};

export default SwapInterface;