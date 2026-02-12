import { useState, useEffect, useCallback } from 'react';
import { fetchEpisodes } from '../../../api/episodes.js';
import { useDebounce } from '../../../hooks/useDebounce.js';

export function useEpisodes() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [page, setPage] = useState(1);
  
  const [filters, setFilters] = useState({
    name: '',
    episode: '',
  });

  const debouncedName = useDebounce(filters.name, 500);

  const loadEpisodes = useCallback(async (append = false) => {
    if (loading) return;

    try {
      setLoading(true);
      setError(null);

      const activeFilters = {
        name: debouncedName,
        episode: filters.episode,
      };

      const data = await fetchEpisodes(page, activeFilters);

      if (append) {
        setEpisodes((prev) => [...prev, ...data.results]);
      } else {
        setEpisodes(data.results);
      }

      setInfo(data.info);
    } catch (err) {
      setError('Error al cargar los episodios. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedName, filters.episode, loading]);

  useEffect(() => {
    loadEpisodes(false);
  }, [debouncedName, filters.episode]);

  useEffect(() => {
    if (page > 1) {
      loadEpisodes(true);
    }
  }, [page]);

  const loadMore = useCallback(() => {
    if (info?.next && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [info?.next, loading]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    setPage(1);
    setEpisodes([]);
  }, []);

  const hasMore = info?.next !== null;

  return {
    episodes,
    loading,
    error,
    filters,
    hasMore,
    loadMore,
    updateFilters,
  };
}
