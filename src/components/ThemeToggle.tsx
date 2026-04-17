import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = () => {
  const { 
    publicTheme, 
    adminTheme, 
    togglePublicTheme, 
    toggleAdminTheme, 
    isAdminPage 
  } = useTheme();

  const theme = isAdminPage ? adminTheme : publicTheme;
  const toggle = isAdminPage ? toggleAdminTheme : togglePublicTheme;

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="relative w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
    >
      <span className="absolute inset-0 rounded-full ring-0 group-hover:ring-2 ring-primary/30 transition-all duration-300" />
      {theme === 'light' ? (
        <Moon size={16} className="text-gray-700 dark:text-gray-200 transition-transform duration-300 group-hover:rotate-12" />
      ) : (
        <Sun size={16} className="text-yellow-500 transition-transform duration-300 group-hover:rotate-12" />
      )}
    </button>
  );
};

export default ThemeToggle;
