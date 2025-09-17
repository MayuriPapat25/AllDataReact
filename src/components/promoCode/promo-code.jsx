"use client"

import { useState } from "react"

export function PromoCode({ value, onChange }) {
  const [showError, setShowError] = useState(false)

  const handleApply = () => {
    if (!value.trim()) {
      setShowError(true)
      return
    }
    setShowError(false)
    console.log("Applying promo code:", value)
  }

  return (
    <div
      className="border rounded-lg p-4"
      style={{
        borderColor: showError ? "var(--alldata-error)" : "var(--alldata-border)",
        backgroundColor: showError ? "#fef2f2" : "white",
      }}
    >
      <div className="space-y-3">
        <h3
          className="text-sm font-medium"
          style={{
            color: "var(--alldata-cart-item-title)",
            fontFamily: "var(--font-gotham)",
            fontSize: "14px",
          }}
        >
          Add Promo Code
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e.target.value)
              if (showError) setShowError(false)
            }}
            placeholder="Enter code"
            className="flex-1 px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            style={{
              borderColor: "var(--alldata-border)",
              fontFamily: "var(--font-gotham)",
              fontSize: "14px",
            }}
          />
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-white border rounded text-sm font-medium hover:bg-red-50"
            style={{
              borderColor: "var(--alldata-error)",
              color: "var(--alldata-error)",
              fontFamily: "var(--font-gotham)",
              fontSize: "14px",
            }}
          >
            APPLY
          </button>
        </div>
        {showError && (
          <p
            className="text-xs"
            style={{
              color: "var(--alldata-error)",
              fontFamily: "var(--font-gotham)",
              fontSize: "12px",
            }}
          >
            Clear or Apply Promo Code before continuing.
          </p>
        )}
      </div>
    </div>
  )
}
