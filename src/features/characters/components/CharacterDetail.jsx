import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { FavoriteButton } from '../../../components/shared/FavoriteButton.jsx';
import { translateStatus, translateGender } from '../../../utils/translations.js';

export function CharacterDetail({ character, isFavorite, onToggleFavorite }) {
  return (
    <article className="max-w-4xl mx-auto">
      <Link
        to="/characters"
        className="inline-flex items-center gap-2 text-accent hover:text-accent-hover mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" aria-hidden="true" />
        <span>Volver a personajes</span>
      </Link>

      <div className="bg-bg-secondary/70 backdrop-blur-sm border-2 border-gold/20 rounded-xl overflow-hidden shadow-xl">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-[400px] object-cover"
          width={800}
          height={400}
        />

        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-4xl font-bold text-white">{character.name}</h1>
            <FavoriteButton
              isFavorite={isFavorite}
              onToggle={onToggleFavorite}
              size="lg"
              ariaLabel={`${isFavorite ? 'Quitar' : 'Añadir'} ${character.name} de favoritos`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="text-sm uppercase tracking-wide text-gray-400 block mb-2">
                Estado
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    character.status.toLowerCase() === 'alive'
                      ? 'bg-status-alive'
                      : character.status.toLowerCase() === 'dead'
                      ? 'bg-status-dead'
                      : 'bg-status-unknown'
                  }`}
                  aria-hidden="true"
                />
                <span className="text-lg font-medium text-white">
                  {translateStatus(character.status)}
                </span>
              </div>
            </div>

            <div>
              <span className="text-sm uppercase tracking-wide text-gray-400 block mb-2">
                Especie
              </span>
              <span className="text-lg font-medium text-white">
                {character.species}
              </span>
            </div>

            <div>
              <span className="text-sm uppercase tracking-wide text-gray-400 block mb-2">
                Tipo
              </span>
              <span className="text-lg font-medium text-white">
                {character.type || 'N/A'}
              </span>
            </div>

            <div>
              <span className="text-sm uppercase tracking-wide text-gray-400 block mb-2">
                Género
              </span>
              <span className="text-lg font-medium text-white">
                {translateGender(character.gender)}
              </span>
            </div>

            <div>
              <span className="text-sm uppercase tracking-wide text-gray-400 block mb-2">
                Origen
              </span>
              <span className="text-lg font-medium text-white">
                {character.origin.name}
              </span>
            </div>

            <div>
              <span className="text-sm uppercase tracking-wide text-gray-400 block mb-2">
                Ubicación
              </span>
              <span className="text-lg font-medium text-white">
                {character.location.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
