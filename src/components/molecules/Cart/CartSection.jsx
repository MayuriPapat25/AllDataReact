"use client"

import { CartItem } from "./CartItem" // already correct if CartSection and CartItem are in the same folder

export function CartSection({ title, items, onRemoveItem }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="space-y-0">
        {items.map((item) => (
          <CartItem key={item.id} {...item} onRemove={onRemoveItem} />
        ))}
      </div>
    </div>
  )
}
