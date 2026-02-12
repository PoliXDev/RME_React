import { useRef, useEffect, useCallback } from 'react';
import { assetUrl } from '../utils/assets.js';

export function useClickSound() {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(assetUrl('assets/clic.mp3'));
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
