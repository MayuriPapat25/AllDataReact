"use client"

export function PlanDropdown({ value, onValueChange }) {
  const plans = [
    { value: "1-year", label: "1 Year" },
    { value: "1-month", label: "1 Month" },
    { value: "3-years", label: "3 Years" },
  ]

  return (
    <div>
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="block w-32 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm font-medium"
      >
        {plans.map((plan) => (
          <option key={plan.value} value={plan.value}>
            {plan.label}
          </option>
        ))}
      </select>
    </div>
  )
}
