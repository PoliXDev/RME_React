import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchEpisodeById } from '../../api/episodes.js';
import { fetchCharactersByIds } from '../../api/characters.js';
import { extractCharacterIds } from '../../utils/formatters.js';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { Loader } from '../../components/ui/Loader.jsx';
import { ErrorMessage } from '../../components/ui/ErrorMessage.jsx';
import { EpisodeDetail } from './components/EpisodeDetail.jsx';
import { EpisodeCharacters } from './components/EpisodeCharacters.jsx';

export function EpisodeDetailPage() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCharacters, setLoadingCharacters] = useState(false);
  const [error, setError] = useState(null);

  const { isFavoriteEpisode, toggleEpisode, favoriteCharacters, toggleCharacter } = useFavorites();

  useEffect(() => {
    async function loadEpisode() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchEpisodeById(id);
        setEpisode(data);

        if (data?.characters?.length > 0) {
          setLoadingCharacters(true);
          const characterIds = extractCharacterIds(data.characters);
          const charactersData = await fetchCharactersByIds(characterIds);
          setCharacters(charactersData);
          setLoadingCharacters(false);
        }
      } catch (err) {
        setError('Error al cargar el episodio. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadEpisode();
    }
  }, [id]);

  if (loading) {
    return <Loader message="Cargando episodio..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!episode) {
    return <ErrorMessage message="Episodio no encontrado" />;
  }

  return (
    <>
      <Helmet>
        <title>{episode.name} - Rick & Morty Explorer</title>
        <meta
          name="description"
          content={`${episode.name} - ${episode.episode}. Emitido el ${episode.air_date}. ${episode.characters.length} personajes aparecen en este episodio.`}
        />
        <meta property="og:title" content={`${episode.name} - Rick & Morty Explorer`} />
        <meta property="og:description" content={`Episodio ${episode.episode}: ${episode.name}`} />
      </Helmet>

      <EpisodeDetail
        episode={episode}
        isFavorite={isFavoriteEpisode(episode.id)}
        onToggleFavorite={() => toggleEpisode(episode.id)}
      />

      <EpisodeCharacters
        characters={characters}
        loading={loadingCharacters}
        favoriteCharacters={favoriteCharacters}
        onToggleFavorite={toggleCharacter}
      />
    </>
  );
}
