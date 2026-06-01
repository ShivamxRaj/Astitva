import React from 'react';
import { CheckCircleIcon, ClockIcon, MagnifyingGlassIcon, HeartIcon } from '@heroicons/react/24/outline';

const steps = [
  { id: 1, label: 'Submitted', labelHi: 'जमा किया', labelPa: 'ਜਮ੍ਹਾਂ ਕੀਤਾ', icon: CheckCircleIcon, color: '#2E7D9C' },
  { id: 2, label: 'Under Review', labelHi: 'समीक्षाधीन', labelPa: 'ਸਮੀਖਿਆ ਅਧੀਨ', icon: ClockIcon, color: '#D97706' },
  { id: 3, label: 'Matched', labelHi: 'मिलान हुआ', labelPa: 'ਮੇਲ ਖਾਧਾ', icon: MagnifyingGlassIcon, color: '#7C3AED' },
  { id: 4, label: 'Resolved', labelHi: 'हल हुआ', labelPa: 'ਹੱਲ ਹੋਇਆ', icon: HeartIcon, color: '#059669' },
];

const CaseStatusTracker = ({ currentStep = 0, lang = 'en' }) => {
  const getLabel = (step) => {
    if (lang === 'hi') return step.labelHi;
    if (lang === 'pa') return step.labelPa;
    return step.label;
  };

  return (
    <div 
      className="case-status-tracker rounded-2xl p-6 my-6 transition-all duration-300" 
      aria-label="Case Status Tracker"
      style={{
        background: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(27, 58, 107, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(27, 58, 107, 0.05)'
      }}
    >
      <div className="status-track-inner">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          return (
            <React.Fragment key={step.id}>
              <div
                className={`status-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <div
                  className="status-icon"
                  style={{
                    backgroundColor: isCompleted || isActive ? step.color : 'rgba(27, 58, 107, 0.05)',
                    color: isCompleted || isActive ? '#FFFFFF' : 'rgba(27, 58, 107, 0.4)',
                    boxShadow: isActive ? `0 0 12px ${step.color}40` : 'none',
                    border: isCompleted || isActive ? 'none' : '1px solid rgba(27, 58, 107, 0.15)',
                  }}
                >
                  <Icon style={{ width: '1.1rem', height: '1.1rem' }} aria-hidden="true" />
                </div>
                <span
                  className="status-label mt-1"
                  style={{ color: isCompleted || isActive ? '#1B3A6B' : 'rgba(27, 58, 107, 0.5)', fontWeight: isActive ? 700 : 500 }}
                >
                  {getLabel(step)}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className="status-connector"
                  style={{ backgroundColor: index < currentStep ? '#2E7D9C' : 'rgba(27, 58, 107, 0.15)' }}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CaseStatusTracker;
