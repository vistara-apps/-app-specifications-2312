import React from 'react';
import { Shield, Zap } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b border-border bg-surface/50 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                <Zap size={10} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold">SwapGuard</h1>
              <p className="text-xs text-textMuted">Solana's smartest DEX companion</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-textMuted">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>Live on Solana</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;