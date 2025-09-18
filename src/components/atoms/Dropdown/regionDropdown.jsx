export function RegionDropdown({ value, onValueChange }) {
  const regions = [
    { value: "usa", label: "USA" },
    { value: "canada", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "eu", label: "European Union" },
  ]

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Region</label>
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="block w-full max-w-xs border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
      >
        {regions.map((region) => (
          <option key={region.value} value={region.value}>
            {region.label}
          </option>
        ))}
      </select>
    </div>
  )
}
