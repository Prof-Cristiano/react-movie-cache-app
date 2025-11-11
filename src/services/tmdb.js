import cache from '../utils/cache';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN;

/**
 * Fetch data from TMDB API with caching support
 */
async function fetchFromTMDB(endpoint, useToken = true) {
  const cacheKey = `tmdb:${endpoint}`;
  
  // Check cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log('Cache hit:', endpoint);
    return cachedData;
  }

  console.log('Cache miss, fetching:', endpoint);
  
  const url = `${API_BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;
  
  const headers = useToken ? {
    'Authorization': `Bearer ${READ_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  } : {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Store in cache
    cache.set(cacheKey, data);
    
    return data;
  } catch (error) {
    console.error('Error fetching from TMDB:', error);
    throw error;
  }
}

/**
 * Get popular movies
 */
export async function getPopularMovies(page = 1) {
  return fetchFromTMDB(`/movie/popular?page=${page}`);
}

/**
 * Get top rated movies
 */
export async function getTopRatedMovies(page = 1) {
  return fetchFromTMDB(`/movie/top_rated?page=${page}`);
}

/**
 * Get now playing movies
 */
export async function getNowPlayingMovies(page = 1) {
  return fetchFromTMDB(`/movie/now_playing?page=${page}`);
}

/**
 * Search movies
 */
export async function searchMovies(query, page = 1) {
  return fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
}

/**
 * Get movie details
 */
export async function getMovieDetails(movieId) {
  return fetchFromTMDB(`/movie/${movieId}`);
}

/**
 * Get movie image URL
 */
export function getImageUrl(path, size = 'w500') {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

/**
 * Clear cache
 */
export function clearCache() {
  cache.clear();
}
