import { motion } from 'framer-motion';
import { EpisodeCard } from './EpisodeCard.jsx';
import { Loader } from '../../../components/ui/Loader.jsx';
import { ErrorMessage } from '../../../components/ui/ErrorMessage.jsx';
import { Button } from '../../../components/ui/Button.jsx';

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function EpisodeList({
  episodes,
  loading,
  error,
  hasMore,
  onLoadMore,
  favoriteEpisodes,
  onToggleFavorite,
}) {
  if (loading && episodes.length === 0) {
    return <Loader message="Cargando episodios..." />;
  }

  if (error) {
    return <ErrorMessage message={error} className="mb-8" />;
  }

  if (episodes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4" aria-hidden="true">
          🔍
        </div>
        <p className="text-xl text-gray-400">No se encontraron episodios</p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        role="list"
        aria-label="Lista de episodios"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {episodes.map((episode) => (
          <motion.div key={episode.id} role="listitem" variants={itemVariants} layout>
            <EpisodeCard
              episode={episode}
              isFavorite={favoriteEpisodes.includes(episode.id)}
              onToggleFavorite={onToggleFavorite}
            />
          </motion.div>
        ))}
      </motion.div>

      {hasMore && (
        <motion.div
          className="flex justify-center mt-8"
          initial={false}
          animate={{ opacity: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={onLoadMore}
              disabled={loading}
              variant="primary"
              size="lg"
            >
              {loading ? 'Cargando...' : 'Cargar más episodios'}
            </Button>
          </motion.div>
        </motion.div>
      )}

      {loading && episodes.length > 0 && (
        <div className="mt-4">
          <Loader message="Cargando más episodios..." />
        </div>
      )}
    </>
  );
}
