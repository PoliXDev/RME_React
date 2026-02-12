import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { FavoriteButton } from '../../../components/shared/FavoriteButton.jsx';
import { formatEpisodeCode, formatAirDate } from '../../../utils/formatters.js';

export function EpisodeDetail({ episode, isFavorite, onToggleFavorite }) {
  const seasonMatch = episode.episode.match(/S(\d+)/);
  const season = seasonMatch ? parseInt(seasonMatch[1]) : null;

  return (
    <article className="max-w-4xl mx-auto">
      <Link
        to="/episodes"
        className="inline-flex items-center gap-2 text-accent hover:text-accent-hover mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" aria-hidden="true" />
        <span>Volver a episodios</span>
      </Link>

      <div className="bg-bg-secondary/70 backdrop-blur-sm border-2 border-accent/20 rounded-xl overflow-hidden shadow-xl mb-8">
        <div className="p-8 bg-gradient-to-r from-accent/10 to-transparent border-b border-accent/20">
          <div className="flex gap-6 items-start">
            <div className="bg-gradient-to-br from-accent to-accent-hover text-white px-6 py-4 rounded-xl font-bold text-xl min-w-[120px] text-center border-2 border-accent/30 shadow-lg">
              {episode.episode}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-4xl font-bold text-white">{episode.name}</h1>
                <FavoriteButton
                  isFavorite={isFavorite}
                  onToggle={onToggleFavorite}
                  size="lg"
                  ariaLabel={`${isFavorite ? 'Quitar' : 'Añadir'} episodio ${episode.name} de favoritos`}
                />
              </div>
              <p className="text-xl text-gray-400">{formatEpisodeCode(episode.episode)}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="text-sm uppercase tracking-wide text-gray-400 block mb-2">
                Código del Episodio
              </span>
              <span className="text-lg font-medium text-white">{episode.episode}</span>
            </div>

            <div>
              <span className="text-sm uppercase tracking-wide text-gray-400 block mb-2">
                Fecha de Emisión
              </span>
              <span className="text-lg font-medium text-white">
                {formatAirDate(episode.air_date)}
              </span>
            </div>

            <div>
              <span className="text-sm uppercase tracking-wide text-gray-400 block mb-2">
                Personajes
              </span>
              <span className="text-lg font-medium text-white">
                {episode.characters.length} personajes
              </span>
            </div>

            {season && (
              <div>
                <span className="text-sm uppercase tracking-wide text-gray-400 block mb-2">
                  Temporada
                </span>
                <span className="text-lg font-medium text-white">
                  Temporada {season}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
