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
        try:
            # Encode client credentials
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
            
            response = requests.post(
                'https://accounts.spotify.com/api/token',
                headers=headers,
                data=data,
                timeout=10
            )
            
            if response.status_code == 200:
                return response.json().get('access_token')
            else:
                logger.error(f"Failed to get access token: {response.status_code} - {response.text}")
                return None
                
        except Exception as e:
            logger.error(f"Error getting access token: {str(e)}")
            return None
    
    def get_currently_playing(self, access_token: str) -> Optional[Dict[str, Any]]:
        """Get currently playing track"""
        try:
            headers = {'Authorization': f'Bearer {access_token}'}
            
            response = requests.get(
                'https://api.spotify.com/v1/me/player/currently-playing',
                headers=headers,
                timeout=10
            )
            
            if response.status_code == 200 and response.content:
                data = response.json()
                if data and data.get('item'):
                    return self.format_track_data(data, is_playing=data.get('is_playing', False))
            elif response.status_code == 204:
                # No content - nothing currently playing
                return None
            else:
                logger.warning(f"Currently playing request failed: {response.status_code}")
                return None
                
        except Exception as e:
            logger.error(f"Error getting currently playing: {str(e)}")
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
    try:
        # Get access token
        access_token = spotify_api.get_access_token()
        if not access_token:
            raise HTTPException(
                status_code=500, 
                detail="Failed to authenticate with Spotify"
            )
        
        # Try to get currently playing track first
        track_data = spotify_api.get_currently_playing(access_token)
        
        # If nothing is currently playing, get most recently played
        if not track_data:
            track_data = spotify_api.get_recently_played(access_token)
        
        # If still no data, return default response
        if not track_data:
            return {
                'title': 'No recent activity',
                'artists': ['Spotify'],
                'album': '',
                'album_image': None,
                'spotify_url': '',
                'is_playing': False,
                'preview_url': None
            }
        
        return track_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in now-playing endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error"
        ) 