import { cn } from '../../utils/cn.js';

export function Select({
  label,
  id,
  options = [],
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
      <select
        id={id}
        className={cn(
          'w-full px-4 py-3 font-mono bg-card-gray/70 backdrop-blur-sm',
          'border-2 border-portal-green/20 rounded-lg',
          'text-white',
          'transition-all duration-300',
          'focus:outline-none focus:border-portal-green/60 focus:bg-card-gray',
          'focus:ring-2 focus:ring-portal-green/20',
          'cursor-pointer',
          error && 'border-status-dead/50 focus:border-status-dead',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-card-gray text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-status-dead text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
