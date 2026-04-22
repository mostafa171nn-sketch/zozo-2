'use client'
import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';

interface AudioContextType {
  playMusic: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicStarted = useRef(false);

  const playMusic = () => {
    if (!musicStarted.current && audioRef.current) {
      audioRef.current.play().catch(() => {});
      musicStarted.current = true;
    }
  };

  useEffect(() => {
    audioRef.current = new Audio('/song.mp3');
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <AudioContext.Provider value={{ playMusic }}>
      <audio ref={audioRef} />
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};

