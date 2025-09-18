"use client"
import { useState } from "react"
import { CartDropdown } from "../organisms/CartDropdown"
import { Button } from "../atoms/Buttons/Button"

export default function ProHeader() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <header className="bg-gray-100 border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">ALLDATA Professional</h1>

        <Button
          onClick={() => setIsCartOpen(true)}
          variant="ghost"
          size="sm"
          className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          {/* Cart Icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="m2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>

          {/* Cart Badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </Button>
      </div>

      {/* Fullscreen Drawer Modal */}
      <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}
