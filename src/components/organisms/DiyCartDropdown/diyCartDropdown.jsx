import { Link } from "react-router-dom"
import { useState } from "react"
import { Button } from "../../atoms/Buttons/Button"
import { Icon } from "../../atoms/Icon/Icon"

export function DiyCartDropdown({ isOpen, onClose, className, cartData, cartCount }) {

  if (!isOpen) return null

  return (
    <div
      className={`absolute right-0 top-full mt-2 z-50 w-[225px] sm:w-80 md:w-96 max-w-[225px] sm:mx-0 ${className}`}
    >
      <div className="shadow-lg bg-white rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-xs text-gray-500">
            {cartCount} in cart
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
          {cartData.length === 0 ? (
            <div className="p-6 text-center text-gray-650 flex flex-col items-center">
              <Icon type="cart" className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cartData.map((item) => {
                console.log("item", item)
                return (

                  <div key={item.id} className="py-1">
                    <div className="text-sm font-gotham font-ultra text-black break-words">ALLDATA DIY</div>
                    <div className="text-sm font-gotham font-ultra text-black break-words">{item.vehicle}</div>
                    <div className="text-xs text-gray-600">
                      {item.price}/{item.duration}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartData.length > 0 && (
          <div className="px-4 py-4">
            <Link to="/diy-cart" onClick={onClose}>
              <Button
                variant="outline"
                className="btn btn-primary btn-full"
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
