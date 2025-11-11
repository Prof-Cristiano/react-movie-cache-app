# API Integration Details

## TMDB API Configuration

The application is configured to use The Movie Database (TMDB) API with the following credentials:

### API Credentials (Configured in .env)
- **API Key**: `0b4e573a2c729fa12dbb42818c6f96c3`
- **Read Access Token**: Bearer token configured for API v3 endpoints

### API Endpoints Used

The app integrates with the following TMDB API v3 endpoints:

1. **Popular Movies**
   - Endpoint: `/movie/popular`
   - Description: Get a list of movies ordered by popularity
   - Used in: "Popular" category button

2. **Top Rated Movies**
   - Endpoint: `/movie/top_rated`
   - Description: Get top-rated movies
   - Used in: "Top Rated" category button

3. **Now Playing Movies**
   - Endpoint: `/movie/now_playing`
   - Description: Get movies currently in theaters
   - Used in: "Now Playing" category button

4. **Search Movies**
   - Endpoint: `/search/movie`
   - Description: Search for movies by title
   - Status: API ready, UI implementation ready for future enhancement

5. **Movie Details**
   - Endpoint: `/movie/{movie_id}`
   - Description: Get detailed information about a specific movie
   - Status: API ready, UI implementation ready for future enhancement

## Authentication

The application uses Bearer token authentication for all API requests:

```javascript
headers: {
  'Authorization': `Bearer ${READ_ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
}
```

## Request Format

All requests follow this pattern:

```
https://api.themoviedb.org/3/{endpoint}?api_key={api_key}&{additional_params}
```

Example:
```
https://api.themoviedb.org/3/movie/popular?api_key=0b4e573a2c729fa12dbb42818c6f96c3&page=1
```

## Response Handling

- **Success**: Data is parsed and cached for 5 minutes
- **Error**: Error message displayed with retry option
- **Cache**: Subsequent requests use cached data until expiration

## Image Handling

Movie poster images are retrieved from TMDB's image CDN:

```
https://image.tmdb.org/t/p/{size}{poster_path}
```

Default size: `w500` (500px width)

## Rate Limits

TMDB API has rate limits:
- **Authenticated requests**: 40 requests per 10 seconds
- **Caching benefit**: Significantly reduces API calls, helping stay within limits

## Testing the Integration

To test the API integration:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open browser console to see cache logs:
   - First load: "Cache miss, fetching: /movie/popular?page=1"
   - Subsequent load (within 5 min): "Cache hit: /movie/popular?page=1"

3. Switch between categories to see different endpoints in action

4. Use "Clear Cache" button to force fresh API calls

## Troubleshooting

If movies don't load:
1. Check browser console for error messages
2. Verify `.env` file has correct credentials
3. Ensure environment variables start with `VITE_` prefix
4. Restart dev server after changing `.env` file
5. Check network tab to verify API requests are being made

## API Documentation

Full TMDB API documentation: https://developer.themoviedb.org/docs
