# Spotify Integration Setup Guide

This guide will help you set up the Spotify "Now Playing" integration for your portfolio website.

## Prerequisites

- A Spotify account (free or premium)
- Access to Spotify Web API Dashboard
- Vercel account for deployment

## Step 1: Create a Spotify App

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create an App"
4. Fill in the app details:
   - **App Name**: `Portfolio Now Playing` (or any name you prefer)
   - **App Description**: `Displays currently playing music on portfolio website`
   - **Website**: Your portfolio URL (e.g., `https://parthivnair.com`)
   - **Redirect URI**: `http://localhost:3000/callback` (for development)
5. Accept the terms and create the app
6. Note down your **Client ID** and **Client Secret**

## Step 2: Set Up Redirect URI

1. In your Spotify app dashboard, click "Edit Settings"
2. Add these Redirect URIs:
   - `http://localhost:3000/callback` (for local development)
   - `https://yourdomain.com/callback` (replace with your actual domain)
3. Save the settings

## Step 3: Get Your Refresh Token

You need to go through the OAuth flow once to get a refresh token. Here's how:

### Option A: Using a Simple Script (Recommended)

1. Create a temporary HTML file on your local machine:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Spotify Auth</title>
  </head>
  <body>
    <h1>Spotify Authorization</h1>
    <button onclick="authorize()">Authorize with Spotify</button>
    <div id="result"></div>

    <script>
      const CLIENT_ID = "your_client_id_here"; // Replace with your client ID
      const REDIRECT_URI = "http://localhost:3000/callback";
      const SCOPES = "user-read-currently-playing user-read-recently-played";

      function authorize() {
        const authUrl =
          `https://accounts.spotify.com/authorize?` +
          `client_id=${CLIENT_ID}&` +
          `response_type=code&` +
          `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
          `scope=${encodeURIComponent(SCOPES)}`;

        window.location.href = authUrl;
      }

      // Handle the callback
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        document.getElementById("result").innerHTML = `
                <h2>Authorization Code:</h2>
                <p style="word-break: break-all;">${code}</p>
                <p>Copy this code and use it in the next step!</p>
            `;
      }
    </script>
  </body>
</html>
```

2. Replace `your_client_id_here` with your actual Client ID
3. Open this HTML file in your browser
4. Click "Authorize with Spotify"
5. Log in and grant permissions
6. Copy the authorization code from the URL or page

### Option B: Manual URL Method

1. Replace the placeholders in this URL with your actual values:

```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=user-read-currently-playing%20user-read-recently-played
```

2. Open the URL in your browser
3. Authorize the application
4. Copy the `code` parameter from the redirect URL

### Step 4: Exchange Authorization Code for Refresh Token

Use this curl command (replace the placeholders):

```bash
curl -X POST "https://accounts.spotify.com/api/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic $(echo -n 'YOUR_CLIENT_ID:YOUR_CLIENT_SECRET' | base64)" \
  -d "grant_type=authorization_code" \
  -d "code=YOUR_AUTHORIZATION_CODE" \
  -d "redirect_uri=http://localhost:3000/callback"
```

Or use this Python script:

```python
import requests
import base64

# Replace these with your actual values
CLIENT_ID = 'your_client_id'
CLIENT_SECRET = 'your_client_secret'
AUTHORIZATION_CODE = 'your_authorization_code'
REDIRECT_URI = 'http://localhost:3000/callback'

# Encode credentials
credentials = base64.b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode()

# Make the request
response = requests.post(
    'https://accounts.spotify.com/api/token',
    headers={
        'Authorization': f'Basic {credentials}',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data={
        'grant_type': 'authorization_code',
        'code': AUTHORIZATION_CODE,
        'redirect_uri': REDIRECT_URI
    }
)

if response.status_code == 200:
    tokens = response.json()
    print(f"Access Token: {tokens['access_token']}")
    print(f"Refresh Token: {tokens['refresh_token']}")
    print(f"Expires In: {tokens['expires_in']} seconds")
else:
    print(f"Error: {response.status_code}")
    print(response.text)
```

## Step 5: Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Navigate to your project
3. Go to Settings → Environment Variables
4. Add these environment variables:

| Name                    | Value                          | Description                     |
| ----------------------- | ------------------------------ | ------------------------------- |
| `SPOTIFY_CLIENT_ID`     | Your Client ID from Step 1     | Public identifier for your app  |
| `SPOTIFY_CLIENT_SECRET` | Your Client Secret from Step 1 | Secret key for your app         |
| `SPOTIFY_REFRESH_TOKEN` | Refresh token from Step 4      | Long-lived token for API access |

**Important**: Make sure to add these variables to all environments (Production, Preview, Development).

## Step 6: Deploy and Test

1. Deploy your application to Vercel
2. Visit your website
3. The "Now Playing" component should appear on your homepage
4. If you're currently playing music on Spotify, it should show your current track
5. If not playing, it will show your most recently played track

## Troubleshooting

### Common Issues:

1. **"Failed to authenticate with Spotify"**

   - Check that all environment variables are set correctly in Vercel
   - Verify your Client ID and Client Secret are correct
   - Make sure your refresh token is valid

2. **"No recent activity"**

   - This is normal if you haven't played music recently
   - Try playing a song on Spotify and refresh the page

3. **CORS errors**

   - The backend is configured to handle CORS, but make sure your domain is in the allowed origins list

4. **Component not loading**
   - Check the browser console for errors
   - Verify the API endpoint is accessible at `https://yourdomain.com/api/now-playing`

### Testing the API Directly

You can test the API endpoint directly by visiting:

```
https://yourdomain.com/api/now-playing
```

This should return a JSON response with your current or recent track information.

## Security Notes

- Never expose your Client Secret in frontend code
- The refresh token provides long-term access, so keep it secure
- Regularly rotate your credentials if needed
- The API only accesses your listening history, not account details

## Customization

The NowPlaying component can be customized by modifying:

- `src/components/NowPlaying.tsx` - Component styling and behavior
- `backend/api/spotify.py` - API logic and data formatting
- Refresh interval (currently 30 seconds) in the component

## API Scopes Used

- `user-read-currently-playing` - Access to currently playing track
- `user-read-recently-played` - Access to recently played tracks

These are read-only scopes that don't allow any modifications to your Spotify account.
