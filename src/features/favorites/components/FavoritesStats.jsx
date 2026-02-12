export function FavoritesStats({ counts }) {
  const stats = [
    {
      icon: '👤',
      label: 'Personajes',
      value: counts.characters,
    },
    {
      icon: '📺',
      label: 'Episodios',
      value: counts.episodes,
    },
    {
      icon: '⭐',
      label: 'Total',
      value: counts.total,
    },
  ];

  return (
    <section
      aria-label="Estadísticas de favoritos"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-bg-secondary/70 backdrop-blur-sm border-2 border-gold/20 rounded-xl p-6 flex items-center gap-4 transition-all duration-300 hover:translate-y-[-4px] hover:border-gold/60 hover:shadow-[0_8px_25px_rgba(255,215,0,0.2)]"
        >
          <div className="text-5xl" aria-hidden="true">
            {stat.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-gold mb-1">
              {stat.value}
            </span>
            <span className="text-sm text-gray-400">{stat.label}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
