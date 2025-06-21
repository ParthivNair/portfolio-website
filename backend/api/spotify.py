import os
import base64
import requests
from fastapi import APIRouter, HTTPException
from typing import Optional, Dict, Any
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

class SpotifyAPI:
    def __init__(self):
        self.client_id = os.getenv('SPOTIFY_CLIENT_ID')
        self.client_secret = os.getenv('SPOTIFY_CLIENT_SECRET')
        self.refresh_token = os.getenv('SPOTIFY_REFRESH_TOKEN')
        
        if not all([self.client_id, self.client_secret, self.refresh_token]):
            logger.error("Missing Spotify environment variables")
            raise ValueError("Missing required Spotify environment variables")
    
    def get_access_token(self) -> Optional[str]:
        """Get access token using refresh token"""
        logger.info("🔑 [SpotifyAPI] Getting access token...")
        
        try:
            # Encode client credentials
            logger.info("🔐 [SpotifyAPI] Encoding client credentials...")
            credentials = base64.b64encode(
                f"{self.client_id}:{self.client_secret}".encode()
            ).decode()
            
            headers = {
                'Authorization': f'Basic {credentials}',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            
            data = {
                'grant_type': 'refresh_token',
                'refresh_token': self.refresh_token
            }
            
            logger.info("📡 [SpotifyAPI] Making token request to Spotify...")
            response = requests.post(
                'https://accounts.spotify.com/api/token',
                headers=headers,
                data=data,
                timeout=10
            )
            
            logger.info(f"📥 [SpotifyAPI] Token response: {response.status_code}")
            
            if response.status_code == 200:
                token_data = response.json()
                access_token = token_data.get('access_token')
                logger.info(f"✅ [SpotifyAPI] Access token obtained successfully")
                return access_token
            else:
                logger.error(f"❌ [SpotifyAPI] Failed to get access token: {response.status_code} - {response.text}")
                return None
                
        except Exception as e:
            logger.error(f"❌ [SpotifyAPI] Error getting access token: {str(e)}")
            return None
    
    def get_currently_playing(self, access_token: str) -> Optional[Dict[str, Any]]:
        """Get currently playing track"""
        logger.info("🎧 [SpotifyAPI] Getting currently playing track...")
        
        try:
            headers = {'Authorization': f'Bearer {access_token}'}
            
            logger.info("📡 [SpotifyAPI] Making currently-playing request to Spotify...")
            response = requests.get(
                'https://api.spotify.com/v1/me/player/currently-playing',
                headers=headers,
                timeout=10
            )
            
            logger.info(f"📥 [SpotifyAPI] Currently playing response: {response.status_code}")
            
            if response.status_code == 200 and response.content:
                logger.info("✅ [SpotifyAPI] Currently playing data received, parsing...")
                data = response.json()
                if data and data.get('item'):
                    track_data = self.format_track_data(data, is_playing=data.get('is_playing', False))
                    logger.info(f"✅ [SpotifyAPI] Currently playing track: {track_data['title']}")
                    return track_data
                else:
                    logger.info("ℹ️ [SpotifyAPI] Response received but no track item found")
                    return None
            elif response.status_code == 204:
                # No content - nothing currently playing
                logger.info("ℹ️ [SpotifyAPI] No content (204) - nothing currently playing")
                return None
            else:
                logger.warning(f"⚠️ [SpotifyAPI] Currently playing request failed: {response.status_code} - {response.text}")
                return None
                
        except Exception as e:
            logger.error(f"❌ [SpotifyAPI] Error getting currently playing: {str(e)}")
            return None
    
    def get_recently_played(self, access_token: str) -> Optional[Dict[str, Any]]:
        """Get most recently played track"""
        try:
            headers = {'Authorization': f'Bearer {access_token}'}
            
            response = requests.get(
                'https://api.spotify.com/v1/me/player/recently-played?limit=1',
                headers=headers,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                items = data.get('items', [])
                if items:
                    track_data = items[0]
                    return self.format_track_data({'item': track_data['track']}, is_playing=False)
            else:
                logger.error(f"Recently played request failed: {response.status_code}")
                return None
                
        except Exception as e:
            logger.error(f"Error getting recently played: {str(e)}")
            return None
    
    def format_track_data(self, data: Dict[str, Any], is_playing: bool = False) -> Dict[str, Any]:
        """Format track data for consistent response"""
        try:
            item = data.get('item', {})
            
            # Get artists
            artists = item.get('artists', [])
            artist_names = [artist.get('name', '') for artist in artists]
            
            # Get album info
            album = item.get('album', {})
            album_images = album.get('images', [])
            
            # Get the largest album image (first one is usually largest)
            album_image = album_images[0].get('url') if album_images else None
            
            return {
                'title': item.get('name', 'Unknown Track'),
                'artists': artist_names,
                'album': album.get('name', 'Unknown Album'),
                'album_image': album_image,
                'spotify_url': item.get('external_urls', {}).get('spotify', ''),
                'is_playing': is_playing,
                'preview_url': item.get('preview_url')
            }
            
        except Exception as e:
            logger.error(f"Error formatting track data: {str(e)}")
            return {
                'title': 'Unknown Track',
                'artists': ['Unknown Artist'],
                'album': 'Unknown Album',
                'album_image': None,
                'spotify_url': '',
                'is_playing': False,
                'preview_url': None
            }

spotify_api = SpotifyAPI()

@router.get("/now-playing")
async def get_now_playing():
    """
    Get currently playing track or most recently played track from Spotify.
    
    Environment variables required:
    - SPOTIFY_CLIENT_ID: Your Spotify app's client ID
    - SPOTIFY_CLIENT_SECRET: Your Spotify app's client secret  
    - SPOTIFY_REFRESH_TOKEN: Your refresh token (obtained through OAuth flow)
    
    To get these values:
    1. Create a Spotify app at https://developer.spotify.com/dashboard
    2. Add your redirect URI (e.g., http://localhost:3000/callback)
    3. Use the authorization code flow to get a refresh token
    4. Set these as environment variables in Vercel
    
    Returns:
        JSON object with track information including title, artists, album, 
        album image, Spotify URL, and playing status
    """
    logger.info("🎵 [API] /now-playing endpoint called")
    
    try:
        # Check environment variables
        logger.info("🔧 [API] Checking environment variables...")
        env_vars = {
            'SPOTIFY_CLIENT_ID': bool(spotify_api.client_id),
            'SPOTIFY_CLIENT_SECRET': bool(spotify_api.client_secret),
            'SPOTIFY_REFRESH_TOKEN': bool(spotify_api.refresh_token)
        }
        logger.info(f"🔧 [API] Environment variables status: {env_vars}")
        
        # Get access token
        logger.info("🔑 [API] Getting access token...")
        access_token = spotify_api.get_access_token()
        if not access_token:
            logger.error("❌ [API] Failed to get access token")
            raise HTTPException(
                status_code=500, 
                detail="Failed to authenticate with Spotify"
            )
        logger.info(f"✅ [API] Access token obtained: {access_token[:10]}...{access_token[-4:]}")
        
        # Try to get currently playing track first
        logger.info("🎧 [API] Trying to get currently playing track...")
        track_data = spotify_api.get_currently_playing(access_token)
        
        if track_data:
            logger.info(f"✅ [API] Currently playing track found: {track_data['title']} by {', '.join(track_data['artists'])}")
        else:
            logger.info("ℹ️ [API] No currently playing track, trying recently played...")
            
            # If nothing is currently playing, get most recently played
            track_data = spotify_api.get_recently_played(access_token)
            
            if track_data:
                logger.info(f"✅ [API] Recently played track found: {track_data['title']} by {', '.join(track_data['artists'])}")
            else:
                logger.warning("⚠️ [API] No recently played tracks found")
        
        # If still no data, return default response
        if not track_data:
            logger.info("📭 [API] Returning default 'no activity' response")
            return {
                'title': 'No recent activity',
                'artists': ['Spotify'],
                'album': '',
                'album_image': None,
                'spotify_url': '',
                'is_playing': False,
                'preview_url': None
            }
        
        logger.info(f"🎯 [API] Returning track data: {track_data}")
        return track_data
        
    except HTTPException as he:
        logger.error(f"❌ [API] HTTP Exception: {he.status_code} - {he.detail}")
        raise
    except Exception as e:
        logger.error(f"❌ [API] Unexpected error in now-playing endpoint: {str(e)}")
        logger.error(f"❌ [API] Error type: {type(e).__name__}")
        logger.error(f"❌ [API] Error details: {str(e)}")
        import traceback
        logger.error(f"❌ [API] Traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        ) 