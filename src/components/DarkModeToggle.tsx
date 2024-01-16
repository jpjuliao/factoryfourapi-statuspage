import React, { useEffect, useCallback } from 'react';
import { DarkModeToggleProps } from '../types';

// DarkModeToggle component that handles dark mode toggling
const DarkModeToggle: React.FC<DarkModeToggleProps> = React.memo((
  { darkMode, onDarkModeChange }) => {
    
  // useCallback to memoize the checkDarkMode function
  const checkDarkMode = useCallback(() => {
    // Use window.matchMedia to check for dark mode preference
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Trigger the callback with the initial dark mode value
    onDarkModeChange(darkModeQuery.matches);

    // Event handler for changes in dark mode preference
    const handleChange = (event: MediaQueryListEvent) => {
      // Trigger the callback with the updated dark mode value
      onDarkModeChange(event.matches);
    };

    // Add event listener for changes in dark mode preference
    darkModeQuery.addEventListener('change', handleChange);

    // Cleanup function to remove event listener when the component is unmounted
    return () => {
      darkModeQuery.removeEventListener('change', handleChange);
    };
  }, [onDarkModeChange]);

  // useEffect to invoke the checkDarkMode function on mount
  useEffect(() => {
    checkDarkMode();
  }, [checkDarkMode]);

  // Render the dark mode toggle button
  return (
    <button className="darkModeToggle" onClick={() => onDarkModeChange(!darkMode)}>
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
});

export default DarkModeToggle;
