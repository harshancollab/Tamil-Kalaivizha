import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
// This should be in your main.jsx or a separate registration file
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { 
    scope: '/', 
    type: 'module' 
  });
}
