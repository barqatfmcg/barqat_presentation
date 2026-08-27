import React from 'react';

type SubtitleBarProps = {
  subtitleUrdu: string;
  subtitleEnglish?: string;
};

export const SubtitleBar: React.FC<SubtitleBarProps> = ({ subtitleUrdu, subtitleEnglish }) => {
  return (
    <div className="subtitle-container">
      <div className="subtitle-card">
        <p className="subtitle-urdu">{subtitleUrdu}</p>
        {subtitleEnglish && <p className="subtitle-english">{subtitleEnglish}</p>}
      </div>

      <style>{`
        .subtitle-container {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 800px;
          z-index: 100;
          pointer-events: none;
          display: flex;
          justify-content: center;
        }

        .subtitle-card {
          background: rgba(31, 41, 55, 0.9);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          padding: 16px 32px;
          text-align: center;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          gap: 6px;
          pointer-events: auto;
          width: 100%;
        }

        .subtitle-urdu {
          font-family: var(--font-urdu);
          font-size: 20px;
          line-height: 1.8;
          color: var(--maize-yellow);
          font-weight: 600;
          direction: rtl;
        }

        .subtitle-english {
          font-family: var(--font-english);
          font-size: 14px;
          line-height: 1.4;
          color: #e5e7eb;
          font-weight: 400;
        }

        @media (max-width: 640px) {
          .subtitle-card {
            padding: 10px 20px;
          }
          .subtitle-urdu {
            font-size: 16px;
            line-height: 1.6;
          }
          .subtitle-english {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};
