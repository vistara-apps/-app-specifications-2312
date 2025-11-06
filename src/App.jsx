import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Header from './components/Header';
import SwapInterface from './components/SwapInterface';
import TokenScanner from './components/TokenScanner';
import TrendingFeed from './components/TrendingFeed';
import SocialShare from './components/SocialShare';
import { Shield, TrendingUp, Zap, Users } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('swap');
  const [lastSwap, setLastSwap] = useState(null);

  const tabs = [
    { id: 'swap', label: 'Swap', icon: Zap },
    { id: 'scan', label: 'Scan', icon: Shield },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'social', label: 'Social', icon: Users },
  ];

  const handleSwapComplete = (swapData) => {
    setLastSwap(swapData);
    setActiveTab('social');
  };

  return (
    <div className="min-h-screen bg-pixelBg text-pixelText">
      <Header />
      
      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-pixelBg/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex space-x-1 py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-pixelAccent text-white shadow-glow'
                      : 'text-textMuted hover:text-text hover:bg-surfaceHover'
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {activeTab === 'swap' && (
          <SwapInterface onSwapComplete={handleSwapComplete} />
        )}
        {activeTab === 'scan' && <TokenScanner />}
        {activeTab === 'trending' && <TrendingFeed />}
        {activeTab === 'social' && <SocialShare lastSwap={lastSwap} />}
      </main>

      {/* Floating Action Button for Quick Access */}
      <div className="fixed bottom-6 right-6 z-50">
        <ConnectButton.Custom>
          {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
            const ready = mounted;
            const connected = ready && account && chain;

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        onClick={openConnectModal}
                        className="bg-pixelAccent hover:bg-pixelAccent/90 text-white px-6 py-3 rounded-full font-medium shadow-glow transition-all duration-200 hover:scale-105"
                      >
                        Connect Wallet
                      </button>
                    );
                  }

                  return (
                    <div className="flex gap-2">
                      <button
                        onClick={openAccountModal}
                        className="bg-surface hover:bg-surfaceHover border border-border text-text px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                      >
                        {account.displayName}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  );
}

export default App;