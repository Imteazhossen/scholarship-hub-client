import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import { router } from './router/Router.jsx';
import AuthProvider from './Contexts/AuthContext/AuthProvider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="font-inter">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>

    </div>

  </StrictMode>,
)
