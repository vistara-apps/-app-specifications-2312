import React, { useState, useEffect } from 'react';
import { TrendingUp, Eye, Users, DollarSign, Zap, RefreshCw } from 'lucide-react';
import RiskBadge from './RiskBadge';

const TrendingFeed = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedToken, setSelectedToken] = useState(null);

  const mockTrendingTokens = [
    {
      id: 1,
      name: 'Bonk',
      symbol: 'BONK',
      price: '$0.000012',
      change24h: '+78.5%',
      volume24h: '$45.2M',
      marketCap: '$847M',
      holders: '125,432',
      riskScore: 85,
      logo: '🐕',
      isPositive: true,
      volumeSurge: '+234%'
    },
    {
      id: 2,
      name: 'Solana Name Service',
      symbol: 'FIDA',
      price: '$0.234',
      change24h: '+45.2%',
      volume24h: '$12.8M',
      marketCap: '$23.4M',
      holders: '8,921',
      riskScore: 92,
      logo: '🏷️',
      isPositive: true,
      volumeSurge: '+156%'
    },
    {
      id: 3,
      name: 'Serum',
      symbol: 'SRM',
      price: '$0.089',
      change24h: '+32.1%',
      volume24h: '$8.9M',
      marketCap: '$89.2M',
      holders: '15,678',
      riskScore: 88,
      logo: '🧬',
      isPositive: true,
      volumeSurge: '+89%'
    },
    {
      id: 4,
      name: 'Raydium',
      symbol: 'RAY',
      price: '$1.23',
      change24h: '+28.7%',
      volume24h: '$34.5M',
      marketCap: '$234M',
      holders: '45,123',
      riskScore: 95,
      logo: '⚡',
      isPositive: true,
      volumeSurge: '+67%'
    },
    {
      id: 5,
      name: 'Unknown Token',
      symbol: 'SCAM',
      price: '$0.00001',
      change24h: '+156.3%',
      volume24h: '$234K',
      marketCap: '$12K',
      holders: '23',
      riskScore: 15,
      logo: '❓',
      isPositive: true,
      volumeSurge: '+1200%'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTokens(mockTrendingTokens);
      setLoading(false);
    }, 1500);
  }, []);

  const refreshFeed = () => {
    setLoading(true);
    setTimeout(() => {
      // Shuffle and update prices slightly
      const updatedTokens = mockTrendingTokens.map(token => ({
        ...token,
        change24h: token.isPositive 
          ? `+${(Math.random() * 100 + 20).toFixed(1)}%`
          : `-${(Math.random() * 20 + 5).toFixed(1)}%`
      }));
      setTokens(updatedTokens);
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Trending Tokens</h2>
          <RefreshCw size={20} className="animate-spin text-primary" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 bg-surface rounded-lg shimmer-effect"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Trending Tokens</h2>
          <p className="text-sm text-textMuted">Discover tokens with high volume surge</p>
        </div>
        <button
          onClick={refreshFeed}
          className="flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-lg hover:bg-surfaceHover transition-colors"
        >
          <RefreshCw size={16} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Trending List */}
      <div className="space-y-3">
        {tokens.map((token, index) => (
          <div
            key={token.id}
            className={`bg-surface border border-border rounded-lg p-4 hover:bg-surfaceHover transition-all duration-200 cursor-pointer ${
              selectedToken?.id === token.id ? 'border-primary' : ''
            }`}
            onClick={() => setSelectedToken(selectedToken?.id === token.id ? null : token)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-textMuted">#{index + 1}</span>
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-lg">
                    {token.logo}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{token.name}</span>
                    <span className="text-sm text-textMuted">{token.symbol}</span>
                    <RiskBadge score={token.riskScore} size="small" />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-textMuted">
                    <span>Volume surge: {token.volumeSurge}</span>
                    <span>{token.holders} holders</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-medium">{token.price}</div>
                <div className={`text-sm font-medium ${
                  token.isPositive ? 'text-accent' : 'text-danger'
                }`}>
                  {token.change24h}
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedToken?.id === token.id && (
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-textMuted">24h Volume</div>
                    <div className="font-medium">{token.volume24h}</div>
                  </div>
                  <div>
                    <div className="text-xs text-textMuted">Market Cap</div>
                    <div className="font-medium">{token.marketCap}</div>
                  </div>
                  <div>
                    <div className="text-xs text-textMuted">Holders</div>
                    <div className="font-medium">{token.holders}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors">
                    <Eye size={14} />
                    Scan for Risks
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg text-sm font-medium transition-colors">
                    <Zap size={14} />
                    Quick Swap
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="font-semibold mb-4">Market Overview</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">+67%</div>
            <div className="text-xs text-textMuted">Avg. 24h Change</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">$101M</div>
            <div className="text-xs text-textMuted">Total Volume</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">23</div>
            <div className="text-xs text-textMuted">New Tokens</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text">89%</div>
            <div className="text-xs text-textMuted">Safe Tokens</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingFeed;