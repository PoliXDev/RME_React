import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Tv, Star } from 'lucide-react';
import { cn } from '../../utils/cn.js';
import { assetUrl } from '../../utils/assets.js';

const SCROLL_THRESHOLD = 80;

export function Header() {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < SCROLL_THRESHOLD) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftLinks = [
    { path: '/characters', label: 'Personajes', icon: Users },
    { path: '/episodes', label: 'Episodios', icon: Tv },
  ];
  const rightLinks = [
    { path: '/favorites', label: 'Favoritos', icon: Star },
  ];

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    cn(
      'flex items-center gap-1.5 sm:gap-2 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-lg font-mono text-sm uppercase tracking-wider',
      'transition-all duration-300 border border-transparent',
      isActive(path)
        ? 'text-portal-green border-portal-green/50 bg-portal-green/10 shadow-[0_0_12px_rgba(151,206,76,0.25)]'
        : 'text-gray-400 hover:text-portal-green hover:border-portal-green/30 hover:bg-portal-green/5'
    );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-transform duration-300 ease-out bg-transparent',
        !visible && '-translate-y-full'
      )}
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4 min-h-20 sm:min-h-16 py-2 sm:py-3">
          <nav
            aria-label="Navegación principal"
            className="flex flex-col sm:flex-row items-start sm:items-center gap-0.5 sm:gap-1 flex-none sm:flex-1 justify-start min-w-0"
          >
            {leftLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={linkClass(path)}
                aria-current={isActive(path) ? 'page' : undefined}
              >
                <Icon className="w-5 h-5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </nav>

          <Link
            to="/characters"
            className="flex-1 flex items-center justify-center mx-1 sm:mx-2 min-w-0 sm:flex-initial sm:max-w-none"
            aria-label="Rick and Morty Explorer - Inicio"
          >
            <img
              src={assetUrl('assets/text2.png')}
              alt=""
              className="w-[min(85vw,320px)] sm:w-auto h-auto max-h-24 sm:max-h-28 object-contain object-center filter drop-shadow-[0_0_12px_rgba(151,206,76,0.35)] hover:drop-shadow-[0_0_20px_rgba(151,206,76,0.5)] transition-all duration-300"
              width={420}
              height={105}
            />
          </Link>

          <nav className="flex items-center gap-0.5 sm:gap-1 flex-none sm:flex-1 justify-end min-w-0">
            {rightLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={linkClass(path)}
                aria-current={isActive(path) ? 'page' : undefined}
              >
                <Icon className="w-5 h-5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
