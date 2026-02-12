import { Helmet } from 'react-helmet-async';
import { useEpisodes } from './hooks/useEpisodes.js';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { Input } from '../../components/ui/Input.jsx';
import { EpisodeFilters } from './components/EpisodeFilters.jsx';
import { EpisodeList } from './components/EpisodeList.jsx';

export function EpisodesPage() {
  const {
    episodes,
    loading,
    error,
    filters,
    hasMore,
    loadMore,
    updateFilters,
  } = useEpisodes();

  const { favoriteEpisodes, toggleEpisode } = useFavorites();

  const handleSearchChange = (e) => {
    updateFilters({ ...filters, name: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Episodios - Rick & Morty Explorer</title>
        <meta
          name="description"
          content="Explora todos los episodios de Rick and Morty. Busca por nombre, filtra por temporada y encuentra tus episodios favoritos."
        />
        <meta property="og:title" content="Episodios - Rick & Morty Explorer" />
        <meta
          property="og:description"
          content="Explora todos los episodios de Rick and Morty"
        />
      </Helmet>

      <div>
        <header className="mb-8">
          <h1 className="font-display text-4xl font-bold text-portal-green mb-2 text-center">
            Episodios
          </h1>
          <p className="font-mono text-gray-400 text-center text-sm uppercase tracking-wider">
            Explora todos los episodios
          </p>
        </header>

        <section aria-label="Búsqueda de episodios" className="mb-8">
          <Input
            id="episode-search-input"
            type="text"
            placeholder="Buscar episodios por nombre..."
            value={filters.name}
            onChange={handleSearchChange}
          />
        </section>

        <EpisodeFilters filters={filters} onFilterChange={updateFilters} />

        <EpisodeList
          episodes={episodes}
          loading={loading}
          error={error}
          hasMore={hasMore}
          onLoadMore={loadMore}
          favoriteEpisodes={favoriteEpisodes}
          onToggleFavorite={toggleEpisode}
        />
      </div>
    </>
  );
}
