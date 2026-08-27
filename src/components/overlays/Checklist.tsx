import React from 'react';

type ChecklistItem = {
  label: string;
  checked: boolean;
};

type ChecklistProps = {
  items: ChecklistItem[];
};

export const Checklist: React.FC<ChecklistProps> = ({ items }) => {
  return (
    <div className="checklist-container">
      <div className="checklist-card">
        <h3 className="checklist-header">Execution Milestones</h3>
        <div className="checklist-items">
          {items.map((item, index) => (
            <div key={index} className="checklist-item">
              <div className={`checkbox ${item.checked ? 'checked' : ''}`}>
                {item.checked && (
                  <svg 
                    className="checkmark-svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className={`checklist-label ${item.checked ? 'checked-label' : ''}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .checklist-container {
          position: absolute;
          top: 88px;
          right: 24px;
          z-index: 100;
          pointer-events: none;
          max-width: 320px;
          width: 95%;
        }

        .checklist-card {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 20px;
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
          gap: 16px;
          pointer-events: auto;
          animation: slide-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .checklist-header {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #4b5563;
          border-bottom: 1px solid var(--border-gray);
          padding-bottom: 8px;
        }

        .checklist-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .checklist-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .checkbox {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          border: 2px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
        }

        .checkbox.checked {
          border-color: var(--primary-green);
          background: var(--primary-green);
        }

        .checkmark-svg {
          width: 12px;
          height: 12px;
          color: white;
          animation: scale-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .checklist-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--charcoal);
          transition: color 0.3s;
        }

        .checklist-label.checked-label {
          color: #10b981;
          font-weight: 600;
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scale-pop {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};
