import React from 'react';

type Benefit = {
  title: string;
  desc: string;
};

type BenefitCardsProps = {
  benefits: Benefit[];
};

export const BenefitCards: React.FC<BenefitCardsProps> = ({ benefits }) => {
  return (
    <div className="benefits-container">
      <div className="benefits-grid">
        {benefits.map((b, i) => (
          <div 
            key={i} 
            className="benefit-card"
            style={{ animationDelay: `${i * 300}ms` }}
          >
            <div className="benefit-icon">
              {i === 0 && "⚡"}
              {i === 1 && "🎤"}
              {i === 2 && "🎓"}
              {i === 3 && "🚀"}
            </div>
            <h3 className="benefit-title">{b.title}</h3>
            <p className="benefit-desc">{b.desc}</p>
          </div>
        ))}
      </div>

      <style>{`
        .benefits-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          pointer-events: none;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          max-width: 680px;
          width: 90%;
          pointer-events: auto;
        }

        .benefit-card {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 24px;
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          opacity: 0;
          transform: translateY(30px);
          animation: fade-in-up-stagger 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .benefit-icon {
          font-size: 24px;
          background: var(--primary-green-glow);
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          color: var(--primary-green);
        }

        .benefit-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--charcoal);
        }

        .benefit-desc {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.5;
        }

        @keyframes fade-in-up-stagger {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 640px) {
          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 12px;
            max-height: 70vh;
            overflow-y: auto;
          }
          .benefit-card {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};
