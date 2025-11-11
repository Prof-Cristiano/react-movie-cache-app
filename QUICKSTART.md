# 🚀 Quick Start Guide

Get the Movie Cache App running in under 2 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Prof-Cristiano/react-movie-cache-app.git
cd react-movie-cache-app
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including React, Vite, and ESLint.

### 3. Configure API Credentials

The API credentials are already configured in the repository's `.env` file. If you need to use different credentials:

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your TMDB API credentials
nano .env  # or use your preferred editor
```

Required environment variables:
- `VITE_TMDB_API_KEY` - Your TMDB API key
- `VITE_TMDB_API_READ_ACCESS_TOKEN` - Your TMDB read access token

### 4. Start Development Server

```bash
npm run dev
```

The app will start at `http://localhost:5173`

### 5. Open in Browser

Navigate to `http://localhost:5173` and you should see the Movie Cache App!

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code quality with ESLint |

## Testing the Cache

1. **Open Browser Console** (F12 or Cmd+Option+I)
2. **Load the app** - You'll see: `Cache miss, fetching: /movie/popular?page=1`
3. **Switch categories and come back** - You'll see: `Cache hit: /movie/popular?page=1`
4. **Wait 5 minutes** - Cache expires, next load will fetch fresh data

## Features to Try

### Browse Movies by Category
- Click **"Popular"** to see most popular movies
- Click **"Top Rated"** to see highest-rated movies
- Click **"Now Playing"** to see current theatrical releases

### Test Caching
- Switch between categories multiple times
- Watch the browser console to see cache hits/misses
- Click **"Clear Cache"** to force fresh data retrieval

### Responsive Design
- Resize your browser window
- Test on mobile devices
- Check tablet breakpoints

## Troubleshooting

### Movies Not Loading?

1. **Check Console for Errors**
   - Open browser console (F12)
   - Look for red error messages

2. **Verify Environment Variables**
   ```bash
   cat .env
   ```
   Make sure both `VITE_TMDB_API_KEY` and `VITE_TMDB_API_READ_ACCESS_TOKEN` are set.

3. **Restart Dev Server**
   - Stop the server (Ctrl+C)
   - Run `npm run dev` again

4. **Clear Browser Cache**
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

### Build Errors?

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

- 📖 Read [README.md](README.md) for detailed documentation
- 🔧 Check [CACHING.md](CACHING.md) to understand the caching strategy
- 🌐 Review [API_INTEGRATION.md](API_INTEGRATION.md) for API details

## Production Deployment

### Build for Production

```bash
npm run build
```

Output will be in the `dist` folder, ready for deployment to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

### Preview Production Build

```bash
npm run preview
```

## Getting TMDB API Credentials

If you need your own credentials:

1. Go to [themoviedb.org](https://www.themoviedb.org/)
2. Create a free account
3. Navigate to Settings → API
4. Request an API key
5. Copy both the API key and Read Access Token
6. Add them to your `.env` file

## Support

For issues or questions:
- Check the documentation files
- Review the code comments
- Open an issue on GitHub

---

**Happy coding!** 🎬✨
