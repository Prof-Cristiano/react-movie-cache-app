import type { CacheEntry } from '../types/movie';

/**
 * CacheService: Implementa um sistema de cache em memória para armazenar dados da API.
 * 
 * Funcionalidades:
 * - Armazena dados com tempo de expiração configurável
 * - Gerencia cache de filmes populares, por categoria e buscas
 * - Implementa estratégia LRU (Least Recently Used) para limitar o tamanho do cache
 */
class CacheService {
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutos em milissegundos
  private readonly MAX_CACHE_SIZE = 100; // Máximo de entradas no cache
  
  /**
   * Adiciona um item ao cache com tempo de expiração
   */
  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    const now = Date.now();
    const entry: CacheEntry<T> = {
      data,
      timestamp: now,
      expiresAt: now + ttl,
    };
    
    // Se o cache está cheio, remove o item mais antigo
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      const oldestKey = this.findOldestEntry();
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }
    
    this.cache.set(key, entry);
    console.log(`[Cache] Item armazenado: ${key} (expira em ${ttl / 1000}s)`);
  }
  
  /**
   * Recupera um item do cache se ele existir e não estiver expirado
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      console.log(`[Cache] Miss: ${key}`);
      return null;
    }
    
    // Verifica se o item expirou
    if (Date.now() > entry.expiresAt) {
      console.log(`[Cache] Expired: ${key}`);
      this.cache.delete(key);
      return null;
    }
    
    console.log(`[Cache] Hit: ${key}`);
    return entry.data as T;
  }
  
  /**
   * Remove um item específico do cache
   */
  delete(key: string): void {
    this.cache.delete(key);
    console.log(`[Cache] Item removido: ${key}`);
  }
  
  /**
   * Limpa todo o cache
   */
  clear(): void {
    this.cache.clear();
    console.log('[Cache] Cache limpo completamente');
  }
  
  /**
   * Retorna estatísticas do cache
   */
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
  
  /**
   * Encontra a entrada mais antiga no cache (para implementar LRU)
   */
  private findOldestEntry(): string | null {
    let oldestKey: string | null = null;
    let oldestTimestamp = Infinity;
    
    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTimestamp) {
        oldestTimestamp = entry.timestamp;
        oldestKey = key;
      }
    }
    
    return oldestKey;
  }
  
  /**
   * Remove entradas expiradas do cache
   */
  clearExpired(): void {
    const now = Date.now();
    let removed = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
        removed++;
      }
    }
    
    if (removed > 0) {
      console.log(`[Cache] ${removed} itens expirados removidos`);
    }
  }
}

// Exporta uma instância singleton do cache
export const cacheService = new CacheService();

// Limpa itens expirados a cada minuto
setInterval(() => {
  cacheService.clearExpired();
}, 60 * 1000);
