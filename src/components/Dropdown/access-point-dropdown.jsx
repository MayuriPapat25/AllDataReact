export function AccessPointDropdown({ value, onChange, disabled = false }) {
  const handleIncrement = () => {
    if (!disabled) {
      onChange(value + 1)
    }
  }

  const handleDecrement = () => {
    if (!disabled && value > 1) {
      onChange(value - 1)
    }
  }

  return (
    <div className="flex items-center justify-center border border-gray-300 rounded w-20 h-8">
      <button
        onClick={handleDecrement}
        disabled={disabled || value <= 1}
        className="p-1 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number.parseInt(e.target.value) || 1)}
        disabled={disabled}
        className="w-8 h-full text-center border-0 focus:ring-0 text-sm disabled:bg-gray-50 flex items-center justify-center"
        min="1"
      />
      <button
        onClick={handleIncrement}
        disabled={disabled}
        className="p-1 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronUp className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  )
}
