const BASE = import.meta.env.BASE_URL;

export function assetUrl(path) {
  const p = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE}${p}`;
}
