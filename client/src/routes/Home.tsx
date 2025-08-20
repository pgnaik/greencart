
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="grid gap-6">
      <section className="rounded-2xl bg-emerald-50 p-8">
        <h1 className="text-2xl font-bold text-emerald-800">Shop Sustainable. Earn Green Credits. Boost your Eco Index.</h1>
        <p className="mt-2 max-w-2xl text-sm text-emerald-900">Every purchase shows your Eco Index change and grants credits you can redeem for extra discounts like CRED.</p>
        <Link to="/products" className="mt-4 inline-block btn btn-primary">Browse Products</Link>
      </section>
    </div>
  )
}
