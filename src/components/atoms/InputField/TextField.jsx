import React from "react";

export function TextField({ placeholder, value, onChange, className = "" }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${className}`}
    />
  )
}
