import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Input } from '../../../components/ui/Input.jsx';
import { Select } from '../../../components/ui/Select.jsx';

const statusOptions = [
  { value: '', label: 'Todos' },
  { value: 'alive', label: 'Vivo' },
  { value: 'dead', label: 'Muerto' },
  { value: 'unknown', label: 'Desconocido' },
];

const genderOptions = [
  { value: '', label: 'Todos' },
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Femenino' },
  { value: 'genderless', label: 'Sin género' },
  { value: 'unknown', label: 'Desconocido' },
];

function countActiveFilters(filters) {
  let n = 0;
  if (filters.status) n++;
  if (filters.species?.trim()) n++;
  if (filters.gender) n++;
  return n;
}

export function CharacterFilters({ filters, onFilterChange }) {
  const [open, setOpen] = useState(false);
  const activeCount = countActiveFilters(filters);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir filtros"
        aria-expanded={open}
        className="fixed top-24 right-4 sm:right-6 z-40 hidden md:flex items-center justify-center w-12 h-12 rounded-xl border-2 border-card-gray bg-space-black/90 backdrop-blur-md text-portal-green hover:border-portal-green/60 hover:shadow-neon transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-portal-green/50"
      >
        <Filter className="w-5 h-5" aria-hidden="true" />
        {activeCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-portal-green text-space-black text-xs font-mono font-bold">
            {activeCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              role="presentation"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-space-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-label="Opciones de filtrado"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 z-50 w-full max-w-sm h-full flex flex-col bg-card-gray border-l-2 border-portal-green/30 shadow-neon"
            >
              <div className="flex items-center justify-between p-4 border-b border-portal-green/20">
                <h2 className="font-display font-bold text-xl text-portal-green flex items-center gap-2">
                  <Filter className="w-5 h-5" aria-hidden="true" />
                  Filtros
                </h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar filtros"
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-space-black/50 transition-colors"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                <Select
                  id="status-filter"
                  label="Estado"
                  options={statusOptions}
                  value={filters.status}
                  onChange={(e) =>
                    onFilterChange({ ...filters, status: e.target.value })
                  }
                />
                <Input
                  id="species-filter"
                  label="Especie"
                  type="text"
                  placeholder="Ej: Human, Alien..."
                  value={filters.species}
                  onChange={(e) =>
                    onFilterChange({ ...filters, species: e.target.value })
                  }
                />
                <Select
                  id="gender-filter"
                  label="Género"
                  options={genderOptions}
                  value={filters.gender}
                  onChange={(e) =>
                    onFilterChange({ ...filters, gender: e.target.value })
                  }
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
