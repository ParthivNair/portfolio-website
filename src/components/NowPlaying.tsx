"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Music, ExternalLink } from 'lucide-react';

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
    <div className="flex items-end space-x-0.5 h-3 w-4">
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className="bg-green-400 rounded-sm animate-pulse"
          style={{
            width: '2px',
            height: `${Math.random() * 8 + 4}px`,
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
  const [isHovered, setIsHovered] = useState(false);

  const fetchNowPlaying = async () => {
    console.log('🎵 [NowPlaying] Starting fetch...');
    
    try {
      setError(null);
      
      // Use the backend API endpoint - dynamic URL for development/production
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8000/api/now-playing'
        : 'https://api.parthivnair.com/api/now-playing';
      
      console.log('🌐 [NowPlaying] API URL:', apiUrl);
      console.log('🔧 [NowPlaying] Environment:', process.env.NODE_ENV);
      
      console.log('📡 [NowPlaying] Making fetch request...');
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 [NowPlaying] Response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ [NowPlaying] HTTP error response body:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      console.log('🔄 [NowPlaying] Parsing JSON response...');
      const data: SpotifyTrack = await response.json();
      console.log('✅ [NowPlaying] Successfully parsed data:', data);
      
      setTrack(data);
      console.log('🎯 [NowPlaying] Track state updated successfully');
    } catch (err) {
      console.error('❌ [NowPlaying] Error fetching Spotify data:', err);
      console.error('❌ [NowPlaying] Error details:', {
        name: err instanceof Error ? err.name : 'Unknown',
        message: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined
      });
      setError(`Failed to load music data: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
      console.log('🏁 [NowPlaying] Fetch completed, loading set to false');
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    
    // Refresh every 30 seconds to get updated playing status
    const interval = setInterval(fetchNowPlaying, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Don't render anything if loading or error
  if (loading || error || !track) {
    return null;
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Widget */}
      <div className={`
        bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 
        rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
        ${isHovered ? 'scale-105' : 'scale-100'}
      `}>
        {/* Compact View */}
        <div className={`
          flex items-center space-x-3 p-3 transition-all duration-300 ease-in-out
          ${isHovered ? 'pb-2' : ''}
        `}>
          {/* Album Art */}
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0 shadow-sm">
            {track.album_image ? (
              <Image
                src={track.album_image}
                alt={`${track.album} album cover`}
                fill
                className="object-cover"
                sizes="40px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <Music className="h-4 w-4 text-gray-400" />
              </div>
            )}
          </div>

          {/* Compact Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              {track.is_playing && <MusicBars />}
              <span className="text-xs font-medium text-green-600 dark:text-green-400">
                Listening to
              </span>
            </div>
            
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {track.title}
            </div>
          </div>

          {/* Spotify Logo */}
          <div className="flex-shrink-0">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                className="w-2.5 h-2.5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Expanded View on Hover */}
        <div className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="px-3 pb-3 pt-1 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="space-y-1">
              {track.spotify_url ? (
                <Link
                  href={track.spotify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200 flex items-center">
                    {track.title}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </Link>
              ) : (
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {track.title}
                </div>
              )}
              
              <div className="text-xs text-gray-600 dark:text-gray-400">
                by {track.artists.join(', ')}
              </div>
              
              {track.album && (
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  on {track.album}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 