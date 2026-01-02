import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="527023026393-2t62uq09g0lqst8qvgtlcsdedq5rtkrq.apps.googleusercontent.com">
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
