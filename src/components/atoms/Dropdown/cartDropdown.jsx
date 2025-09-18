import { Link } from "react-router-dom"
import { useState } from "react"
import { Button } from "../Buttons/Button"

export function CartDropdown({ isOpen, onClose, className }) {
  const [cartItems] = useState([
    {
      id: "1",
      name: "ALLDATA DIY 2022 AUDI A5 QUATTRO COUPE 45 (FPD) L4-2.0L TURBO (DPAA) MFI",
      price: "$125.98",
      duration: "7 years",
    },
    {
      id: "2",
      name: "ALLDATA DIY 2014 PORSCHE 911 CARRERA 4S CABRIOLET (991) F6-3.8L",
      price: "$125.98",
      duration: "7 years",
    },
  ])

  if (!isOpen) return null

  return (
    <div
      className={`absolute right-0 top-full mt-2 z-50 w-80 sm:w-96 max-w-[calc(100vw-2rem)] mx-4 sm:mx-0 ${className}`}
    >
      <div className="bg-white shadow-lg rounded-lg border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className="text-sm font-medium text-gray-800">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in cart
          </span>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 flex items-center justify-center rounded"
          >
            ✕
          </Button>
        </div>

        {/* Cart Items */}
        <div className="max-h-80 sm:max-h-96 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              🛒
              <p className="mt-2 text-sm">Your cart is empty</p>
            </div>
          ) : (
            <div className="px-4 py-2">
              {cartItems.map((item) => (
                <div key={item.id} className="py-3 border-b last:border-b-0">
                  <div className="text-sm font-medium text-gray-800 break-words">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    {item.price}/{item.duration}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-4 py-4 border-t">
            <Link to="/diy-cart" onClick={onClose}>
              <Button variant="primary" size="md" className="w-full">
                VIEW CART
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
