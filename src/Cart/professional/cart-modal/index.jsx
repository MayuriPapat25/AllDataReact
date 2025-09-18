"use client"

import { useState } from "react"
import { CartDropdown } from "../../../components/organisms/CartDropdown" // updated path
import { Button } from "../../../components/atoms/Buttons/Button" // updated path

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">ALLDATA Cart Demo</h1>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Cart Subscription Preview</h2>
          <p className="text-gray-600 mb-6">Click the button below to open the cart dropdown.</p>

          <Button onClick={() => setIsCartOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
            Open Cart ({3} items)
          </Button>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Component Structure</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Atoms:</strong> Button, Input, Select, Badge
            </p>
            <p>
              <strong>Molecules:</strong> CartItem, CartSection, CartSummary, PromoCodeSection, SubscriptionTerms
            </p>
            <p>
              <strong>Organisms:</strong> CartDropdown (combines all molecules into the complete cart experience)
            </p>
          </div>
        </div>

        <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </div>
  )
}
