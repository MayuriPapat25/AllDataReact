export function PriceText({ amount, label, isTotal = false, isDiscount = false, className = "" }) {
  const formatPrice = (price) => {
    return price < 0 ? `-$${Math.abs(price).toFixed(2)}` : `$${price.toFixed(2)}`
  }

  const baseClasses = isTotal ? "text-h4 font-medium text-black" : isDiscount ? "text-md text-black" : "text-md text-black"

  return (
    <div className={`flex justify-between items-center ${className}`}>
      {label && <span className={baseClasses}>{label}</span>}
      <span className={`${baseClasses} ${isDiscount ? "text-red-600" : ""}`}>
        {formatPrice(amount)}
        {isTotal && <span className="text-error">*</span>}
      </span>
    </div>
  )
}
