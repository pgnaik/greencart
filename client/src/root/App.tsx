
import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { CartProvider, useCart } from './CartContext'

function Header() {
  const nav = useNavigate()
  const { totalItems, credits } = useCart()
  return (
    <header className="border-b bg-white">
      <div className="container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-emerald-700">🌿 GreenCart</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/products" className="hover:underline">Shop</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
          <button className="badge border-emerald-200 text-emerald-700">Eco Index: 642</button>
          <button className="badge border-neutral-200">Credits: {credits} GC</button>
          <button onClick={() => nav('/cart')} className="btn btn-ghost">🛒 Cart ({totalItems})</button>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container py-8 text-xs text-neutral-500">
        © {new Date().getFullYear()} GreenCart • Prototype for demo only
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <CartProvider>
      <Header />
      <main className="container py-6">
        <Outlet />
      </main>
      <Footer />
    </CartProvider>
  )
}
