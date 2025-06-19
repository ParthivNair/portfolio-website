"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, TreePine } from 'lucide-react';
import { Button } from './button';
import { useTheme, type Theme } from '@/lib/theme-context';
import { useState, useRef, useEffect } from 'react';

const themeConfig = {
  dark: {
    icon: Moon,
    label: 'Dark Mode',
    description: 'Easy on the eyes',
    color: '#c084fc',
  },
  earth: {
    icon: TreePine,
    label: 'Earth Mode',
    description: 'Light brown & green',
    color: '#7FB069',
  },
  light: {
    icon: Sun,
    label: 'Light Mode',
    description: 'Clean and bright',
    color: '#6366f1',
  },
};

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentTheme = themeConfig[theme];
  const Icon = currentTheme.icon;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeSelect = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    setIsOpen(false);
  };

  // Don't render interactive elements until mounted
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className="relative overflow-hidden opacity-50"
        aria-label="Loading theme toggle"
      >
        <Moon className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative overflow-hidden hover:bg-accent/50 transition-colors"
        aria-label={`Current theme: ${currentTheme.label}. Click to change theme.`}
        title={`Current: ${currentTheme.label} - Click to change`}
      >
        <motion.div
          key={theme}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="flex items-center justify-center"
        >
          <Icon className="h-4 w-4" style={{ color: currentTheme.color }} />
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-lg z-50 overflow-hidden"
          >
            <div className="p-2 space-y-1">
              {(Object.entries(themeConfig) as [Theme, typeof themeConfig[Theme]][]).map(
                ([themeKey, config]) => (
                  <button
                    key={themeKey}
                    onClick={() => handleThemeSelect(themeKey)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-sm text-left transition-colors ${
                      theme === themeKey 
                        ? 'bg-secondary/20 text-foreground border border-border/50' 
                        : 'hover:bg-accent/50 hover:text-accent-foreground'
                    }`}
                  >
                    <config.icon 
                      className="h-4 w-4 flex-shrink-0" 
                      style={{ 
                        color: theme === themeKey ? config.color : config.color,
                        filter: theme === themeKey ? 'brightness(1.2) saturate(1.3)' : 'none'
                      }} 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{config.label}</div>
                      <div className={`text-xs ${
                        theme === themeKey ? 'text-muted-foreground/80' : 'text-muted-foreground'
                      }`}>
                        {config.description}
                      </div>
                    </div>
                    {theme === themeKey && (
                      <motion.div
                        layoutId="theme-indicator"
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: config.color }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 