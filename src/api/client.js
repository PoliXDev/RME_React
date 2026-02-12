const BASE_URL = "https://rickandmortyapi.com/api";

function buildUrl(endpoint, filters = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  
  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      url.searchParams.append(key, filters[key]);
    }
  });
  
  return url.toString();
}

async function fetchApi(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export { buildUrl, fetchApi };
