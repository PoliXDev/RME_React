import { buildUrl, fetchApi } from './client.js';

export async function fetchCharacters(page = 1, filters = {}) {
  const url = buildUrl("/character", {
    page,
    name: filters.name,
    status: filters.status,
    species: filters.species,
    type: filters.type,
    gender: filters.gender,
  });
  
  const data = await fetchApi(url);
  if (!data) {
    return { results: [], info: { count: 0, pages: 0, next: null, prev: null } };
  }
  return data;
}

export async function fetchCharacterById(id) {
  const url = `${buildUrl("/character")}/${id}`;
  return await fetchApi(url);
}

export async function fetchCharactersByIds(ids) {
  if (!ids || ids.length === 0) {
    return [];
  }
  
  const idsString = ids.join(",");
  const url = `${buildUrl("/character")}/${idsString}`;
  
  const data = await fetchApi(url);
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}
