import { getImageUrl } from '../services/tmdb';
import './MovieCard.css';

function MovieCard({ movie }) {
  const posterUrl = getImageUrl(movie.poster_path);
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <div className="movie-card">
      <div className="movie-poster">
        {posterUrl ? (
          <img src={posterUrl} alt={movie.title} />
        ) : (
          <div className="no-poster">No Image</div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-year">{releaseYear}</span>
          <span className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
