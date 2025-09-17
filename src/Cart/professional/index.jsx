"use client"

import { useState } from "react"
import CartModal from "./cart-modal/index.jsx"

export default function HomePage() {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/alldata-logo.jpg" alt="ALLDATA" className="h-10" />
            </div>

            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium border-b-2 border-red-500"
              >
                PRODUCTS
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                SUPPORT
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                RESOURCES
              </a>
            </nav>

            <div className="flex items-center">
              <button
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
              >
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
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              <div
                className={`fixed right-0 top-0 h-screen max-w-[900px] w-full sm:w-auto bg-gray-50 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
                  isExpanded ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <CartModal onClose={() => setIsExpanded(false)} />
              </div>

              {isExpanded && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setIsExpanded(false)}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">ALLDATA Products</h1>
          <p className="text-gray-600">
            Click the cart icon in the header to view your cart subscription preview.
          </p>
        </div>
      </main>
    </div>
  )
}
