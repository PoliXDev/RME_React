import { Select } from '../../../components/ui/Select.jsx';

export function EpisodeFilters({ filters, onFilterChange }) {
  const seasonOptions = [
    { value: '', label: 'Todas' },
    { value: 'S01', label: 'Temporada 1' },
    { value: 'S02', label: 'Temporada 2' },
    { value: 'S03', label: 'Temporada 3' },
    { value: 'S04', label: 'Temporada 4' },
    { value: 'S05', label: 'Temporada 5' },
  ];

  return (
    <section
      aria-label="Filtros de episodios"
      className="mb-8"
    >
      <Select
        id="season-filter"
        label="Temporada"
        options={seasonOptions}
        value={filters.episode}
        onChange={(e) =>
          onFilterChange({ ...filters, episode: e.target.value })
        }
      />
    </section>
  );
}
