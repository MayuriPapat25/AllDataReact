import { useState } from "react"
import CartModal from "../../Cart/professional/cart-modal"

export default function ProHeader() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <header className="bg-gray-100 border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">ALLDATA Professional</h1>

        <div className="flex items-center">
          <button
            className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setIsExpanded(true)}
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
        </div>
      </div>

      {/* Sidebar modal */}
      {isExpanded && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsExpanded(false)}
          />
          <div
            className={`fixed right-0 top-0 h-screen max-w-[500px] w-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
              isExpanded ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <CartModal onClose={() => setIsExpanded(false)} />
          </div>
        </>
      )}
    </header>
  )
}
