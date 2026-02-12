import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const FAVORITES_CHARACTERS_KEY = 'rick-morty-favorites';
const FAVORITES_EPISODES_KEY = 'rick-morty-favorites-episodes';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favoriteCharacters, setFavoriteCharacters] = useLocalStorage(
    FAVORITES_CHARACTERS_KEY,
    []
  );
  const [favoriteEpisodes, setFavoriteEpisodes] = useLocalStorage(
    FAVORITES_EPISODES_KEY,
    []
  );

  const toggleCharacter = useCallback((id) => {
    setFavoriteCharacters((prev) => {
      if (prev.includes(id)) {
        return prev.filter((favId) => favId !== id);
      }
      return [...prev, id];
    });
  }, [setFavoriteCharacters]);

  const toggleEpisode = useCallback((id) => {
    setFavoriteEpisodes((prev) => {
      if (prev.includes(id)) {
        return prev.filter((favId) => favId !== id);
      }
      return [...prev, id];
    });
  }, [setFavoriteEpisodes]);

  const isFavoriteCharacter = useCallback(
    (id) => favoriteCharacters.includes(id),
    [favoriteCharacters]
  );

  const isFavoriteEpisode = useCallback(
    (id) => favoriteEpisodes.includes(id),
    [favoriteEpisodes]
  );

  const getTotalCount = useCallback(() => {
    return {
      characters: favoriteCharacters.length,
      episodes: favoriteEpisodes.length,
      total: favoriteCharacters.length + favoriteEpisodes.length,
    };
  }, [favoriteCharacters, favoriteEpisodes]);

  const value = {
    favoriteCharacters,
    favoriteEpisodes,
    toggleCharacter,
    toggleEpisode,
    isFavoriteCharacter,
    isFavoriteEpisode,
    getTotalCount,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
