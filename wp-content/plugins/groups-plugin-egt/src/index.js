import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DataProvider } from './context/DataProvider.jsx'
import './index.scss'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </StrictMode>,
)
