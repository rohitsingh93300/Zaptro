import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { ToastContainer } from 'react-toastify';
import { ChevronUp } from 'lucide-react';
import ScrollToTop from 'react-scroll-to-top'
import { CartProvider } from './context/CartContext.jsx'
import { DataProvider } from './context/DataContext.jsx'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
    <CartProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <div className='relative'>
        <App />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        // transition={Bounce}
        />
        {/* <span className='absolute bottom-24 right-20 bg-red-500 text-white p-1 rounded-md'><ChevronUp /></span> */}
        <ScrollToTop color='white' smooth style={{backgroundColor:'#fa2d37', display:'flex', alignItems:'center', justifyContent:'center'}}/>
      </div>

    </ClerkProvider>
    </CartProvider>
    </DataProvider>
  </StrictMode>,
)
