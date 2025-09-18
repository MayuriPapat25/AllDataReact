"use client"

import { CartDropdown } from "../../../components/organisms/CartDropdown"

export default function CartModal({ onClose }) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 transition"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <CartDropdown isOpen={true} onClose={onClose} />
      </div>
    </div>
  )
}
