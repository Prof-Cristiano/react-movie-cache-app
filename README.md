# 🎬 React Movie Cache App

A React application that displays movies from The Movie Database (TMDB) API with intelligent client-side caching.

## Features

- 🎥 Browse Popular, Top Rated, and Now Playing movies
- 💾 Intelligent client-side caching (5-minute TTL)
- ⚡ Fast loading with cached responses
- 🎨 Modern, responsive UI
- 🔄 Cache management controls

## Setup

1. Clone the repository:
```bash
git clone https://github.com/Prof-Cristiano/react-movie-cache-app.git
cd react-movie-cache-app
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Add your TMDB API credentials (see Configuration section)

4. Start the development server:
```bash
npm run dev
```

## Configuration

This app uses TMDB (The Movie Database) API. You need to:

1. Create an account at [https://www.themoviedb.org](https://www.themoviedb.org)
2. Get your API key from the API settings
3. Add your credentials to the `.env` file:

```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_API_READ_ACCESS_TOKEN=your_read_access_token_here
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code with ESLint

## Caching Strategy

The app implements a simple but effective caching strategy:
- API responses are cached in memory for 5 minutes
- Cache hits are logged to the console
- Users can manually clear the cache using the "Clear Cache" button
- Expired cache entries are automatically removed on access

## Technology Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **TMDB API** - Movie data source
- **Fetch API** - HTTP requests
- **Custom Cache** - In-memory caching implementation

## License

MIT
