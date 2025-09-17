"use client"

import { useState } from "react"
import { PrimaryButton } from "../Buttons/primaryButton"

export function PromoCodeBlock({ onApplyPromo }) {
  const [promoCode, setPromoCode] = useState("")
  const [error, setError] = useState("")

  const handleApply = () => {
    if (promoCode.trim()) {
      setError("")
      onApplyPromo(promoCode.trim())
    } else {
      setError("Please enter a valid promo code")
    }
  }

  const handleInputChange = (e) => {
    setPromoCode(e.target.value)
    if (error) setError("")
  }

  return (
    <div className="border-t pt-4 mt-4">
      <div className="text-sm font-medium mb-2">Add Promo Code</div>
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            placeholder="ENTER CODE"
            value={promoCode}
            onChange={handleInputChange}
            className={`
              w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400
              ${error ? "border-red-500" : "border-gray-300"}
            `}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        <PrimaryButton onClick={handleApply} className="px-6" disabled={!promoCode.trim()}>
          APPLY
        </PrimaryButton>
      </div>
    </div>
  )
}
