import { cn } from '../../../utils/cn.js';

export function FavoritesTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'characters', label: '👤 Personajes Favoritos' },
    { id: 'episodes', label: '📺 Episodios Favoritos' },
  ];

  return (
    <nav
      aria-label="Pestañas de favoritos"
      className="flex gap-4 mb-8 border-b-2 border-card-gray"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'px-6 py-4 font-mono font-semibold text-sm uppercase tracking-wider',
            'transition-all duration-300 relative',
            'border-b-2 border-transparent -mb-[2px]',
            activeTab === tab.id
              ? 'text-portal-green border-b-portal-green'
              : 'text-gray-400 hover:text-portal-green'
          )}
          aria-current={activeTab === tab.id ? 'page' : undefined}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
