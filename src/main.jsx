// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom' // GANTI BrowserRouter
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter> {/* PAKAI HashRouter */}
      <App />
    </HashRouter>
  </React.StrictMode>
)