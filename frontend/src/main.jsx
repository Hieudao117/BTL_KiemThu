
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import i18n from './i18n';
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <StoreContextProvider>
        <ThemeProvider>
        <App key={i18n.language} />
        </ThemeProvider>
        
    </StoreContextProvider>
    
    </BrowserRouter>
)
