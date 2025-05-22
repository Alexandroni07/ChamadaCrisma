import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CatequistaProvider } from './context/CatequistaContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CatequistaProvider>
      <App />
    </CatequistaProvider>
  </React.StrictMode>
)