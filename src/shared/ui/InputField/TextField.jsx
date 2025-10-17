import React from "react";
import InputField from "./index"
export function TextField({ placeholder, value, onChange, className = "" }) {
  return (
    <InputField
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-3 py-2 border text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${className}`}
    />
    // <input
    //   type="text"
    //   placeholder={placeholder}
    //   value={value}
    //   onChange={(e) => onChange(e.target.value)}
    //   className={`w-1/2 px-3 py-2 border text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${className}`}
    // // />
  )
}
