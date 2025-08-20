
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './root/App'
import Home from './routes/Home'
import Listing from './routes/Listing'
import ProductDetail from './routes/ProductDetail'
import Cart from './routes/Cart'
import Checkout from './routes/Checkout'
import Payment from './routes/Payment'
import Confirmation from './routes/Confirmation'
import Profile from './routes/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Listing /> },
      { path: 'products/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'payment', element: <Payment /> },
      { path: 'confirmation', element: <Confirmation /> },
      { path: 'profile', element: <Profile /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
