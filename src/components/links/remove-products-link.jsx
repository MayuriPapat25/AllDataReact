"use client"

export function RemoveProductsLink({ onRemoveAll }) {
  return (
    <div className="flex justify-end">
      <button onClick={onRemoveAll} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
        Remove Added Products
      </button>
    </div>
  )
}
