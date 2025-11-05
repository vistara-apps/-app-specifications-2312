import React from 'react';
import { Shield, AlertTriangle, XCircle } from 'lucide-react';

const RiskBadge = ({ score, status, size = 'default' }) => {
  const getConfig = () => {
    if (score >= 70) {
      return {
        icon: Shield,
        color: 'text-accent',
        bg: 'bg-accent/20',
        border: 'border-accent/30',
        label: 'Safe'
      };
    } else if (score >= 40) {
      return {
        icon: AlertTriangle,
        color: 'text-warning',
        bg: 'bg-warning/20',
        border: 'border-warning/30',
        label: 'Risky'
      };
    } else {
      return {
        icon: XCircle,
        color: 'text-danger',
        bg: 'bg-danger/20',
        border: 'border-danger/30',
        label: 'Dangerous'
      };
    }
  };

  const config = getConfig();
  const Icon = config.icon;
  
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    default: 'px-3 py-2 text-sm',
    large: 'px-4 py-3 text-base'
  };

  const iconSizes = {
    small: 12,
    default: 16,
    large: 20
  };

  return (
    <div className={`inline-flex items-center gap-2 rounded-lg border font-medium ${config.bg} ${config.border} ${config.color} ${sizeClasses[size]}`}>
      <Icon size={iconSizes[size]} />
      <span>{config.label}</span>
      <span className="font-bold">{score}/100</span>
    </div>
  );
};

export default RiskBadge;