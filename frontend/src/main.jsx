import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Router } from 'react-router-dom'
import ReactDom from 'react-dom/client'
import './index.scss'
import { AuthProvider } from './store/auth.store'
import { router } from './app/router.jsx'

ReactDom.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
