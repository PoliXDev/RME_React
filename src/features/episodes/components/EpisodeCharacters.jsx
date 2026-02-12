import { CharacterCard } from '../../characters/components/CharacterCard.jsx';
import { Loader } from '../../../components/ui/Loader.jsx';

export function EpisodeCharacters({
  characters,
  loading,
  favoriteCharacters,
  onToggleFavorite,
}) {
  if (loading) {
    return <Loader message="Cargando personajes..." />;
  }

  if (!characters || characters.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold text-portal-green mb-8">Personajes en este episodio</h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        role="list"
        aria-label="Personajes del episodio"
      >
        {characters.map((character) => (
          <div key={character.id} role="listitem">
            <CharacterCard
              character={character}
              isFavorite={favoriteCharacters.includes(character.id)}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
