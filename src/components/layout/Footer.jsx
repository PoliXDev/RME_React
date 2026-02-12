export function Footer() {
  const linkClass =
    'font-mono text-sm uppercase tracking-wider text-gray-400 hover:text-portal-green transition-all duration-300 underline underline-offset-2';

  return (
    <footer className="bg-transparent mt-12 py-8 text-center">
      <div className="container mx-auto px-4 font-mono text-sm uppercase tracking-wider text-gray-400">
        <p className="mb-2">
          Impulsado por{' '}
          <a
            href="https://rickandmortyapi.com"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Rick and Morty API
          </a>
        </p>
        <p>
          Desarrollado por{' '}
          <a
            href="https://github.com/PoliXDev"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Daniel Ruiz Poli
          </a>
        </p>
      </div>
    </footer>
  );
}
