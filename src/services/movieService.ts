import type { Movie, MovieResponse, Genre } from '../types/movie';
import { cacheService } from './cacheService';

/**
 * MovieService: Gerencia requisições à API do TMDB com cache inteligente
 * 
 * Usa The Movie Database (TMDB) API gratuita para buscar filmes.
 * Para usar em produção, você precisa de uma API key do TMDB (https://www.themoviedb.org/settings/api)
 * 
 * Cache implementado:
 * - Filmes populares: 10 minutos
 * - Categorias: 10 minutos
 * - Buscas: 5 minutos
 */

const API_KEY = 'demo'; // Para demonstração - substitua por uma chave real
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Cache TTL (Time To Live) em milissegundos
const CACHE_TTL = {
  POPULAR: 10 * 60 * 1000,    // 10 minutos para filmes populares
  CATEGORY: 10 * 60 * 1000,   // 10 minutos para categorias
  SEARCH: 5 * 60 * 1000,      // 5 minutos para buscas
  GENRES: 24 * 60 * 60 * 1000, // 24 horas para gêneros (mudam raramente)
};

class MovieService {
  private apiKey: string;
  private searchHistory: Map<string, number> = new Map(); // Rastreia buscas mais frequentes
  
  constructor(apiKey: string = API_KEY) {
    this.apiKey = apiKey;
  }
  
  /**
   * Retorna URL completa para imagens
   */
  getImageUrl(path: string | null, size: 'w185' | 'w300' | 'w500' | 'original' = 'w300'): string {
    if (!path) return '/placeholder-movie.png';
    return `${IMAGE_BASE_URL}/${size}${path}`;
  }
  
