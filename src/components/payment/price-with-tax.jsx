"use client"

export function PriceWithTax({ totalAmount }) {
  return (
    <div className="border-t pt-4">
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-gray-900">Total Due:</span>
        <div className="text-right">
          <span className="text-lg font-bold text-gray-900">${totalAmount.toFixed(2)}*</span>
          <div className="text-xs text-gray-500">Taxes Not Included</div>
        </div>
      </div>
    </div>
  )
}
