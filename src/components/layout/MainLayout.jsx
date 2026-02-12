import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';

export function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col relative z-1">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
