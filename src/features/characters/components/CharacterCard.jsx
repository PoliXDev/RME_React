import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FavoriteButton } from '../../../components/shared/FavoriteButton.jsx';
import { useClickSound } from '../../../hooks/useClickSound.js';
import { translateStatus, translateGender } from '../../../utils/translations.js';
import { cn } from '../../../utils/cn.js';

const statusLed = {
  alive: 'bg-status-alive shadow-[0_0_8px_rgba(68,255,68,0.8)]',
  dead: 'bg-status-dead shadow-[0_0_8px_rgba(255,68,68,0.8)]',
  unknown: 'bg-status-unknown shadow-[0_0_6px_rgba(153,153,153,0.6)]',
};

export function CharacterCard({ character, isFavorite, onToggleFavorite, index = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusKey = character.status?.toLowerCase() || 'unknown';
  const ledClass = statusLed[statusKey] ?? statusLed.unknown;
  const playClickSound = useClickSound();

  const toggle = () => {
    playClickSound();
    setIsExpanded((prev) => !prev);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className={cn(
        'w-full overflow-hidden rounded-xl border-2 border-card-gray',
        'hover:border-portal-green/60 transition-colors duration-300',
        'bg-space-black'
      )}
    >
      <button
        type="button"
        onClick={toggle}
        className={cn(
          'w-full flex items-center gap-4 text-left relative overflow-hidden rounded-t-xl',
          'transition-all duration-300 ease-in-out',
          isExpanded ? 'min-h-[220px] sm:min-h-[260px]' : 'min-h-[100px] sm:min-h-[120px]'
        )}
        aria-expanded={isExpanded}
        aria-controls={`card-details-${character.id}`}
        id={`card-trigger-${character.id}`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${character.image})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-space-black/95 via-space-black/75 to-transparent"
          aria-hidden="true"
        />
        <div className="relative z-10 flex-1 flex items-center gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <span
            className={cn('shrink-0 w-3 h-3 rounded-full', ledClass)}
            aria-hidden="true"
          />
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white truncate">
            {character.name}
          </h2>
          <motion.span
            className="shrink-0 text-portal-green"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronDown className="w-6 h-6" aria-hidden="true" />
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`card-details-${character.id}`}
            role="region"
            aria-labelledby={`card-trigger-${character.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-card-gray"
          >
            <div className="bg-card-gray/95 backdrop-blur-sm px-4 py-4 sm:px-6 sm:py-5 flex flex-wrap items-start gap-x-8 gap-y-4 font-mono text-sm">
              <div className="flex items-center gap-2">
                <span className="text-portal-green/90">STATUS</span>
                <span className="text-white">{translateStatus(character.status)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-portal-green/90">ESPECIE</span>
                <span className="text-white">{character.species}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-portal-green/90">GÉNERO</span>
                <span className="text-white">{translateGender(character.gender)}</span>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-portal-green/90 shrink-0">LOC</span>
                <span className="text-white truncate">{character.location?.name || '—'}</span>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-portal-green/90 shrink-0">ORIGIN</span>
                <span className="text-white truncate">{character.origin?.name || '—'}</span>
              </div>
              <div className="ml-auto">
                <div onClick={(e) => e.stopPropagation()}>
                  <FavoriteButton
                    isFavorite={isFavorite}
                    onToggle={() => onToggleFavorite(character.id)}
                    ariaLabel={`${isFavorite ? 'Quitar' : 'Añadir'} ${character.name} de favoritos`}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
