import { buildUrl, fetchApi } from './client.js';

export async function fetchEpisodes(page = 1, filters = {}) {
  const url = buildUrl("/episode", {
    page,
    name: filters.name,
    episode: filters.episode,
  });
  
  const data = await fetchApi(url);
  if (!data) {
    return { results: [], info: { count: 0, pages: 0, next: null, prev: null } };
  }
  return data;
}

export async function fetchEpisodeById(id) {
  const url = `${buildUrl("/episode")}/${id}`;
  return await fetchApi(url);
}
