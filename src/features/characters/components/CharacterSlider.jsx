import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FavoriteButton } from '../../../components/shared/FavoriteButton.jsx';
import { translateStatus } from '../../../utils/translations.js';
import { useTilt } from '../hooks/useTilt.js';
import './CharacterSlider.css';

const wrap = (n, max) => {
  if (max <= 0) return 0;
  return ((n % max) + max) % max;
};

const PORTAL_JUMP_OFFSET = 80;
const PORTAL_JUMP_DURATION = 0.4;

export function CharacterSlider({
  characters,
  favoriteCharacters = [],
  onToggleFavorite,
  hasMore = false,
  onLoadMore,
  loadingMore = false,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSlideRef = useRef(null);
  const directionRef = useRef(1);
  const clickSoundRef = useRef(null);
  const touchStartX = useRef(0);
  const SWIPE_THRESHOLD = 50;

  useEffect(() => {
    clickSoundRef.current = new Audio('/assets/clic.mp3');
    return () => { clickSoundRef.current = null; };
  }, []);

  const playClickSound = useCallback(() => {
    try { clickSoundRef.current?.play(); } catch (_) {}
  }, []);

  const count = characters.length;
  const prevIndex = wrap(currentIndex - 1, count);
  const nextIndex = wrap(currentIndex + 1, count);

  useTilt(currentSlideRef, count > 0, currentIndex);

  useEffect(() => {
    if (count > 0 && currentIndex >= count - 2 && hasMore && onLoadMore && !loadingMore) {
      onLoadMore();
    }
  }, [currentIndex, count, hasMore, onLoadMore, loadingMore]);

  const goPrev = useCallback(() => {
    directionRef.current = -1;
    setCurrentIndex((i) => wrap(i - 1, count));
  }, [count]);

  const goNext = useCallback(() => {
    directionRef.current = 1;
    setCurrentIndex((i) => wrap(i + 1, count));
  }, [count]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    },
    [goPrev, goNext]
  );

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      const endX = e.changedTouches[0].clientX;
      const delta = touchStartX.current - endX;
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      playClickSound();
      if (delta > 0) goNext();
      else goPrev();
    },
    [goPrev, goNext, playClickSound]
  );

  if (count === 0) return null;

  const indices = [
    { index: prevIndex, role: 'previous' },
    { index: currentIndex, role: 'current' },
    { index: nextIndex, role: 'next' },
  ];

  return (
    <div
      className="character-slider flex flex-col items-center gap-6 pt-1 pb-8"
      role="region"
      aria-label="Carrusel de personajes"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        className="character-slider__viewport w-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="character-slider__spacer" aria-hidden="true" />
        <div className="character-slider__carousel">
        <div className="character-slider__center-area">
          <div className="character-slider__portal-wrap">
            <img
              src="/assets/rick_and_morty.svg"
              alt=""
              className="character-slider__back-image"
              aria-hidden="true"
            />
          </div>
          <div className="character-slider__slides-wrapper relative">
            <div className="character-slider__slides">
              {indices.map(({ index, role }) => {
              const char = characters[index];
              if (!char) return null;
              const isCurrent = role === 'current';
              const handleSlideClick = () => {
                playClickSound();
                if (role === 'previous') goPrev();
                if (role === 'next') goNext();
              };
              const slideContent = (
                <div
                  className="character-slider__slide-inner"
                  data-tilt-inner
                >
                  <div className="character-slider__slide-image-wrap">
                    <img
                      src={char.image}
                      alt=""
                      className="character-slider__slide-image"
                      data-tilt-image
                      loading="lazy"
                    />
                  </div>
                </div>
              );

              return (
                <div
                  key={`slide-${char.id}-${role}`}
                  ref={isCurrent ? currentSlideRef : null}
                  className="character-slider__slide"
                  data-current={isCurrent ? true : undefined}
                  data-previous={role === 'previous' ? true : undefined}
                  data-next={role === 'next' ? true : undefined}
                  aria-current={isCurrent ? 'true' : undefined}
                  onClick={!isCurrent ? handleSlideClick : undefined}
                  onKeyDown={(e) => {
                    if (!isCurrent && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleSlideClick();
                    }
                  }}
                  role={!isCurrent ? 'button' : undefined}
                  tabIndex={!isCurrent ? 0 : undefined}
                  aria-label={!isCurrent ? (role === 'previous' ? 'Ver personaje anterior' : 'Ver siguiente personaje') : undefined}
                >
                  {isCurrent ? (
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={char.id}
                        className="character-slider__portal-jump-wrap"
                        initial={{
                          x: PORTAL_JUMP_OFFSET * directionRef.current,
                          opacity: 0,
                          scale: 0.92,
                          filter: 'blur(8px)',
                        }}
                        animate={{
                          x: 0,
                          opacity: 1,
                          scale: 1,
                          filter: 'blur(0px)',
                        }}
                        exit={{
                          x: -PORTAL_JUMP_OFFSET * directionRef.current,
                          opacity: 0,
                          scale: 0.92,
                          filter: 'blur(8px)',
                        }}
                        transition={{
                          duration: PORTAL_JUMP_DURATION,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      >
                        {slideContent}
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    slideContent
                  )}
                </div>
              );
              })}
            </div>
          </div>
        </div>
        </div>

        <aside
          className="character-slider__info-panel"
          aria-label="Datos del personaje seleccionado"
        >
          <AnimatePresence mode="wait">
            {(() => {
              const char = characters[currentIndex];
              if (!char) return null;
              const isFavorite = favoriteCharacters.includes(char.id);
              const lines = [
                { key: 'name', className: 'character-slider__info-title', text: char.name },
                {
                  key: 'subtitle',
                  className: 'character-slider__info-subtitle',
                  text: char.location?.name || translateStatus(char.status),
                },
                {
                  key: 'desc',
                  className: 'character-slider__info-desc',
                  text: char.origin?.name || char.species || '—',
                },
              ];
              return (
                <motion.div
                  key={char.id}
                  className="character-slider__info-inner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {lines.map((line, i) => (
                    <motion.div
                      key={line.key}
                      className={`character-slider__info-text ${line.className}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.08 * i,
                        ease: 'easeOut',
                      }}
                    >
                      <span>{line.text}</span>
                    </motion.div>
                  ))}
                  <div className="character-slider__info-specs">
                    <div className="character-slider__info-row">
                      <span className="character-slider__info-label">STATUS</span>
                      <span className="character-slider__info-value">{translateStatus(char.status)}</span>
                    </div>
                    <div className="character-slider__info-row">
                      <span className="character-slider__info-label">ESPECIE</span>
                      <span className="character-slider__info-value">{char.species}</span>
                    </div>
                    <div className="character-slider__info-row">
                      <span className="character-slider__info-label">LOC</span>
                      <span className="character-slider__info-value truncate">{char.location?.name || '—'}</span>
                    </div>
                    <div className="character-slider__info-row">
                      <span className="character-slider__info-label">ORIGIN</span>
                      <span className="character-slider__info-value truncate">{char.origin?.name || '—'}</span>
                    </div>
                  </div>
                  <motion.div
                    className="character-slider__info-actions"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.08 * (lines.length + 1), ease: 'easeOut' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FavoriteButton
                      isFavorite={isFavorite}
                      onToggle={() => onToggleFavorite(char.id)}
                      ariaLabel={`${isFavorite ? 'Quitar' : 'Añadir'} ${char.name} de favoritos`}
                    />
                  </motion.div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </aside>
      </div>

      <p className="font-mono text-sm text-gray-400" aria-live="polite">
        {currentIndex + 1} / {count}
      </p>
    </div>
  );
}
