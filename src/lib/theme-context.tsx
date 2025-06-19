"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'earth' | 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or default to 'dark'
  useEffect(() => {
    setMounted(true);
    
    // Only access localStorage in the browser
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme && ['earth', 'light', 'dark'].includes(savedTheme)) {
        setThemeState(savedTheme);
      }
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('earth', 'light', 'dark');
    
    // Add current theme class (dark is now default, so we add classes for all themes)
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    const themes: Theme[] = ['dark', 'earth', 'light'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 