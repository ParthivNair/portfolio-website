# Spotify "Now Playing" Integration

A complete Spotify integration for your portfolio website that displays your currently playing or recently played track.

## 🎵 Features

- **Real-time Updates**: Shows currently playing track with live status
- **Fallback Support**: Displays recently played track when nothing is currently playing
- **Modern UI**: Clean, responsive design with animated music bars
- **Spotify Integration**: Direct links to tracks on Spotify
- **Error Handling**: Graceful fallbacks and loading states
- **Auto-refresh**: Updates every 30 seconds

## 📁 Files Added/Modified

### Backend (FastAPI)

- `backend/api/spotify.py` - Main Spotify API integration
- `backend/main.py` - Added Spotify router
- `backend/test_spotify.py` - Test script for API validation

### Frontend (React/Next.js)

- `src/components/NowPlaying.tsx` - React component for displaying track info
- `src/app/page.tsx` - Integrated component into home page

### Documentation

- `SPOTIFY_SETUP.md` - Complete setup guide
- `SPOTIFY_INTEGRATION_README.md` - This file

## 🚀 Quick Start

1. **Set up Spotify App**: Follow `SPOTIFY_SETUP.md` for detailed instructions
2. **Add Environment Variables** to Vercel:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SPOTIFY_REFRESH_TOKEN`
3. **Deploy**: Push to your repository and deploy to Vercel
4. **Test**: Visit your website to see the integration

## 🔧 API Endpoint

**GET** `/api/now-playing`

Returns JSON with track information:

```json
{
  "title": "Song Title",
  "artists": ["Artist Name"],
  "album": "Album Name",
  "album_image": "https://...",
  "spotify_url": "https://open.spotify.com/track/...",
  "is_playing": true,
  "preview_url": "https://..."
}
```

## 🎨 Component Usage

```tsx
import NowPlaying from '@/components/NowPlaying';

// Basic usage
<NowPlaying />

// With custom styling
<NowPlaying className="my-custom-class" />
```

## 🧪 Testing

Run the test script to verify your setup:

```bash
cd backend
python test_spotify.py
```

## 🔒 Environment Variables

| Variable                | Description                      | Required |
| ----------------------- | -------------------------------- | -------- |
| `SPOTIFY_CLIENT_ID`     | Your Spotify app's client ID     | ✅       |
| `SPOTIFY_CLIENT_SECRET` | Your Spotify app's client secret | ✅       |
| `SPOTIFY_REFRESH_TOKEN` | OAuth refresh token              | ✅       |

## 🛠️ Customization

### Styling

- Modify `src/components/NowPlaying.tsx` for visual changes
- Update Tailwind classes for different colors/spacing
- Customize animated music bars

### Functionality

- Change refresh interval (default: 30 seconds)
- Modify API response format in `backend/api/spotify.py`
- Add additional Spotify data fields

### Error Handling

- Customize error messages and fallback states
- Add retry logic for failed requests
- Implement offline caching

## 📊 API Scopes Used

- `user-read-currently-playing` - Access to current track
- `user-read-recently-played` - Access to listening history

## 🔍 Troubleshooting

**Common Issues:**

- Missing environment variables → Check Vercel settings
- Authentication errors → Verify credentials and refresh token
- No data showing → Check if you've played music recently
- CORS errors → Ensure domain is in allowed origins

**Debug Steps:**

1. Test API endpoint directly: `https://yourdomain.com/api/now-playing`
2. Check browser console for JavaScript errors
3. Run backend test script
4. Verify environment variables in Vercel

## 🔄 How It Works

1. **Authentication**: Uses refresh token to get access token
2. **Data Fetching**: Tries currently playing, falls back to recent
3. **Frontend Display**: React component shows track with live updates
4. **Auto-refresh**: Polls API every 30 seconds for updates

## 📱 Responsive Design

The component is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## 🎯 Performance

- Efficient API calls with caching
- Lazy loading of album images
- Minimal bundle size impact
- Graceful degradation on errors
