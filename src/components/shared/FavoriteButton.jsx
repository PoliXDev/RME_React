import { Star } from 'lucide-react';
import { cn } from '../../utils/cn.js';

export function FavoriteButton({
  isFavorite,
  onToggle,
  className,
  ariaLabel,
  size = 'md',
}) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={ariaLabel || (isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos')}
      className={cn(
        'flex items-center justify-center',
        'transition-all duration-300',
        'hover:scale-110 active:scale-95',
        'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-bg',
        sizes[size],
        className
      )}
    >
      <Star
        className={cn(
          'transition-all duration-300',
          isFavorite
            ? 'fill-gold text-gold'
            : 'fill-none text-gray-400 hover:text-gold'
        )}
        size={size === 'sm' ? 20 : size === 'lg' ? 32 : 24}
        aria-hidden="true"
      />
    </button>
  );
}
