import { cn } from '../../utils/cn.js';

export function Input({
  label,
  id,
  className,
  error,
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-mono text-gray-300 font-medium">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full px-4 py-3 font-mono bg-card-gray/70 backdrop-blur-sm',
          'border-2 border-portal-green/20 rounded-lg',
          'text-white placeholder-gray-400',
          'transition-all duration-300',
          'focus:outline-none focus:border-portal-green/60 focus:bg-card-gray',
          'focus:ring-2 focus:ring-portal-green/20',
          error && 'border-status-dead/50 focus:border-status-dead',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-status-dead text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
