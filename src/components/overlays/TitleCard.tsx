import React from 'react';
import barqatLogo from '../../assets/barqat_logo.png';

type TitleCardProps = {
  title: string;
  subtitle?: string;
  visible?: boolean;
};

export const TitleCard: React.FC<TitleCardProps> = ({ title, subtitle, visible = true }) => {
  if (!visible) return null;

  const isBrandTitle = title.toUpperCase() === 'BARQAT';

  return (
    <div className="title-card-container">
      <div className="title-card">
        {isBrandTitle ? (
          <img src={barqatLogo} alt="Barqat Logo" className="title-logo-img" />
        ) : (
          <h1 className="title-text">{title}</h1>
        )}
        {subtitle && <p className="subtitle-text">{subtitle}</p>}
      </div>

      <style>{`
        .title-card-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 100;
        }

        .title-card {
          text-align: center;
          padding: 40px 60px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          box-shadow: var(--shadow-lg);
          max-width: 600px;
          width: 90%;
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: auto;
        }

        .title-text {
          font-size: 42px;
          font-weight: 800;
          color: var(--charcoal);
          letter-spacing: -1px;
          margin-bottom: 12px;
        }

        .subtitle-text {
          font-size: 18px;
          color: #4b5563;
          font-weight: 400;
        }

        .title-logo-img {
          height: 52px;
          object-fit: contain;
          margin-bottom: 20px;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 640px) {
          .title-card {
            padding: 24px 20px;
            border-radius: 16px;
          }
          .title-text {
            font-size: 28px;
          }
          .title-logo-img {
            height: 36px;
            margin-bottom: 12px;
          }
          .subtitle-text {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};
