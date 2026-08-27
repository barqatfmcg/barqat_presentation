import React, { useRef, useState, useEffect } from 'react';

type VideoModalProps = {
  videoUrl: string;
  onClose: () => void;
};

export const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // Attempt play on mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked or load failed
      });
    }
  }, [videoUrl]);

  const handleVideoEnded = () => {
    onClose();
  };

  const handleFallbackComplete = () => {
    onClose();
  };

  return (
    <div className="video-modal-backdrop">
      <div className="video-modal-content">
        <button className="video-modal-close" onClick={onClose} aria-label="Close Video">
          ✕
        </button>

        {!loadError ? (
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            autoPlay
            onEnded={handleVideoEnded}
            onError={() => setLoadError(true)}
            className="video-element"
          />
        ) : (
          <div className="video-fallback-container">
            <div className="fallback-header">
              <span className="fallback-logo">🎤 Barqat Demo</span>
              <h3>Video Asset Missing</h3>
            </div>
            <p className="fallback-text">
              Playing mock demo video: <code>{videoUrl}</code>
            </p>
            <div className="fallback-visualizer">
              <div className="bar bar1"></div>
              <div className="bar bar2"></div>
              <div className="bar bar3"></div>
              <div className="bar bar4"></div>
            </div>
            <button className="fallback-done-btn" onClick={handleFallbackComplete}>
              Continue Presentation
            </button>
          </div>
        )}
      </div>

      <style>{`
        .video-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fade-in 0.3s ease forwards;
        }

        .video-modal-content {
          position: relative;
          width: 85%;
          max-width: 800px;
          aspect-ratio: 16/9;
          background: #000;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          overflow: hidden;
        }

        .video-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          border: none;
          color: white;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2010;
          transition: all 0.2s;
        }

        .video-modal-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }

        .video-element {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .video-fallback-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1e293b, #0f172a);
          color: white;
          padding: 24px;
          gap: 16px;
          text-align: center;
        }

        .fallback-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .fallback-logo {
          font-size: 12px;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .fallback-text {
          font-size: 14px;
          color: #94a3b8;
        }

        .fallback-visualizer {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          height: 60px;
          margin: 10px 0;
        }

        .bar {
          width: 8px;
          background: var(--primary-green);
          border-radius: 4px;
          animation: wave 1.2s ease-in-out infinite alternate;
        }

        .bar1 { height: 20px; animation-delay: 0.1s; }
        .bar2 { height: 50px; animation-delay: 0.3s; }
        .bar3 { height: 35px; animation-delay: 0.2s; }
        .bar4 { height: 15px; animation-delay: 0.4s; }

        .fallback-done-btn {
          background: var(--primary-green);
          border: none;
          color: white;
          font-weight: 600;
          padding: 10px 24px;
          border-radius: 20px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 177, 79, 0.3);
          transition: all 0.2s;
        }

        .fallback-done-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 177, 79, 0.4);
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes wave {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(0.3); }
        }
      `}</style>
    </div>
  );
};
