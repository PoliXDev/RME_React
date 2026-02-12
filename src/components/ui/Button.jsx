import { cn } from '../../utils/cn.js';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) {
  const baseStyles =
    'font-mono font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-portal-green/50 focus:ring-offset-2 focus:ring-offset-space-black';

  const variants = {
    primary:
      'bg-card-gray border-2 border-portal-green/50 text-portal-green hover:border-portal-green hover:bg-portal-green/10 shadow-[0_0_12px_rgba(151,206,76,0.2)] hover:shadow-neon hover:-translate-y-0.5',
    secondary:
      'bg-card-gray/80 backdrop-blur-sm border-2 border-toxic-yellow/30 text-toxic-yellow hover:border-toxic-yellow/60 hover:bg-card-gray',
    ghost:
      'bg-transparent border border-transparent text-gray-400 hover:text-portal-green hover:border-portal-green/30 hover:bg-portal-green/5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
