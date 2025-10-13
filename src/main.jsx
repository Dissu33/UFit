import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// ➕ NEW: Import BrowserRouter for routing (often handled here in Vite apps)
import { BrowserRouter } from 'react-router-dom'; 

// ➕ NEW: Import the AuthProvider you created in src/context/AuthContext.jsx
import { AuthProvider } from './context/AuthContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ⚠️ REQUIRED: BrowserRouter must wrap the whole application for routing to work */}
    <BrowserRouter>
      {/* 🚀 REQUIRED: AuthProvider must wrap App to make global login state and functions available everywhere */}
      <AuthProvider> 
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);