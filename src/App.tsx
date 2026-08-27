import { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { barqatBeats } from './data/script';
import type { Beat } from './types/scene';
import { NavBar } from './components/overlays/NavBar';
import { TitleCard } from './components/overlays/TitleCard';
import { CriteriaCallout } from './components/overlays/CriteriaCallout';
import { BenefitCards } from './components/overlays/BenefitCards';
import { Checklist } from './components/overlays/Checklist';
import { VideoTrigger } from './components/overlays/VideoTrigger';
import { VideoModal } from './components/overlays/VideoModal';
import { SubtitleBar } from './components/overlays/SubtitleBar';
import { MapScene } from './components/canvas/MapScene';
import { Director } from './components/Director';
import './App.css';

function App() {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(148); // total cumulative duration
  const [activeBeatIndex, setActiveBeatIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoModalUrl, setVideoModalUrl] = useState('');
  const [mapOpacity, setMapOpacity] = useState(1.0);

  const currentBeat = barqatBeats[activeBeatIndex];

  // Handler for beat updates from Director
  const handleBeatChange = useCallback((beat: Beat, index: number) => {
    setActiveBeatIndex(index);
    
    // Manage map opacity based on visual action (e.g., dimMap dims map behind overlays)
    if (beat.visualAction?.type === 'dimMap') {
      setMapOpacity(0.3);
    } else {
      setMapOpacity(1.0);
    }
  }, []);

  const handleTimeUpdate = useCallback((time: number, totalDur: number) => {
    setCurrentTime(time);
    setDuration(totalDur);
  }, []);

  const handlePlayPause = useCallback(() => {
    if (videoModalOpen) return; // Prevent play trigger during video modal playback
    setPlaying((prev) => !prev);
  }, [videoModalOpen]);

  // Scrubbing/Seeking logic
  const handleScrub = useCallback((time: number) => {
    setCurrentTime(time);
    
    // Find matching beat index by checking startTime ranges
    let targetIdx = 0;
    for (let i = 0; i < barqatBeats.length; i++) {
      const b = barqatBeats[i];
      if (time >= b.startTime && time < b.startTime + b.duration) {
        targetIdx = i;
        break;
      }
    }
    setActiveBeatIndex(targetIdx);
  }, []);

  // Rehearsal controls (Previous / Next Beat)
  const handlePrevBeat = useCallback(() => {
    if (activeBeatIndex > 0) {
      const prevIdx = activeBeatIndex - 1;
      setActiveBeatIndex(prevIdx);
      setCurrentTime(barqatBeats[prevIdx].startTime);
    }
  }, [activeBeatIndex]);

  const handleNextBeat = useCallback(() => {
    if (activeBeatIndex < barqatBeats.length - 1) {
      const nextIdx = activeBeatIndex + 1;
      setActiveBeatIndex(nextIdx);
      setCurrentTime(barqatBeats[nextIdx].startTime);
    }
  }, [activeBeatIndex]);

  // Video launch handlers
  const handleTriggerVideo = useCallback((url: string) => {
    setVideoModalUrl(url);
    setVideoModalOpen(true);
    setPlaying(false); // Pause main VO track
  }, []);

  const handleCloseVideo = useCallback(() => {
    setVideoModalOpen(false);
    setVideoModalUrl('');
    setPlaying(true); // Automatically resume main VO timeline
  }, []);

  // Renderer helper for DOM overlay cards
  const renderOverlay = () => {
    if (!currentBeat?.overlay) return null;

    const { component, props } = currentBeat.overlay;

    switch (component) {
      case 'TitleCard':
        return <TitleCard title={props?.title} subtitle={props?.subtitle} />;
      case 'CriteriaCallout':
        return (
          <CriteriaCallout 
            step={props?.step} 
            title={props?.title} 
            text={props?.text} 
          />
        );
      case 'BenefitCards':
        return <BenefitCards benefits={props?.benefits || []} />;
      case 'Checklist':
        return <Checklist items={props?.items || []} />;
      case 'VideoTrigger':
        return (
          <VideoTrigger 
            videoUrl={props?.videoUrl} 
            text={props?.text} 
            onClick={handleTriggerVideo} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {/* 1. Glassmorphic Navigation Header */}
      <NavBar
        playing={playing}
        onPlayPause={handlePlayPause}
        currentTime={currentTime}
        duration={duration}
        onScrub={handleScrub}
        beatTitle={`${activeBeatIndex + 1}. ${currentBeat?.id || 'Intro'}`}
        onNextBeat={handleNextBeat}
        onPrevBeat={handlePrevBeat}
        isBeatPaused={videoModalOpen}
      />

      {/* 2. WebGL Canvas Map Layer */}
      <div className="canvas-wrapper" style={{ opacity: mapOpacity, transition: 'opacity 0.5s ease' }}>
        <Canvas
          shadows
          camera={{ position: [0, 8, 8], fov: 45 }}
        >
          <MapScene 
            currentBeat={currentBeat} 
          />
        </Canvas>
      </div>

      {/* 3. Floating Interactive DOM Overlays */}
      {renderOverlay()}

      {/* 4. Subtitle Area */}
      {currentBeat && (
        <SubtitleBar
          subtitleUrdu={currentBeat.voiceover.subtitleUrdu}
          subtitleEnglish={currentBeat.voiceover.subtitleEnglish}
        />
      )}

      {/* 5. Embedded Video modal overlays */}
      {videoModalOpen && (
        <VideoModal 
          videoUrl={videoModalUrl} 
          onClose={handleCloseVideo} 
        />
      )}

      {/* 6. State Director Engine */}
      <Director
        beats={barqatBeats}
        onBeatChange={handleBeatChange}
        onTimeUpdate={handleTimeUpdate}
        onPlayingStateChange={setPlaying}
        activeBeatIndex={activeBeatIndex}
        setActiveBeatIndex={setActiveBeatIndex}
        playing={playing}
        setPlaying={setPlaying}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        videoModalOpen={videoModalOpen}
      />

      <style>{`
        .canvas-wrapper {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}

export default App;
