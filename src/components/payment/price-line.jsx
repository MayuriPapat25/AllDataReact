export function PriceLine({ label, amount }) {
  const isNegative = amount < 0

  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-sm text-gray-700">{label}</span>
      <span className={`text-sm font-medium ${isNegative ? "text-green-600" : "text-gray-900"}`}>
        {isNegative ? "-" : ""}${Math.abs(amount).toFixed(2)}
      </span>
    </div>
  )
}
