import { useState } from "react";
import { CartDropdown } from "../Dropdown/cart-dropdown";

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
            🛒
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
