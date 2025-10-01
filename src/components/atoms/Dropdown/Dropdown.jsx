// atoms/Dropdown/Dropdown.jsx
export function Dropdown({ label, options, value, onValueChange, className = "" }) {
  return (
    <div className={`w-full mx-auto ${className}`}>
      {label && (
        <label className="block text-sm font-medium mb-2 text-left">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="block w-full border-2 border-gray-300 p-2 text-sm focus:color-secondary rounded-none focus:secondary"
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
