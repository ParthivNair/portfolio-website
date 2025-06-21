"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Music, ExternalLink, Loader2 } from 'lucide-react';

interface SpotifyTrack {
  title: string;
  artists: string[];
  album: string;
  album_image: string | null;
  spotify_url: string;
  is_playing: boolean;
  preview_url?: string | null;
}

interface NowPlayingProps {
  className?: string;
}

// Animated music bars component
const MusicBars = () => {
  return (
    <div className="flex items-end space-x-1 h-4 w-6">
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className="bg-green-500 rounded-sm animate-pulse"
          style={{
            width: '2px',
            height: `${Math.random() * 12 + 4}px`,
            animationDelay: `${bar * 0.1}s`,
            animationDuration: `${0.5 + Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function NowPlaying({ className = "" }: NowPlayingProps) {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNowPlaying = async () => {
    try {
      setError(null);
      
      // Use the backend API endpoint - dynamic URL for development/production
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8000/api/now-playing'
        : 'https://parthivnair.com/api/now-playing';
        
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SpotifyTrack = await response.json();
      setTrack(data);
    } catch (err) {
      console.error('Error fetching Spotify data:', err);
      setError('Failed to load music data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    
    // Refresh every 30 seconds to get updated playing status
    const interval = setInterval(fetchNowPlaying, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className={`w-full max-w-md ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`w-full max-w-md ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
              <Music className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!track) {
    return null;
  }

  return (
    <Card className={`w-full max-w-md hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          {/* Album Art */}
          <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
            {track.album_image ? (
              <Image
                src={track.album_image}
                alt={`${track.album} album cover`}
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Music className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <div className="flex items-center space-x-2 min-w-0">
                {track.is_playing && <MusicBars />}
                <span className="text-xs font-medium text-green-600">
                  {track.is_playing ? 'Now Playing' : 'Recently Played'}
                </span>
              </div>
            </div>
            
            <div className="space-y-1">
              {track.spotify_url ? (
                <Link
                  href={track.spotify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <h3 className="font-medium text-sm truncate group-hover:text-green-600 transition-colors duration-200 flex items-center">
                    {track.title}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </h3>
                </Link>
              ) : (
                <h3 className="font-medium text-sm truncate">{track.title}</h3>
              )}
              
              <p className="text-xs text-muted-foreground truncate">
                {track.artists.join(', ')}
              </p>
              
              {track.album && (
                <p className="text-xs text-muted-foreground truncate">
                  {track.album}
                </p>
              )}
            </div>
          </div>

          {/* Spotify Logo */}
          <div className="flex-shrink-0">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 