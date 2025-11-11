import { useState, useEffect } from 'react';
import { cacheService } from '../services/cacheService';
import { movieService } from '../services/movieService';

export function CacheStats() {
  const [stats, setStats] = useState({ size: 0, keys: [] as string[] });
  const [isExpanded, setIsExpanded] = useState(false);
  const [mostSearched, setMostSearched] = useState<{ term: string; count: number }[]>([]);
  
  useEffect(() => {
    // Atualiza stats a cada 2 segundos
    const interval = setInterval(() => {
      setStats(cacheService.getStats());
      setMostSearched(movieService.getMostSearchedTerms(5));
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleClearCache = () => {
    cacheService.clear();
    setStats({ size: 0, keys: [] });
  };
  
  return (
    <div className="cache-stats">
      <div className="cache-stats-header">
        <h3>📊 Cache Status</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="toggle-button"
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>
      
      <div className="cache-stats-summary">
        <div className="stat-item">
          <span className="stat-label">Itens em cache:</span>
          <span className="stat-value">{stats.size}</span>
        </div>
      </div>
      
      {isExpanded && (
        <div className="cache-stats-details">
          <div className="cache-section">
            <h4>Chaves no cache:</h4>
            {stats.keys.length > 0 ? (
              <ul className="cache-keys-list">
                {stats.keys.map((key) => (
                  <li key={key}>{key}</li>
                ))}
              </ul>
            ) : (
              <p className="empty-message">Nenhum item em cache</p>
            )}
          </div>
          
          {mostSearched.length > 0 && (
            <div className="cache-section">
              <h4>🔥 Buscas mais frequentes:</h4>
              <ul className="most-searched-list">
                {mostSearched.map(({ term, count }) => (
                  <li key={term}>
                    <span className="search-term">{term}</span>
                    <span className="search-count">{count}x</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <button 
            onClick={handleClearCache}
            className="clear-cache-button"
          >
            🗑️ Limpar Cache
          </button>
        </div>
      )}
    </div>
  );
}
