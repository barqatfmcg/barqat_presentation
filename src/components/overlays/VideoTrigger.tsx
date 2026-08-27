import React from 'react';

type VideoTriggerProps = {
  videoUrl: string;
  text: string;
  onClick: (url: string) => void;
};

export const VideoTrigger: React.FC<VideoTriggerProps> = ({ videoUrl, text, onClick }) => {
  return (
    <div className="video-trigger-container">
      <div className="video-trigger-card" onClick={() => onClick(videoUrl)}>
        <div className="thumbnail-placeholder">
          <div className="play-icon-overlay">▶</div>
          <div className="ripple-effect"></div>
        </div>
        <div className="video-trigger-info">
          <span className="video-trigger-tag">INTERACTIVE DEMO</span>
          <h4 className="video-trigger-text">{text}</h4>
          <span className="click-to-watch">Click to play video</span>
        </div>
      </div>

      <style>{`
        .video-trigger-container {
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

        .video-trigger-card {
          pointer-events: auto;
          background: var(--glass-bg);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 16px;
          box-shadow: var(--shadow-lg);
          display: flex;
          align-items: center;
          gap: 20px;
          cursor: pointer;
          max-width: 420px;
          width: 90%;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .video-trigger-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: var(--shadow-lg), 0 0 20px rgba(0, 177, 79, 0.15);
          border-color: rgba(0, 177, 79, 0.3);
        }

        .thumbnail-placeholder {
          width: 100px;
          height: 100px;
          border-radius: 16px;
          background: linear-gradient(135deg, #1f2937, #111827);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .play-icon-overlay {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--primary-green);
          color: white;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 3px;
          z-index: 2;
          box-shadow: 0 4px 10px rgba(0, 177, 79, 0.4);
          transition: transform 0.2s ease;
        }

        .video-trigger-card:hover .play-icon-overlay {
          transform: scale(1.1);
        }

        .ripple-effect {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          border: 2px solid var(--primary-green);
          opacity: 0.5;
          animation: pulse-ring 2s infinite ease-in-out;
        }

        .video-trigger-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex-grow: 1;
        }

        .video-trigger-tag {
          font-size: 9px;
          font-weight: 700;
          color: var(--primary-green);
          letter-spacing: 1px;
        }

        .video-trigger-text {
          font-size: 15px;
          font-weight: 700;
          color: var(--charcoal);
          line-height: 1.3;
        }

        .click-to-watch {
          font-size: 12px;
          color: #6b7280;
          font-weight: 500;
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
      `}</style>
    </div>
  );
};
