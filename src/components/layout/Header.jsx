import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Tv, Star, Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn.js';
import { assetUrl } from '../../utils/assets.js';

const SCROLL_THRESHOLD = 80;

const navLinks = [
  { path: '/characters', label: 'Personajes', icon: Users },
  { path: '/episodes', label: 'Episodios', icon: Tv },
  { path: '/favorites', label: 'Favoritos', icon: Star },
];

export function Header() {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuRef = useRef(null);

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

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    cn(
      'flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-sm uppercase tracking-wider',
      'transition-all duration-300 border border-transparent',
      isActive(path)
        ? 'text-portal-green border-portal-green/50 bg-portal-green/10 shadow-[0_0_12px_rgba(151,206,76,0.25)]'
        : 'text-gray-400 hover:text-portal-green hover:border-portal-green/30 hover:bg-portal-green/5'
    );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-transform duration-300 ease-out bg-transparent pt-4 sm:pt-9',
        !visible && '-translate-y-full'
      )}
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="relative flex items-center justify-between gap-2 sm:gap-4 min-h-16 py-2 sm:py-3">
          {/* Espaciador móvil (mismo ancho que el botón menú) para centrar el logo; desktop: nav */}
          <nav
            aria-label="Navegación principal"
            className="hidden sm:flex items-center gap-1 flex-1 justify-start min-w-0"
          >
            {navLinks.slice(0, 2).map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={linkClass(path)}
                aria-current={isActive(path) ? 'page' : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Logo: mismo tamaño y centrado en móvil y desktop */}
          <Link
            to="/characters"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto"
            aria-label="Rick and Morty Explorer - Inicio"
          >
            <img
              src={assetUrl('assets/text2.png')}
              alt=""
              className="h-14 sm:h-28 w-auto max-w-[320px] sm:max-w-[560px] object-contain object-center filter drop-shadow-[0_0_12px_rgba(151,206,76,0.35)] hover:drop-shadow-[0_0_20px_rgba(151,206,76,0.5)] transition-all duration-300"
              width={560}
              height={140}
            />
          </Link>

          {/* Desktop: Favoritos a la derecha */}
          <nav className="hidden sm:flex items-center gap-1 flex-1 justify-end min-w-0">
            {navLinks.slice(2).map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={linkClass(path)}
                aria-current={isActive(path) ? 'page' : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Móvil: espaciador izquierdo + botón menú para que el logo quede centrado */}
          <div className="flex sm:hidden shrink-0 w-11" aria-hidden="true" />
          <div className="relative flex sm:hidden shrink-0" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="p-2.5 rounded-lg text-gray-400 hover:text-portal-green hover:bg-portal-green/10 border border-transparent hover:border-portal-green/30 transition-all"
            >
              {menuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>

            {/* Panel desplegable móvil: debajo del navbar, ancho completo */}
            <div
              id="mobile-nav-menu"
              className={cn(
                'absolute top-full right-0 mt-1 w-[min(280px,85vw)] rounded-xl border border-portal-green/30 bg-space-black/95 backdrop-blur-md shadow-neon overflow-hidden',
                'transition-all duration-200 ease-out',
                menuOpen
                  ? 'opacity-100 visible translate-y-0'
                  : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              )}
            >
              <nav
                aria-label="Menú de navegación"
                className="flex flex-col p-2"
              >
                {navLinks.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={cn(
                      linkClass(path),
                      'w-full justify-start rounded-lg'
                    )}
                    aria-current={isActive(path) ? 'page' : undefined}
                  >
                    <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
