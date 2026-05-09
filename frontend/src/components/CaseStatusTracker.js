import React from 'react';
import { CheckCircleIcon, ClockIcon, MagnifyingGlassIcon, HeartIcon } from '@heroicons/react/24/outline';

const steps = [
  { id: 1, label: 'Submitted', labelHi: 'जमा किया', labelPa: 'ਜਮ੍ਹਾਂ ਕੀਤਾ', icon: CheckCircleIcon, color: '#2E7D9C' },
  { id: 2, label: 'Under Review', labelHi: 'समीक्षाधीन', labelPa: 'ਸਮੀਖਿਆ ਅਧੀਨ', icon: ClockIcon, color: '#F59E0B' },
  { id: 3, label: 'Matched', labelHi: 'मिलान हुआ', labelPa: 'ਮੇਲ ਖਾਧਾ', icon: MagnifyingGlassIcon, color: '#8B5CF6' },
  { id: 4, label: 'Resolved', labelHi: 'हल हुआ', labelPa: 'ਹੱਲ ਹੋਇਆ', icon: HeartIcon, color: '#27AE60' },
];

const CaseStatusTracker = ({ currentStep = 0, lang = 'en' }) => {
  const getLabel = (step) => {
    if (lang === 'hi') return step.labelHi;
    if (lang === 'pa') return step.labelPa;
    return step.label;
  };

  return (
    <div className="case-status-tracker" aria-label="Case Status Tracker">
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
                    backgroundColor: isCompleted || isActive ? step.color : '#E2E8F0',
                    color: isCompleted || isActive ? '#fff' : '#94A3B8',
                    boxShadow: isActive ? `0 0 0 4px ${step.color}33` : 'none',
                  }}
                >
                  <Icon style={{ width: '1.1rem', height: '1.1rem' }} aria-hidden="true" />
                </div>
                <span
                  className="status-label"
                  style={{ color: isCompleted || isActive ? step.color : '#94A3B8', fontWeight: isActive ? 700 : 500 }}
                >
                  {getLabel(step)}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className="status-connector"
                  style={{ backgroundColor: index < currentStep ? '#2E7D9C' : '#E2E8F0' }}
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
