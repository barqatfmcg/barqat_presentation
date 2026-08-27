export type Beat = {
  id: string;                    // stable, matches VO filename beat_<id>.mp3
  startTime: number;             // seconds, derived from cumulative VO durations
  duration: number;              // seconds
  camera?: {
    position: [number, number, number];
    lookAt: [number, number, number];
  };
  visualAction?: {
    type: "highlightRoute" | "revealNodes" | "drawCircle" | "flowParticles"
        | "moveRider" | "showLogo" | "dimMap" | "restoreMap" | "expansionZoom";
    payload?: Record<string, any>; // e.g. { nodeIds: [...] } or { radiusKm: 1 }
  };
  overlay?: {
    component: "CriteriaCallout" | "BenefitCards" | "Checklist"
             | "VideoTrigger" | "TitleCard" | "SubtitleBar";
    props?: Record<string, any>;
  };
  voiceover: {
    file: string;
    subtitleUrdu: string;
    subtitleEnglish?: string;
  };
  pausesTimeline?: boolean;      // true for video_1_trigger / video_2_trigger
};

export type DistributorNode = {
  id: string;
  label: string;
  position: [number, number, number];
  routeSelected?: boolean;
};