  /**
   * Busca filmes populares (com cache)
   */
  async getPopularMovies(page: number = 1): Promise<MovieResponse> {
    const cacheKey = `popular_${page}`;
    
    // Tenta buscar do cache primeiro
    const cached = cacheService.get<MovieResponse>(cacheKey);
    if (cached) {
      return cached;
    }
    
    // Se não está em cache, busca da API
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${this.apiKey}&language=pt-BR&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data: MovieResponse = await response.json();
      
      // Armazena no cache
      cacheService.set(cacheKey, data, CACHE_TTL.POPULAR);
      
      return data;
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
      // Retorna dados mock para demonstração
      return this.getMockPopularMovies(page);
    }
  }
  
  /**
   * Busca filmes por categoria/gênero (com cache)
   */
  async getMoviesByGenre(genreId: number, page: number = 1): Promise<MovieResponse> {
    const cacheKey = `genre_${genreId}_${page}`;
    
    // Tenta buscar do cache
    const cached = cacheService.get<MovieResponse>(cacheKey);
    if (cached) {
      return cached;
    }
    
    try {
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${this.apiKey}&language=pt-BR&with_genres=${genreId}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data: MovieResponse = await response.json();
      
      // Armazena no cache
      cacheService.set(cacheKey, data, CACHE_TTL.CATEGORY);
      
      return data;
    } catch (error) {
      console.error('Erro ao buscar filmes por gênero:', error);
      return this.getMockMoviesByGenre(genreId, page);
    }
  }
  
  /**
   * Busca filmes por termo (com cache e rastreamento de popularidade)
   */
  async searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
    const cacheKey = `search_${query.toLowerCase()}_${page}`;
    
    // Incrementa contador de buscas para este termo
    const count = (this.searchHistory.get(query.toLowerCase()) || 0) + 1;
    this.searchHistory.set(query.toLowerCase(), count);
    
    // Tenta buscar do cache
    const cached = cacheService.get<MovieResponse>(cacheKey);
    if (cached) {
      return cached;
    }
    
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${this.apiKey}&language=pt-BR&query=${encodeURIComponent(query)}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data: MovieResponse = await response.json();
      
      // Armazena no cache
      cacheService.set(cacheKey, data, CACHE_TTL.SEARCH);
      
      return data;
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      return this.getMockSearchResults(query, page);
    }
  }
  
  /**
   * Retorna lista de gêneros (com cache de longa duração)
   */
  async getGenres(): Promise<Genre[]> {
    const cacheKey = 'genres';
    
    const cached = cacheService.get<Genre[]>(cacheKey);
    if (cached) {
      return cached;
    }
    
    try {
      const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${this.apiKey}&language=pt-BR`
      );
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      const genres: Genre[] = data.genres;
      
      cacheService.set(cacheKey, genres, CACHE_TTL.GENRES);
      
      return genres;
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error);
      return this.getMockGenres();
    }
  }
  
  /**
   * Retorna as buscas mais populares
   */
  getMostSearchedTerms(limit: number = 5): { term: string; count: number }[] {
    return Array.from(this.searchHistory.entries())
      .map(([term, count]) => ({ term, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }
  
  // Métodos mock para demonstração quando a API não está disponível
  
  private getMockPopularMovies(page: number): MovieResponse {
    const mockMovies: Movie[] = [
      {
        id: 1,
        title: 'Filme Popular 1',
        overview: 'Este é um filme de demonstração. Em produção, use uma API key válida do TMDB.',
        poster_path: null,
        backdrop_path: null,
        release_date: '2024-01-01',
        vote_average: 8.5,
        vote_count: 1000,
        popularity: 100,
        genre_ids: [28, 12],
      },
      {
        id: 2,
        title: 'Filme Popular 2',
        overview: 'Outro filme de demonstração para ensinar conceitos de cache.',
        poster_path: null,
        backdrop_path: null,
        release_date: '2024-02-01',
        vote_average: 7.8,
        vote_count: 800,
        popularity: 90,
        genre_ids: [35, 10749],
      },
    ];
    
    return {
      page,
      results: mockMovies,
      total_pages: 1,
      total_results: mockMovies.length,
    };
  }
  
  private getMockMoviesByGenre(genreId: number, page: number): MovieResponse {
    return {
      page,
      results: [
        {
          id: genreId * 100,
          title: `Filme de Gênero ${genreId}`,
          overview: 'Filme de demonstração para categoria específica.',
          poster_path: null,
          backdrop_path: null,
          release_date: '2024-01-01',
          vote_average: 7.5,
          vote_count: 500,
          popularity: 50,
          genre_ids: [genreId],
        },
      ],
      total_pages: 1,
      total_results: 1,
    };
  }
  
  private getMockSearchResults(query: string, page: number): MovieResponse {
    return {
      page,
      results: [
        {
          id: 999,
          title: `Resultado para "${query}"`,
          overview: 'Resultado de demonstração. Configure uma API key válida do TMDB para resultados reais.',
          poster_path: null,
          backdrop_path: null,
          release_date: '2024-01-01',
          vote_average: 8.0,
          vote_count: 600,
          popularity: 70,
          genre_ids: [28],
        },
      ],
      total_pages: 1,
      total_results: 1,
    };
  }
  
  private getMockGenres(): Genre[] {
    return [
      { id: 28, name: 'Ação' },
      { id: 12, name: 'Aventura' },
      { id: 16, name: 'Animação' },
      { id: 35, name: 'Comédia' },
      { id: 80, name: 'Crime' },
      { id: 99, name: 'Documentário' },
      { id: 18, name: 'Drama' },
      { id: 10751, name: 'Família' },
      { id: 14, name: 'Fantasia' },
      { id: 36, name: 'História' },
      { id: 27, name: 'Terror' },
      { id: 10402, name: 'Música' },
      { id: 9648, name: 'Mistério' },
      { id: 10749, name: 'Romance' },
      { id: 878, name: 'Ficção científica' },
      { id: 10770, name: 'Cinema TV' },
      { id: 53, name: 'Thriller' },
      { id: 10752, name: 'Guerra' },
      { id: 37, name: 'Faroeste' },
    ];
  }
}

export const movieService = new MovieService();
