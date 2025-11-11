import MovieList from './components/MovieList'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎬 Movie Cache App</h1>
        <p>Powered by TMDB API with intelligent caching</p>
      </header>
      <main>
        <MovieList />
      </main>
    </div>
  )
}

export default App
