import { useState } from "react";
import { CartDropdown } from "../atoms/Dropdown/cart-dropdown";

export function HeaderWithCart() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="bg-gray-100 border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">ALLDATA DIY</h1>

        <div className="relative">
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-2 rounded hover:bg-gray-200"
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
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
          </button>

          <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </div>
    </header>
  );
}
