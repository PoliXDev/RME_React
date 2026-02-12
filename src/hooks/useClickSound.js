import { useRef, useEffect, useCallback } from 'react';

const CLICK_SOUND_SRC = '/assets/clic.mp3';

export function useClickSound() {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(CLICK_SOUND_SRC);
    return () => {
      audioRef.current = null;
    };
  }, []);

  const playClickSound = useCallback(() => {
    try {
      audioRef.current?.play();
    } catch (_) {}
  }, []);

  return playClickSound;
}
