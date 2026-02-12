import { Helmet } from 'react-helmet-async';
import { useCharacters } from './hooks/useCharacters.js';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { CharacterFilters } from './components/CharacterFilters.jsx';
import { CharacterList } from './components/CharacterList.jsx';

export function CharactersPage() {
  const {
    characters,
    loading,
    error,
    filters,
    hasMore,
    loadMore,
    updateFilters,
  } = useCharacters();

  const { favoriteCharacters, toggleCharacter } = useFavorites();

  return (
    <>
      <Helmet>
        <title>Personajes - Rick & Morty Explorer</title>
        <meta
          name="description"
          content="Explora todos los personajes de Rick and Morty. Busca, filtra y encuentra tus personajes favoritos del multiverso."
        />
        <meta property="og:title" content="Personajes - Rick & Morty Explorer" />
        <meta
          property="og:description"
          content="Explora todos los personajes de Rick and Morty"
        />
      </Helmet>

      <div>
        <CharacterFilters filters={filters} onFilterChange={updateFilters} />

        <CharacterList
          characters={characters}
          loading={loading}
          error={error}
          hasMore={hasMore}
          onLoadMore={loadMore}
          favoriteCharacters={favoriteCharacters}
          onToggleFavorite={toggleCharacter}
        />
      </div>
    </>
  );
}
