export function Loader({ message = 'Cargando...', className }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 py-12 ${className || ''}`}>
      <div className="relative">
        <div className="w-12 h-12 border-4 border-bg-secondary border-t-accent rounded-full animate-spin"></div>
      </div>
      {message && (
        <p className="text-accent font-medium animate-pulse">{message}</p>
      )}
    </div>
  );
}
