import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContex.jsx'
import React from 'react'


createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <BrowserRouter>
      <AuthProvider> <App /></AuthProvider>
    </BrowserRouter>
  </React.Fragment>
)
// This should be in your main.jsx or a separate registration file
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {
    scope: '/',
    type: 'module'
  });
}
