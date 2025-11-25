export function PriceText({ amount, label, isTotal = false, discount, className = "" }) {
  // const formatPrice = (price) => {
  //   return price < 0 ? `-$${Math.abs(price).toFixed(2)}` : `$${price.toFixed(2)}`
  // }

  const baseClasses = isTotal ? "text-h4 font-medium text-black" : discount ? "text-md text-black" : "text-md text-black"

  return (
    <div className={`flex justify-between items-center ${className}`}>
      {label && <span className={baseClasses}>{label}</span>}
      <span className={`${baseClasses} ${discount ? "text-black" : ""}`}>
        ${amount}
        {isTotal && <span className="text-error">*</span>}
      </span>
    </div>
  )
}
