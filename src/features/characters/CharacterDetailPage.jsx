import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchCharacterById } from '../../api/characters.js';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { Loader } from '../../components/ui/Loader.jsx';
import { ErrorMessage } from '../../components/ui/ErrorMessage.jsx';
import { CharacterDetail } from './components/CharacterDetail.jsx';

export function CharacterDetailPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isFavoriteCharacter, toggleCharacter } = useFavorites();

  useEffect(() => {
    async function loadCharacter() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCharacterById(id);
        setCharacter(data);
      } catch (err) {
        setError('Error al cargar el personaje. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadCharacter();
    }
  }, [id]);

  if (loading) {
    return <Loader message="Cargando personaje..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!character) {
    return <ErrorMessage message="Personaje no encontrado" />;
  }

  return (
    <>
      <Helmet>
        <title>{character.name} - Rick & Morty Explorer</title>
        <meta
          name="description"
          content={`Información detallada de ${character.name}. Estado: ${character.status}, Especie: ${character.species}, Género: ${character.gender}`}
        />
        <meta property="og:title" content={`${character.name} - Rick & Morty Explorer`} />
        <meta property="og:description" content={`Información de ${character.name}`} />
        <meta property="og:image" content={character.image} />
      </Helmet>

      <CharacterDetail
        character={character}
        isFavorite={isFavoriteCharacter(character.id)}
        onToggleFavorite={() => toggleCharacter(character.id)}
      />
    </>
  );
}
