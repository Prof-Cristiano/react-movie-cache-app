import type { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  loading: boolean;
  title?: string;
}

export function MovieList({ movies, loading, title }: MovieListProps) {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Carregando filmes...</p>
      </div>
    );
  }
  
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <p>🎬 Nenhum filme encontrado.</p>
      </div>
    );
  }
  
  return (
    <div className="movie-list-container">
      {title && <h2 className="movie-list-title">{title}</h2>}
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
