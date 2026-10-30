import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'
import axios from 'axios'

// L'API répond désormais avec de vrais codes HTTP (400, 401, 409...).
// Les composants lisent response.data.success : on ne laisse pas axios lever d'exception.
axios.defaults.validateStatus = () => true

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </BrowserRouter>
)
