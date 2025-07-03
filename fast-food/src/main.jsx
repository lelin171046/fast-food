import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './Route/Routes';
import { ParallaxProvider } from 'react-scroll-parallax';
import AuthProvider from './Provider/AuthProvider';
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'

import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster></Toaster>
        <QueryClientProvider client={queryClient}>
          <ParallaxProvider>
            <div className="max-w-screen-xl mx-auto">
              <RouterProvider router={router} />
            </div>
          </ParallaxProvider>
        </QueryClientProvider>
      
    </AuthProvider>
  </StrictMode>,
)
