import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize theme before rendering - default to light mode
const savedTheme = localStorage.getItem('theme');
const root = document.documentElement;

if (savedTheme === 'dark') {
  root.classList.add('dark');
} else {
  root.classList.remove('dark');
  // Ensure light mode is set
  if (!savedTheme) {
    localStorage.setItem('theme', 'light');
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
