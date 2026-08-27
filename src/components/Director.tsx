import React, { useState, useEffect, useRef } from 'react';
import type { Beat } from '../types/scene';

type DirectorProps = {
  beats: Beat[];
  onBeatChange: (beat: Beat, index: number) => void;
  onTimeUpdate: (time: number, duration: number) => void;
  onPlayingStateChange: (playing: boolean) => void;
  activeBeatIndex: number;
  setActiveBeatIndex: React.Dispatch<React.SetStateAction<number>>;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  videoModalOpen: boolean;
};

export const Director: React.FC<DirectorProps> = ({
  beats,
  onBeatChange,
  onTimeUpdate,
  onPlayingStateChange,
  activeBeatIndex,
  setActiveBeatIndex,
  playing,
  setPlaying,
  setCurrentTime,
  videoModalOpen
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const [useSimulation, setUseSimulation] = useState(false);
  
  const currentBeat = beats[activeBeatIndex];
  
  // Total presentation duration calculation
  const totalDuration = beats.reduce((acc, b) => acc + b.duration, 0);

  // Synchronize playing state
  useEffect(() => {
    onPlayingStateChange(playing);
  }, [playing, onPlayingStateChange]);

  // Audio loading logic for the active beat
  useEffect(() => {
    if (videoModalOpen) {
      // Pause if a video modal is open
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      stopSimulationTimer();
      return;
    }

    if (!playing) {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      stopSimulationTimer();
      return;
    }

    // Prepare audio URL
    // Convert beat id to VO filename matching structure
    const filename = currentBeat.voiceover.file;
    const audioUrl = `/audio/${filename}`;

    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setUseSimulation(false);
            stopSimulationTimer();
          })
          .catch(() => {
            // Audio file missing or autoplay blocked -> use simulator mode
            setUseSimulation(true);
            startSimulationTimer();
          });
      }
    } else {
      setUseSimulation(true);
      startSimulationTimer();
    }

    onBeatChange(currentBeat, activeBeatIndex);
  }, [activeBeatIndex, playing, videoModalOpen]);

  // Handle simulation ticker
  const startSimulationTimer = () => {
    stopSimulationTimer();
    
    // Track local simulation elapsed time
    let elapsed = 0;
    const intervalMs = 100; // tick every 100ms
    
    timerRef.current = window.setInterval(() => {
      elapsed += intervalMs / 1000;
      
      // Update current timeline position
      const globalTime = currentBeat.startTime + elapsed;
      setCurrentTime(globalTime);
      onTimeUpdate(globalTime, totalDuration);

      if (elapsed >= currentBeat.duration) {
        // Beat completed -> Advance
        stopSimulationTimer();
        advanceBeat();
      }
    }, intervalMs);
  };

  const stopSimulationTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Move forward in script
  const advanceBeat = () => {
    if (activeBeatIndex < beats.length - 1) {
      const nextIdx = activeBeatIndex + 1;
      const nextBeat = beats[nextIdx];

      if (nextBeat.pausesTimeline) {
        // Pauses at video triggers
        setActiveBeatIndex(nextIdx);
        setPlaying(false);
        setCurrentTime(nextBeat.startTime);
        onTimeUpdate(nextBeat.startTime, totalDuration);
      } else {
        setActiveBeatIndex(nextIdx);
        setCurrentTime(nextBeat.startTime);
        onTimeUpdate(nextBeat.startTime, totalDuration);
      }
    } else {
      // Completed full presentation
      setPlaying(false);
      setActiveBeatIndex(0);
      setCurrentTime(0);
      onTimeUpdate(0, totalDuration);
    }
  };

  // Clean timers on unmount
  useEffect(() => {
    return () => {
      stopSimulationTimer();
    };
  }, [activeBeatIndex]);

  // HTML Audio listeners
  const handleAudioTimeUpdate = () => {
    if (useSimulation || !audioRef.current) return;
    const localTime = audioRef.current.currentTime;
    const globalTime = currentBeat.startTime + localTime;
    setCurrentTime(globalTime);
    onTimeUpdate(globalTime, totalDuration);
  };

  const handleAudioLoadedMetadata = () => {
    if (!audioRef.current) return;
  };

  const handleAudioEnded = () => {
    if (useSimulation) return;
    advanceBeat();
  };

  const handleAudioError = () => {
    // Falls back to simulator if audio fails to load
    setUseSimulation(true);
    if (playing && !videoModalOpen) {
      startSimulationTimer();
    }
  };

  return (
    <div style={{ display: 'none' }}>
      <audio
        ref={(el) => {
          audioRef.current = el;
        }}
        onTimeUpdate={handleAudioTimeUpdate}
        onLoadedMetadata={handleAudioLoadedMetadata}
        onEnded={handleAudioEnded}
        onError={handleAudioError}
      />
    </div>
  );
};
