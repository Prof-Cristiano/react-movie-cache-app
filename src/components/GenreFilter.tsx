import type { Genre } from '../types/movie';

interface GenreFilterProps {
  genres: Genre[];
  selectedGenre: number | null;
  onSelectGenre: (genreId: number | null) => void;
}

export function GenreFilter({ genres, selectedGenre, onSelectGenre }: GenreFilterProps) {
  return (
    <div className="genre-filter">
      <h3>🎭 Filtrar por Gênero:</h3>
      <div className="genre-buttons">
        <button
          className={`genre-button ${selectedGenre === null ? 'active' : ''}`}
          onClick={() => onSelectGenre(null)}
        >
          Todos
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`genre-button ${selectedGenre === genre.id ? 'active' : ''}`}
            onClick={() => onSelectGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}
