import { Link } from "react-router-dom"
import { useState } from "react"
import { Button } from "../atoms/Buttons/Button"
import { Icon } from "../atoms/Icon/Icon"

export function DiyCartDropdown({ isOpen, onClose, className }) {
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
      className={`absolute right-0 top-full mt-2 z-50 w-[250px] sm:w-80 md:w-96 max-w-[calc(100vw-2rem)] sm:mx-0 ${className}`}
    >
      <div className="bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm text-gray-500">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in cart
          </span>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="flex items-center justify-center p-1 rounded"
          >
            <Icon type="close" className="text-black" size={20} />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="max-h-80 sm:max-h-96 overflow-y-auto px-4 py-2">
          {cartItems.length === 0 ? (
            <div className="p-6 text-center text-gray-500 flex flex-col items-center">
              <Icon type="cart" className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="py-1">
                  <div className="text-sm text-gray-800 break-words">{item.name}</div>
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
          <div className="px-4 py-4">
            <Link to="/diy-cart" onClick={onClose}>
              <Button
                variant="outline"
                size="md"
                className="w-full cursor-pointer"
                style={{ borderColor: "#f75e00", color: "#f75e00" }}
              >
                VIEW CART
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
