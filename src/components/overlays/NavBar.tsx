import React from 'react';
import barqatLogo from '../../assets/barqat_logo.png';

type NavBarProps = {
  playing: boolean;
  onPlayPause: () => void;
  currentTime: number;
  duration: number;
  onScrub: (time: number) => void;
  beatTitle: string;
  onNextBeat: () => void;
  onPrevBeat: () => void;
  isBeatPaused: boolean; // paused due to video modal
};

export const NavBar: React.FC<NavBarProps> = ({
  playing,
  onPlayPause,
  currentTime,
  duration,
  onScrub,
  beatTitle,
  onNextBeat,
  onPrevBeat,
  isBeatPaused
}) => {
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onScrub(parseFloat(e.target.value));
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <img src={barqatLogo} alt="Barqat Logo" className="brand-logo-img" />
          <span className="brand-pill">B2B2C</span>
        </div>

        <div className="navbar-center">
          <span className="navbar-center-title">Barqat B2B2C Execution plan</span>
          <span className="beat-title-display">{beatTitle}</span>
        </div>

        <div className="navbar-controls">
          <button 
            onClick={onPrevBeat} 
            className="rehearsal-btn" 
            title="Previous Beat"
            aria-label="Previous Beat"
          >
            ⏮
          </button>
          
          <button
            onClick={onPlayPause}
            className={`play-btn ${!playing ? 'pulse' : ''} ${isBeatPaused ? 'disabled' : ''}`}
            disabled={isBeatPaused}
            title={playing ? "Pause" : "Play"}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? "⏸" : "▶"}
          </button>

          <button 
            onClick={onNextBeat} 
            className="rehearsal-btn" 
            title="Next Beat"
            aria-label="Next Beat"
          >
            ⏭
          </button>

          <span className="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>

      <div className="timeline-bar-container">
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.1}
          value={currentTime}
          onChange={handleSliderChange}
          className="timeline-slider"
          aria-label="Timeline progress"
        />
        <div 
          className="timeline-progress-fill" 
          style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
        />
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: var(--white-translucent);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-gray);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
        }
        
        .navbar-content {
          height: 64px;
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .brand-logo-img {
          height: 28px;
          object-fit: contain;
        }

        .brand-pill {
          background: var(--primary-green-glow);
          color: var(--primary-green);
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 20px;
          letter-spacing: 0.5px;
        }

        .navbar-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .navbar-center-title {
          font-weight: 700;
          font-size: 15px;
          color: var(--charcoal);
          letter-spacing: -0.2px;
        }

        .beat-title-display {
          font-size: 11px;
          font-weight: 500;
          color: #6b7280;
        }

        .navbar-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .play-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--primary-green);
          border: none;
          color: white;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 6px rgba(0, 177, 79, 0.2);
        }

        .play-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 6px 12px rgba(0, 177, 79, 0.3);
        }

        .play-btn.disabled {
          background: #9ca3af;
          box-shadow: none;
          cursor: not-allowed;
        }

        .rehearsal-btn {
          background: none;
          border: none;
          font-size: 16px;
          cursor: pointer;
          color: #4b5563;
          padding: 6px;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .rehearsal-btn:hover {
          background: var(--light-gray);
          color: var(--charcoal);
        }

        .time-display {
          font-size: 13px;
          font-weight: 500;
          color: #4b5563;
          min-width: 90px;
          text-align: right;
        }

        .timeline-bar-container {
          position: relative;
          width: 100%;
          height: 4px;
          background: #e5e7eb;
          cursor: pointer;
        }

        .timeline-slider {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          z-index: 10;
          cursor: pointer;
          margin: 0;
        }

        .timeline-progress-fill {
          height: 100%;
          background: var(--primary-green);
          width: 0%;
          transition: width 0.1s linear;
        }

        .timeline-bar-container:hover .timeline-progress-fill {
          background: #008f3f;
        }
      `}</style>
    </nav>
  );
};
