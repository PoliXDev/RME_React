import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout.jsx';
import { CharactersPage } from '../features/characters/CharactersPage.jsx';
import { CharacterDetailPage } from '../features/characters/CharacterDetailPage.jsx';
import { EpisodesPage } from '../features/episodes/EpisodesPage.jsx';
import { EpisodeDetailPage } from '../features/episodes/EpisodeDetailPage.jsx';
import { FavoritesPage } from '../features/favorites/FavoritesPage.jsx';
import { IntroPage } from '../features/intro/IntroPage.jsx';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route
        path="/characters"
        element={
          <MainLayout>
            <CharactersPage />
          </MainLayout>
        }
      />
      <Route
        path="/characters/:id"
        element={
          <MainLayout>
            <CharacterDetailPage />
          </MainLayout>
        }
      />
      <Route
        path="/episodes"
        element={
          <MainLayout>
            <EpisodesPage />
          </MainLayout>
        }
      />
      <Route
        path="/episodes/:id"
        element={
          <MainLayout>
            <EpisodeDetailPage />
          </MainLayout>
        }
      />
      <Route
        path="/favorites"
        element={
          <MainLayout>
            <FavoritesPage />
          </MainLayout>
        }
      />
      <Route path="*" element={<Navigate to="/characters" replace />} />
    </Routes>
  );
}
