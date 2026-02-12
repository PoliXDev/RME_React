import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button.jsx';

export function EmptyFavorites() {
  return (
    <div className="text-center py-16 max-w-2xl mx-auto">
      <div className="text-7xl mb-6" aria-hidden="true">
        💫
      </div>
      <h2 className="font-display text-3xl font-bold text-white mb-4">
        No tienes favoritos aún
      </h2>
      <p className="font-mono text-lg text-gray-400 mb-8 leading-relaxed">
        Explora personajes y episodios y marca tus favoritos con la estrella ⭐
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/characters">
          <Button variant="primary" size="lg">
            Ver Personajes
          </Button>
        </Link>
        <Link to="/episodes">
          <Button variant="primary" size="lg">
            Ver Episodios
          </Button>
        </Link>
      </div>
    </div>
  );
}
