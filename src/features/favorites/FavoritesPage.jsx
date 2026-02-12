import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { fetchCharactersByIds } from '../../api/characters.js';
import { fetchEpisodeById } from '../../api/episodes.js';
import { FavoritesStats } from './components/FavoritesStats.jsx';
import { FavoritesTabs } from './components/FavoritesTabs.jsx';
import { EmptyFavorites } from './components/EmptyFavorites.jsx';
import { CharacterCard } from '../characters/components/CharacterCard.jsx';
import { EpisodeCard } from '../episodes/components/EpisodeCard.jsx';
import { Loader } from '../../components/ui/Loader.jsx';
import { ErrorMessage } from '../../components/ui/ErrorMessage.jsx';

export function FavoritesPage() {
  const [activeTab, setActiveTab] = useState('characters');
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    favoriteCharacters,
    favoriteEpisodes,
    toggleCharacter,
    toggleEpisode,
    getTotalCount,
  } = useFavorites();

  const counts = getTotalCount();

  useEffect(() => {
    async function loadFavoriteCharacters() {
      if (favoriteCharacters.length === 0) {
        setCharacters([]);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchCharactersByIds(favoriteCharacters);
        setCharacters(data);
      } catch (err) {
        setError('Error al cargar personajes favoritos');
      } finally {
        setLoading(false);
      }
    }

    if (activeTab === 'characters') {
      loadFavoriteCharacters();
    }
  }, [favoriteCharacters, activeTab]);

  useEffect(() => {
    async function loadFavoriteEpisodes() {
      if (favoriteEpisodes.length === 0) {
        setEpisodes([]);
        return;
      }

      try {
        setLoading(true);
        const episodesData = await Promise.all(
          favoriteEpisodes.map((id) => fetchEpisodeById(id))
        );
        setEpisodes(episodesData);
      } catch (err) {
        setError('Error al cargar episodios favoritos');
      } finally {
        setLoading(false);
      }
    }

    if (activeTab === 'episodes') {
      loadFavoriteEpisodes();
    }
  }, [favoriteEpisodes, activeTab]);

  const handleRemoveCharacter = (id) => {
    toggleCharacter(id);
    setCharacters((prev) => prev.filter((char) => char.id !== id));
  };

  const handleRemoveEpisode = (id) => {
    toggleEpisode(id);
    setEpisodes((prev) => prev.filter((ep) => ep.id !== id));
  };

  if (counts.total === 0) {
    return (
      <>
        <Helmet>
          <title>Favoritos - Rick & Morty Explorer</title>
          <meta
            name="description"
            content="Tus personajes y episodios favoritos de Rick and Morty"
          />
        </Helmet>
        <EmptyFavorites />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Favoritos - Rick & Morty Explorer</title>
        <meta
          name="description"
          content={`Tus favoritos: ${counts.characters} personajes y ${counts.episodes} episodios`}
        />
      </Helmet>

      <div>
        <header className="mb-8">
          <h1 className="font-display text-4xl font-bold text-portal-green mb-2 text-center">
            Mis Favoritos
          </h1>
          <p className="font-mono text-gray-400 text-center text-sm uppercase tracking-wider">
            Tus personajes y episodios guardados
          </p>
        </header>

        <FavoritesStats counts={counts} />
        <FavoritesTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {error && <ErrorMessage message={error} className="mb-8" />}

        {loading ? (
          <Loader message="Cargando favoritos..." />
        ) : (
          <>
            {activeTab === 'characters' && (
              <div>
                {characters.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4" aria-hidden="true">
                      💫
                    </div>
                    <p className="font-mono text-xl text-gray-400">
                      No tienes personajes favoritos
                    </p>
                  </div>
                ) : (
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    role="list"
                    aria-label="Personajes favoritos"
                  >
                    {characters.map((character) => (
                      <div key={character.id} role="listitem">
                        <CharacterCard
                          character={character}
                          isFavorite={true}
                          onToggleFavorite={() => handleRemoveCharacter(character.id)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'episodes' && (
              <div>
                {episodes.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4" aria-hidden="true">
                      💫
                    </div>
                    <p className="font-mono text-xl text-gray-400">
                      No tienes episodios favoritos
                    </p>
                  </div>
                ) : (
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    role="list"
                    aria-label="Episodios favoritos"
                  >
                    {episodes.map((episode) => (
                      <div key={episode.id} role="listitem">
                        <EpisodeCard
                          episode={episode}
                          isFavorite={true}
                          onToggleFavorite={() => handleRemoveEpisode(episode.id)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
