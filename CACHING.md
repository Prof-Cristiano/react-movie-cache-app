# Caching Strategy

## Overview

The React Movie Cache App implements an intelligent in-memory caching system to reduce API calls to TMDB and improve application performance.

## Cache Implementation

### Location
- **Cache Module**: `src/utils/cache.js`
- **Usage**: `src/services/tmdb.js`

### How It Works

1. **Cache Storage**: Uses JavaScript `Map` for in-memory key-value storage
2. **TTL (Time To Live)**: Default 5 minutes (300,000 ms)
3. **Cache Key Format**: `tmdb:{endpoint}` (e.g., `tmdb:/movie/popular?page=1`)

### Cache Lifecycle

```javascript
// When fetching data:
1. Check if data exists in cache
2. If exists and not expired → return cached data
3. If missing or expired → fetch from API
4. Store fresh data in cache with expiration timestamp
```

### Cache Operations

- **Set**: Store data with automatic expiration timestamp
- **Get**: Retrieve data, automatically removing expired entries
- **Has**: Check if valid (non-expired) data exists
- **Clear**: Remove all cached entries
- **Delete**: Remove specific cache entry

## Benefits

1. **Reduced API Calls**: Subsequent requests for the same data use cache
2. **Faster Load Times**: No network latency for cached data
3. **Better UX**: Instant responses for repeated actions
4. **API Rate Limits**: Helps stay within TMDB API rate limits

## Monitoring

Cache hits and misses are logged to the browser console:
- `Cache hit: /movie/popular?page=1` - Data served from cache
- `Cache miss, fetching: /movie/popular?page=1` - New API call made

## Manual Cache Control

Users can manually clear the cache using the "Clear Cache" button in the UI, which is useful for:
- Forcing fresh data retrieval
- Testing purposes
- Troubleshooting stale data issues

## Configuration

To modify the cache TTL, edit `src/utils/cache.js`:

```javascript
// Change the TTL (in milliseconds)
export default new Cache(5 * 60 * 1000); // 5 minutes
```

Common TTL values:
- 1 minute: `60 * 1000`
- 5 minutes: `5 * 60 * 1000` (default)
- 30 minutes: `30 * 60 * 1000`
- 1 hour: `60 * 60 * 1000`
