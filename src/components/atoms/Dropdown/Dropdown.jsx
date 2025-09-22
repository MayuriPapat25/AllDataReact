// atoms/Dropdown/Dropdown.jsx
export function Dropdown({ label, options, value, onValueChange, className = "" }) {
  return (
    <div className={`w-full max-w-xs mx-auto ${className}`}>
      {label && (
        <label className="block text-sm font-medium mb-2 text-left">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="block w-full border border-gray-300 p-2 text-sm focus:ring-orange-500 focus:border-orange-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
