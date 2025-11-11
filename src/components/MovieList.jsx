import { useState, useEffect, useCallback } from 'react';
import MovieCard from './MovieCard';
import { getPopularMovies, getTopRatedMovies, getNowPlayingMovies, clearCache } from '../services/tmdb';
import './MovieList.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('popular');

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let data;
      switch (category) {
        case 'popular':
          data = await getPopularMovies();
          break;
        case 'top_rated':
          data = await getTopRatedMovies();
          break;
        case 'now_playing':
          data = await getNowPlayingMovies();
          break;
        default:
          data = await getPopularMovies();
      }
      setMovies(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleClearCache = () => {
    clearCache();
    alert('Cache cleared! Refresh to fetch new data.');
  };

  return (
    <div className="movie-list-container">
      <div className="controls">
        <div className="category-buttons">
          <button 
            className={category === 'popular' ? 'active' : ''} 
            onClick={() => setCategory('popular')}
          >
            Popular
          </button>
          <button 
            className={category === 'top_rated' ? 'active' : ''} 
            onClick={() => setCategory('top_rated')}
          >
            Top Rated
          </button>
          <button 
            className={category === 'now_playing' ? 'active' : ''} 
            onClick={() => setCategory('now_playing')}
          >
            Now Playing
          </button>
        </div>
        <button className="clear-cache-btn" onClick={handleClearCache}>
          Clear Cache
        </button>
      </div>

      {loading && <div className="loading">Loading movies...</div>}
      
      {error && (
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={fetchMovies}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;
