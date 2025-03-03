import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './Route/Routes';
import { ParallaxProvider } from 'react-scroll-parallax';
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ParallaxProvider>
    <div className="max-w-screen-xl mx-auto">
        <RouterProvider router={router} />
      </div>
    </ParallaxProvider>
     
  </StrictMode>,
)
