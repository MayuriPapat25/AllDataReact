"use client"

import { Select } from "../../../components/atoms/SelectField" // updated path

export function SubscriptionTerms({ selectedTerm, onTermChange }) {
  const termOptions = [
    { value: "3 Months", label: "3 Months" },
    { value: "6 Months", label: "6 Months" },
    { value: "12 Months", label: "12 Months" },
  ]

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <Select label="Subscription Terms" options={termOptions} value={selectedTerm} onChange={onTermChange} />
    </div>
  )
}
