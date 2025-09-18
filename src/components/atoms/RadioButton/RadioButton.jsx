"use client"

export function RadioButton({ name, value, checked, onChange, label, className = "" }) {
  return (
    <label className={`flex items-center cursor-pointer ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
      />
      <span className="ml-2 text-sm font-medium text-gray-700">{label}</span>
    </label>
  )
}
