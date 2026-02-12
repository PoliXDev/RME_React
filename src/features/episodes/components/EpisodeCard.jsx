import { useNavigate } from 'react-router-dom';
import { FavoriteButton } from '../../../components/shared/FavoriteButton.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { useClickSound } from '../../../hooks/useClickSound.js';
import { formatEpisodeCode, formatAirDate } from '../../../utils/formatters.js';
import { cn } from '../../../utils/cn.js';

export function EpisodeCard({ episode, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();
  const playClickSound = useClickSound();

  const handleClick = () => {
    playClickSound();
    navigate(`/episodes/${episode.id}`);
  };

  return (
    <article
      className={cn(
        'bg-card-gray/80 backdrop-blur-sm border-2 border-portal-green/20 rounded-xl',
        'overflow-hidden transition-all duration-300 cursor-pointer',
        'hover:translate-y-[-8px] hover:shadow-neon',
        'hover:border-portal-green/50 hover:bg-card-gray',
        'flex flex-col'
      )}
      onClick={handleClick}
    >
      <div className="p-4 bg-gradient-to-r from-portal-green/10 to-transparent">
        <div className="flex gap-4 items-center">
          <div className="bg-card-gray text-portal-green px-4 py-2 rounded-lg font-mono font-bold text-sm min-w-[80px] text-center border border-portal-green/40 shadow-[0_0_8px_rgba(151,206,76,0.2)]">
            {episode.episode}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{episode.name}</h3>
            <p className="text-sm text-gray-400">{formatEpisodeCode(episode.episode)}</p>
          </div>
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={() => onToggleFavorite(episode.id)}
            ariaLabel={`${isFavorite ? 'Quitar' : 'Añadir'} episodio ${episode.name} de favoritos`}
          />
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">📅 Fecha de emisión:</span>
          <span className="text-white font-medium">{formatAirDate(episode.air_date)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">👥 Personajes:</span>
          <span className="text-white font-medium">{episode.characters.length}</span>
        </div>
      </div>

      <div className="p-4 border-t border-portal-green/20">
        <Button variant="ghost" size="sm" className="w-full flex justify-center">
          Ver detalle →
        </Button>
      </div>
    </article>
  );
}
