import { CharacterSlider } from './CharacterSlider.jsx';
import { Loader } from '../../../components/ui/Loader.jsx';
import { ErrorMessage } from '../../../components/ui/ErrorMessage.jsx';

export function CharacterList({
  characters,
  loading,
  error,
  hasMore,
  onLoadMore,
  favoriteCharacters,
  onToggleFavorite,
}) {
  if (loading && characters.length === 0) {
    return <Loader message="Cargando personajes..." />;
  }

  if (error) {
    return <ErrorMessage message={error} className="mb-8" />;
  }

  if (characters.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4" aria-hidden="true">
          🔍
        </div>
        <p className="text-xl text-gray-400">No se encontraron personajes</p>
      </div>
    );
  }

  return (
    <CharacterSlider
      characters={characters}
      favoriteCharacters={favoriteCharacters}
      onToggleFavorite={onToggleFavorite}
      hasMore={hasMore}
      onLoadMore={onLoadMore}
      loadingMore={loading}
    />
  );
}
