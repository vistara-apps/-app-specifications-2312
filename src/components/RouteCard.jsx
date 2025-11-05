import React from 'react';
import { CheckCircle, Clock, TrendingUp } from 'lucide-react';

const RouteCard = ({ route, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
        route.isBest
          ? 'gradient-border shadow-glow'
          : isSelected
          ? 'border-primary bg-primary/5'
          : 'border-border bg-surface hover:bg-surfaceHover'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-white">{route.dex[0]}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{route.dex}</span>
              {route.isBest && (
                <span className="px-2 py-1 bg-accent text-white text-xs rounded-full font-medium">
                  Best Price
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-textMuted">
              <Clock size={12} />
              <span>{route.estimatedTime}</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-lg font-semibold">{route.outputAmount} USDC</div>
          <div className="text-xs text-textMuted">≈ ${route.outputAmount}</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <TrendingUp size={14} className="text-textMuted" />
            <span className="text-textMuted">Impact: {route.priceImpact}</span>
          </div>
          <div className="text-textMuted">Fee: {route.fee}</div>
        </div>
        
        {isSelected && (
          <CheckCircle size={16} className="text-accent" />
        )}
      </div>

      {/* Route Path */}
      <div className="mt-3 pt-3 border-t border-border/50">
        <div className="flex items-center gap-2 text-xs text-textMuted">
          <span>Route:</span>
          {route.route.map((token, index) => (
            <React.Fragment key={token}>
              <span className="px-2 py-1 bg-bg rounded text-text">{token}</span>
              {index < route.route.length - 1 && <span>→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RouteCard;