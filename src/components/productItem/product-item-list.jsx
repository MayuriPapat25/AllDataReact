"use client"
import { useState } from "react"
import { Trash2 } from "lucide-react"
import { AccessPointDropdown } from "../Dropdown/access-point-dropdown"

export function ProductItemList({ product }) {
  const [quantity, setQuantity] = useState(1);

  // Guard: if product is missing, don’t render
  if (!product) {
    return (
      <div className="p-4 text-red-500">
        ⚠️ Product data is missing.
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        {/* Replaced next/image with standard img */}
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="text-lg font-medium">{product.name}</h3>
          <p className="text-gray-500">${product.price}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <AccessPointDropdown />

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          className="w-16 border rounded px-2 py-1 text-center"
        />

        <button className="text-red-500 hover:text-red-700">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
