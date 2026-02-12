import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { AppRoutes } from './routes/AppRoutes.jsx';
import { NightSkyCanvas } from './components/background/NightSkyCanvas.jsx';
import './index.css';

function App() {
  return (
    <HelmetProvider>
      <FavoritesProvider>
        <NightSkyCanvas />
        <BrowserRouter basename="/RME_React">
          <AppRoutes />
        </BrowserRouter>
      </FavoritesProvider>
    </HelmetProvider>
  );
}

export default App;
