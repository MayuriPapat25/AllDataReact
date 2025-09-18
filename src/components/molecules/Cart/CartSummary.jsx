export function CartSummary({ subtotal, bundleDiscount, taxWarranty, total }) {
  return (
    <div className="border-t border-gray-200 pt-4 space-y-2 mt-6">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Subscription Subtotal</span>
        <span className="text-gray-900">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Bundle Discount</span>
        <span className="text-green-600">-${bundleDiscount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Tax Warranty</span>
        <span className="text-gray-900">${taxWarranty.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
        <span className="text-gray-900">Total Cost</span>
        <span className="text-gray-900">${total.toFixed(2)}</span>
      </div>
      <p className="text-xs text-gray-500">Taxes Not Included</p>
    </div>
  )
}
