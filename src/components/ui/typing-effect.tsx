import { useState, useEffect } from 'react';

interface TypingEffectProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  errorChance?: number;
  className?: string;
}

export function TypingEffect({ 
  phrases, 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  pauseTime = 2000,
  errorChance = 0.15,
  className = ""
}: TypingEffectProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFixingError, setIsFixingError] = useState(false);
  const [errorPosition, setErrorPosition] = useState(-1);
  const [hasErrorInCurrentPhrase, setHasErrorInCurrentPhrase] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    // Common typing mistakes
    const getTypingError = (correctChar: string): string => {
      const errorMap: { [key: string]: string[] } = {
        'a': ['s', 'q'],
        's': ['a', 'd', 'w'],
        'd': ['s', 'f'],
        'f': ['d', 'g'],
        'g': ['f', 'h'],
        'h': ['g', 'j'],
        'j': ['h', 'k'],
        'k': ['j', 'l'],
        'l': ['k', 'o'],
        'q': ['w', 'a'],
        'w': ['q', 'e'],
        'e': ['w', 'r'],
        'r': ['e', 't'],
        't': ['r', 'y'],
        'y': ['t', 'u'],
        'u': ['y', 'i'],
        'i': ['u', 'o'],
        'o': ['i', 'p'],
        'p': ['o', 'l'],
        'z': ['x', 'a'],
        'x': ['z', 'c'],
        'c': ['x', 'v'],
        'v': ['c', 'b'],
        'b': ['v', 'n'],
        'n': ['b', 'm'],
        'm': ['n', 'k']
      };
      
      const possibleErrors = errorMap[correctChar.toLowerCase()];
      if (possibleErrors && possibleErrors.length > 0) {
        return possibleErrors[Math.floor(Math.random() * possibleErrors.length)];
      }
      return correctChar;
    };
    
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      
      return () => clearTimeout(pauseTimeout);
    }

    const timeout = setTimeout(() => {
      if (isFixingError) {
        // Backspace to fix the error
        if (currentText.length > errorPosition) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Done fixing, continue typing correctly
          setIsFixingError(false);
          setErrorPosition(-1);
        }
      } else if (!isDeleting) {
        // Typing
        if (currentText.length < currentPhrase.length) {
          const nextChar = currentPhrase[currentText.length];
          
          // Decide if we should make an error
          const shouldMakeError = !hasErrorInCurrentPhrase && 
                                 Math.random() < errorChance && 
                                 currentText.length > 5 && // Don't make errors too early
                                 currentText.length < currentPhrase.length - 10; // Don't make errors too late
          
          if (shouldMakeError) {
            // Make a typing error
            const errorChar = getTypingError(nextChar);
            setCurrentText(currentText + errorChar);
            setErrorPosition(currentText.length);
            setHasErrorInCurrentPhrase(true);
            
            // Set up to fix the error after a short pause
            setTimeout(() => {
              setIsFixingError(true);
            }, 200 + Math.random() * 300); // Realistic pause before noticing error
          } else {
            // Type correctly
            setCurrentText(currentPhrase.slice(0, currentText.length + 1));
          }
        } else {
          // Finished typing, pause before deleting
          setIsPaused(true);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Finished deleting, move to next phrase and reset error state
          setIsDeleting(false);
          setHasErrorInCurrentPhrase(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? deletingSpeed : 
        isFixingError ? deletingSpeed * 0.7 : // Slightly faster when fixing errors
        typingSpeed + (Math.random() * 50 - 25)); // Add some natural variation

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, isFixingError, errorPosition, hasErrorInCurrentPhrase, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime, errorChance]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
} 