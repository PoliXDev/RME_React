import { useLocation } from 'react-router-dom';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';

export function MainLayout({ children }) {
  const location = useLocation();
  const isCharactersPage = location.pathname === '/characters';

  return (
    <div className="min-h-screen flex flex-col relative z-1">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-4 sm:py-8">
        {children}
      </main>
      {isCharactersPage ? (
        <div className="hidden sm:block">
          <Footer />
        </div>
      ) : (
        <Footer />
      )}
    </div>
  );
}
