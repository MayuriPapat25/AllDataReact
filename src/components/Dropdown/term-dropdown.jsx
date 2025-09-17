"use client"

export function TermDropdown() {
  return (
    <div className="flex justify-between items-center">
      <label className="text-sm font-medium text-gray-700">Subscription Term</label>
      <select className="px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px]">
        <option value="12">12 Months</option>
        <option value="6">6 Months</option>
        <option value="24">24 Months</option>
      </select>
    </div>
  )
}
