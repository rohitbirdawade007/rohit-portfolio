import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Error recording for debugging white screens
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Global Error Caught:", { message, source, lineno, colno, error });
};

window.onunhandledrejection = function(event) {
  console.error("Unhandled Promise Rejection:", event.reason);
};

createRoot(document.getElementById("root")!).render(<App />);
