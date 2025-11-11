import type { Movie } from '../types/movie';
import { movieService } from '../services/movieService';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movieService.getImageUrl(movie.poster_path, 'w300');
  
  return (
    <div className="movie-card">
      <div className="movie-poster">
        {movie.poster_path ? (
          <img src={posterUrl} alt={movie.title} />
        ) : (
          <div className="movie-poster-placeholder">
            <span>🎬</span>
            <p>Sem imagem</p>
          </div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</span>
          <span className="movie-year">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
          </span>
        </div>
        <p className="movie-overview">
          {movie.overview 
            ? movie.overview.length > 150 
              ? `${movie.overview.substring(0, 150)}...` 
              : movie.overview
            : 'Sem descrição disponível.'}
        </p>
      </div>
    </div>
  );
}
