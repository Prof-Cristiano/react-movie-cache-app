import { useState, useEffect } from 'react';
import type { Movie, Genre } from '../types/movie';
import { movieService } from '../services/movieService';

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Carrega gêneros na inicialização
  useEffect(() => {
    loadGenres();
  }, []);
  
  // Carrega filmes quando muda o gênero ou busca
  useEffect(() => {
    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenre, searchQuery]);
  
  const loadGenres = async () => {
    try {
      const genreList = await movieService.getGenres();
      setGenres(genreList);
    } catch (error) {
      console.error('Erro ao carregar gêneros:', error);
    }
  };
  
  const loadMovies = async () => {
    setLoading(true);
    try {
      let response;
      
      if (searchQuery) {
        // Se há uma busca ativa, usa a busca
        response = await movieService.searchMovies(searchQuery);
      } else if (selectedGenre) {
        // Se há um gênero selecionado, filtra por gênero
        response = await movieService.getMoviesByGenre(selectedGenre);
      } else {
        // Caso contrário, mostra filmes populares
        response = await movieService.getPopularMovies();
      }
      
      setMovies(response.results);
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedGenre(null); // Limpa filtro de gênero ao buscar
  };
  
  const handleGenreSelect = (genreId: number | null) => {
    setSelectedGenre(genreId);
    setSearchQuery(''); // Limpa busca ao filtrar por gênero
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenre(null);
  };
  
  return {
    movies,
    genres,
    loading,
    selectedGenre,
    searchQuery,
    handleSearch,
    handleGenreSelect,
    clearFilters,
  };
}
