#!/usr/bin/env python3
"""
Test script for Spotify API integration.
Run this to verify your Spotify API setup is working correctly.

Usage:
    python test_spotify.py
"""

import os
import sys
from api.spotify import spotify_api

def test_spotify_integration():
    """Test the Spotify API integration"""
    print("🎵 Testing Spotify API Integration...\n")
    
    # Check environment variables
    print("1. Checking environment variables...")
    required_vars = ['SPOTIFY_CLIENT_ID', 'SPOTIFY_CLIENT_SECRET', 'SPOTIFY_REFRESH_TOKEN']
    missing_vars = []
    
    for var in required_vars:
        value = os.getenv(var)
        if not value:
            missing_vars.append(var)
        else:
            print(f"   ✅ {var}: {'*' * 10}...{value[-4:]}")
    
    if missing_vars:
        print(f"   ❌ Missing environment variables: {', '.join(missing_vars)}")
        print("   Please set these in your environment or .env file")
        return False
    
    print("   ✅ All environment variables are set\n")
    
    # Test access token
    print("2. Testing access token...")
    try:
        access_token = spotify_api.get_access_token()
        if access_token:
            print(f"   ✅ Access token obtained: {access_token[:10]}...{access_token[-4:]}")
        else:
            print("   ❌ Failed to get access token")
            return False
    except Exception as e:
        print(f"   ❌ Error getting access token: {str(e)}")
        return False
    
    print()
    
    # Test currently playing
    print("3. Testing currently playing...")
    try:
        current_track = spotify_api.get_currently_playing(access_token)
        if current_track:
            print("   ✅ Currently playing track found:")
            print(f"      Title: {current_track['title']}")
            print(f"      Artist(s): {', '.join(current_track['artists'])}")
            print(f"      Album: {current_track['album']}")
            print(f"      Playing: {current_track['is_playing']}")
        else:
            print("   ℹ️  No track currently playing")
    except Exception as e:
        print(f"   ❌ Error getting currently playing: {str(e)}")
    
    print()
    
    # Test recently played
    print("4. Testing recently played...")
    try:
        recent_track = spotify_api.get_recently_played(access_token)
        if recent_track:
            print("   ✅ Recently played track found:")
            print(f"      Title: {recent_track['title']}")
            print(f"      Artist(s): {', '.join(recent_track['artists'])}")
            print(f"      Album: {recent_track['album']}")
        else:
            print("   ❌ No recently played tracks found")
            return False
    except Exception as e:
        print(f"   ❌ Error getting recently played: {str(e)}")
        return False
    
    print()
    print("🎉 Spotify API integration test completed successfully!")
    print("Your Now Playing component should work correctly.")
    return True

if __name__ == "__main__":
    # Load environment variables from .env file if it exists
    try:
        from dotenv import load_dotenv
        load_dotenv()
        print("📁 Loaded environment variables from .env file\n")
    except ImportError:
        print("💡 Tip: Install python-dotenv to load .env files automatically\n")
    
    success = test_spotify_integration()
    sys.exit(0 if success else 1) 