import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  publicTheme: Theme;
  adminTheme: Theme;
  togglePublicTheme: () => void;
  toggleAdminTheme: () => void;
  isAdminPage: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  publicTheme: 'light',
  adminTheme: 'light',
  togglePublicTheme: () => {},
  toggleAdminTheme: () => {},
  isAdminPage: false
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [publicTheme, setPublicTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('portfolio-theme') as Theme;
    return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  const [adminTheme, setAdminTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('admin-theme') as Theme;
    return saved || 'dark'; // Admin defaults to dark for a professional look
  });

  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    // Check if we are on an admin page
    const checkAdmin = () => {
      setIsAdminPage(window.location.pathname.startsWith('/admin'));
    };
    
    checkAdmin();
    window.addEventListener('popstate', checkAdmin);
    
    // Also listen for custom navigation events if any (or just use a MutationObserver on body/location works too)
    const interval = setInterval(checkAdmin, 500); // Fallback for some routers
    
    return () => {
      window.removeEventListener('popstate', checkAdmin);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = isAdminPage ? adminTheme : publicTheme;
    
    if (currentTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('portfolio-theme', publicTheme);
    localStorage.setItem('admin-theme', adminTheme);
  }, [publicTheme, adminTheme, isAdminPage]);

  const togglePublicTheme = () => setPublicTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleAdminTheme = () => setAdminTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ 
      publicTheme, 
      adminTheme, 
      togglePublicTheme, 
      toggleAdminTheme, 
      isAdminPage 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
