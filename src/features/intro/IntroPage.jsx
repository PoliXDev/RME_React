import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './IntroPage.css';

const BACKGROUND_SOUND_SRC = '/assets/background_sound.mp3';

const MIN_INTRO_DURATION = 6000;

let backgroundAudioInstance = null;

function getBackgroundAudio() {
  if (!backgroundAudioInstance) {
    backgroundAudioInstance = new Audio(BACKGROUND_SOUND_SRC);
    backgroundAudioInstance.loop = true;
    backgroundAudioInstance.volume = 0.8;
  }
  return backgroundAudioInstance;
}

function startBackgroundSound() {
  try {
    getBackgroundAudio().play().catch(() => {});
  } catch (_) {}
}

const PARTICLES = [
  { left: '10%', delay: 0 },
  { left: '22%', delay: 0.5 },
  { left: '35%', delay: 1 },
  { left: '50%', delay: 1.5 },
  { left: '62%', delay: 2 },
  { left: '75%', delay: 2.5 },
  { left: '88%', delay: 3 },
  { left: '18%', delay: 0.8 },
  { left: '82%', delay: 2.2 },
];

export function IntroPage() {
  const [showStartButton, setShowStartButton] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();
  const startTime = Date.now();

  const goToApp = useCallback(() => {
    startBackgroundSound();
    navigate('/characters');
  }, [navigate]);

  const isMobile = window.innerWidth <= 768;
  const videoSource = isMobile
    ? '/assets/rme_mobile.mp4'
    : '/assets/rme_intro_video.mp4';

  useEffect(() => {
    const elapsed = Date.now() - startTime;
    const remainingTime = Math.max(0, MIN_INTRO_DURATION - elapsed);
    const timer = setTimeout(() => {
      setShowStartButton(true);
    }, remainingTime);

    return () => clearTimeout(timer);
  }, []);

  const handleStartClick = () => {
    startBackgroundSound();
    setShowStartButton(false);
    setShowVideo(true);

    setTimeout(() => {
      const video = document.getElementById('intro-video');
      if (video) {
        video.muted = false;
        video.play().catch(() => {
          goToApp();
        });
      }
    }, 600);
  };

  const handleVideoEnd = () => {
    goToApp();
  };

  const handleVideoError = () => {
    setTimeout(goToApp, 2000);
  };

  const handleSkip = () => {
    goToApp();
  };

  if (showVideo) {
    return (
      <>
        <Helmet>
          <title>Rick & Morty Explorer - Cargando...</title>
        </Helmet>
        <div className="fixed inset-0 bg-black z-10000 flex items-center justify-center">
          <video
            id="intro-video"
            className="w-full h-full object-cover"
            src={videoSource}
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            onClick={handleSkip}
            autoPlay
            playsInline
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {showStartButton
            ? 'Rick & Morty Explorer - Bienvenido'
            : 'Rick & Morty Explorer - Cargando Multiverso...'}
        </title>
        {showStartButton && (
          <meta
            name="description"
            content="Explora el multiverso de Rick and Morty. Personajes, episodios y más."
          />
        )}
      </Helmet>
      <div
        className="fixed inset-0 bg-cover bg-center flex flex-col z-9999 overflow-hidden"
        style={{
          backgroundImage: `url(${
            isMobile ? '/assets/intro_background_mobile.jpg' : '/assets/1.jpg'
          })`,
        }}
      >
        <div className="absolute inset-0 z-1 pointer-events-none">
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="intro-particle"
              style={{
                left: p.left,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex justify-center pt-26 md:pt-39 shrink-0">
          <div className="relative flex items-center justify-center">
            <img
              src="/assets/text2.png"
              alt="Rick and Morty"
              className="intro-logo max-w-[500px] w-[85vw] h-auto relative z-10 md:max-w-[600px]"
            />
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-0">
          <div className="relative flex flex-col items-center justify-center w-full flex-1">
            <div
              className={`absolute flex flex-col items-center gap-4 -translate-y-[99px] md:translate-y-0 ${
                showStartButton ? 'intro-loader-exit' : ''
              }`}
              aria-hidden={showStartButton}
            >
              <div className="intro-loader-vial">
                <div className="intro-loader-fill" />
                <div className="intro-loader-bubbles" aria-hidden />
              </div>
              <p className="intro-loading-text font-display text-accent text-2xl md:text-3xl uppercase tracking-wide">
                Cargando Multiverso...
              </p>
            </div>

            <div
              className={`flex flex-col items-center gap-6 -translate-y-[95px] md:translate-y-0 ${
                showStartButton ? 'intro-button-enter' : 'opacity-0 pointer-events-none'
              }`}
            >
              <button
                onClick={handleStartClick}
                className="font-display px-10 py-5 text-xl md:text-2xl text-white rounded-xl border-2 border-accent/50 bg-gradient-to-r from-accent/90 to-accent-hover/90 shadow-neon hover:border-accent hover:shadow-[0_0_20px_rgba(151,206,76,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 tracking-wide focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg"
              >
                <span className="text-2xl" aria-hidden>▶</span>
                <span>Iniciar Experiencia</span>
              </button>
              <p className="font-mono text-sm uppercase tracking-wider text-white/70">Presiona para continuar</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
