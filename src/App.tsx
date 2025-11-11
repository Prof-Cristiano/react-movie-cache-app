import './App.css'
import { useMovies } from './hooks/useMovies'
import { SearchBar } from './components/SearchBar'
import { GenreFilter } from './components/GenreFilter'
import { MovieList } from './components/MovieList'
import { CacheStats } from './components/CacheStats'

function App() {
  const {
    movies,
    genres,
    loading,
    selectedGenre,
    searchQuery,
    handleSearch,
    handleGenreSelect,
    clearFilters,
  } = useMovies();

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎬 Movie Cache App</h1>
        <p className="subtitle">
          Aplicação React + TypeScript para ensinar conceitos de Cache
        </p>
      </header>

      <main className="app-main">
        <div className="sidebar">
          <CacheStats />
          
          <div className="info-panel">
            <h3>ℹ️ Como Funciona</h3>
            <ul>
              <li>✅ Dados são armazenados em cache após a primeira requisição</li>
              <li>⏱️ Cache expira após 5-10 minutos (dependendo do tipo)</li>
              <li>🚀 Requisições subsequentes são instantâneas (do cache)</li>
              <li>📊 Acompanhe as estatísticas de cache em tempo real</li>
              <li>🔥 Veja quais buscas são mais populares</li>
            </ul>
          </div>
          
          <div className="api-note">
            <p><strong>Nota:</strong> Esta aplicação usa dados mock para demonstração. 
            Para dados reais, configure uma API key do <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer">TMDB</a>.</p>
          </div>
        </div>

        <div className="content">
          <div className="controls">
            <SearchBar onSearch={handleSearch} />
            
            {(searchQuery || selectedGenre) && (
              <div className="active-filters">
                {searchQuery && (
                  <span className="filter-tag">
                    Busca: "{searchQuery}"
                  </span>
                )}
                {selectedGenre && (
                  <span className="filter-tag">
                    Gênero: {genres.find(g => g.id === selectedGenre)?.name}
                  </span>
                )}
                <button onClick={clearFilters} className="clear-filters">
                  ✖ Limpar filtros
                </button>
              </div>
            )}
          </div>

          {!searchQuery && (
            <GenreFilter
              genres={genres}
              selectedGenre={selectedGenre}
              onSelectGenre={handleGenreSelect}
            />
          )}

          <MovieList
            movies={movies}
            loading={loading}
            title={
              searchQuery
                ? `Resultados para "${searchQuery}"`
                : selectedGenre
                ? `Filmes de ${genres.find(g => g.id === selectedGenre)?.name}`
                : '🔥 Filmes Populares'
            }
          />
        </div>
      </main>
    </div>
  )
}

export default App
