import { useState, useEffect, useCallback } from 'react';
import { fetchCharacters } from '../../../api/characters.js';

export function useCharacters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    species: '',
    gender: '',
  });

  const loadCharacters = useCallback(async (append = false) => {
    if (loading) return;

    try {
      setLoading(true);
      setError(null);

      const activeFilters = {
        name: '',
        status: filters.status,
        species: filters.species,
        gender: filters.gender,
      };

      const data = await fetchCharacters(page, activeFilters);

      if (append) {
        setCharacters((prev) => [...prev, ...data.results]);
      } else {
        setCharacters(data.results);
      }

      setInfo(data.info);
    } catch (err) {
      setError('Error al cargar los personajes. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [page, filters.status, filters.species, filters.gender, loading]);

  useEffect(() => {
    loadCharacters(false);
  }, [filters.status, filters.species, filters.gender]);

  useEffect(() => {
    if (page > 1) {
      loadCharacters(true);
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
    setCharacters([]);
  }, []);

  const hasMore = info?.next !== null;

  return {
    characters,
    loading,
    error,
    filters,
    hasMore,
    loadMore,
    updateFilters,
  };
}
