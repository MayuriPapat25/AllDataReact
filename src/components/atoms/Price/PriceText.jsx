export function PriceText({ amount, label, isTotal = false, isDiscount = false, className = "" }) {
  const formatPrice = (price) => {
    return price < 0 ? `-$${Math.abs(price).toFixed(2)}` : `$${price.toFixed(2)}`
  }

  const baseClasses = isTotal ? "text-lg font-bold text-gray-900" : isDiscount ? "text-gray-700" : "text-gray-700"

  return (
    <div className={`flex justify-between items-center ${className}`}>
      {label && <span className={baseClasses}>{label}</span>}
      <span className={`${baseClasses} ${isDiscount ? "text-red-600" : ""}`}>
        {formatPrice(amount)}
        {isTotal && <span className="text-red-500">*</span>}
      </span>
    </div>
  )
}
