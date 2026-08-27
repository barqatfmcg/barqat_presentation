import React from 'react';

type CriteriaCalloutProps = {
  step: number;
  title?: string;
  text: string;
};

export const CriteriaCallout: React.FC<CriteriaCalloutProps> = ({ step, title, text }) => {
  return (
    <div className="criteria-container">
      <div className="criteria-card">
        <div className="criteria-header">
          <span className="criteria-badge">PRINCIPLE {step}</span>
          <span className="criteria-glow"></span>
        </div>
        {title && <h3 className="criteria-title">{title}</h3>}
        <p className="criteria-text">{text}</p>
      </div>

      <style>{`
        .criteria-container {
          position: absolute;
          top: 88px;
          left: 24px;
          z-index: 100;
          pointer-events: none;
          max-width: 320px;
          width: 90%;
        }

        .criteria-card {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 20px;
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: slide-in-left 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: auto;
        }

        .criteria-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .criteria-badge {
          font-size: 10px;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--primary-green-glow);
          padding: 3px 8px;
          border-radius: 12px;
          letter-spacing: 1px;
        }

        .criteria-glow {
          width: 8px;
          height: 8px;
          background: var(--primary-green);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--primary-green);
          animation: pulse-ring 2s infinite ease-in-out;
        }

        .criteria-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--charcoal);
        }

        .criteria-text {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.4;
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 640px) {
          .criteria-container {
            top: auto;
            bottom: 108px;
            left: 12px;
            width: calc(100% - 24px);
            max-width: none;
          }
          .criteria-card {
            padding: 14px;
            border-radius: 12px;
          }
          .criteria-title {
            font-size: 14px;
          }
          .criteria-text {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};
