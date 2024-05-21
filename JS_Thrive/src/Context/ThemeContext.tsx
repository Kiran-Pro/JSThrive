import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextType {
  lightMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [lightMode, setLightMode] = useState(() => {
    const savedTheme = localStorage.getItem('lightMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    document.documentElement.className = lightMode ? 'light-theme' : '';
    localStorage.setItem('lightMode', JSON.stringify(lightMode));
  }, [lightMode]);

  const toggleTheme = () => {
    setLightMode((prevMode: unknown) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ lightMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
