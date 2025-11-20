import { Button } from "../Buttons/Button"
import { Icon } from "../../../shared/ui/Icon/Icon"
import { useState, useEffect } from "react"
import { translations } from "../../translations"

export function CounterDropdown({ value, onChange, className = "", showLabel = true, disabled = false, onMaxLimitReached }) {

  const [inputValue, setInputValue] = useState(value)
  const MAX_LIMIT = 25
  const MIN_LIMIT = 1

  // Keep input value synced with prop
  useEffect(() => {
    setInputValue(value)
  }, [value])


  const handleInputChange = (e) => {
    const newValue = e.target.value
    // Allow only digits
    if (/^\d*$/.test(newValue)) {
      setInputValue(newValue)
      const numericValue = parseInt(newValue, 10)
      if (!isNaN(numericValue)) {
        if (numericValue > MAX_LIMIT) {
          onMaxLimitReached?.(true)
          onChange(MAX_LIMIT)
        } else {
          onMaxLimitReached?.(false) // 🔹 clear warning
          onChange(Math.max(MIN_LIMIT, numericValue))
        }
      }
    }
  }

  const decrement = () => {
    if (disabled) return
    const newValue = Math.max(MIN_LIMIT, inputValue - 1)
    onMaxLimitReached?.(false)
    setInputValue(newValue)
    onChange(newValue)
  }

  const increment = () => {
    if (disabled) return
    if (inputValue >= MAX_LIMIT) {
      onMaxLimitReached?.(true)
      return
    }
    const newValue = inputValue + 1
    onMaxLimitReached?.(false)
    setInputValue(newValue)
    onChange(newValue)
  }

  return (
    <div className={`inline-flex flex-col gap-1 ${className}`}>
      <div className={`inline-flex items-center gap-2 ${className} ${disabled ? "opacity-60 cursor-not-allowed" : ""
        }`}>
        {showLabel && (
          <span className={`text-sm whitespace-nowrap hidden md:block 
          ${disabled ? "text-gray-400" : "text-black"}`}>
            {translations?.access_points}
          </span>
        )}
        <div className={`flex items-center border-2 rounded-md ${disabled ? "border-gray-200 bg-gray-100" : "border-gray-300"}`}>
          <Button
            // onClick={() => !disabled && onChange(Math.max(1, value - 1))} // prevent click
            onClick={decrement}
            variant="ghost"
            size="sm"
            disabled={disabled} // 🔹 button-level disable
            className={`py-1 text-gray-600 ${disabled ? "hover:bg-transparent" : "hover:bg-gray-100"
              }`}
          >
            <Icon type="downArrow" className="w-5 h-5" />
          </Button>

          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            disabled={disabled}
            className={`w-12 text-center py-1 text-sm font-medium border-0 focus:outline-none bg-transparent ${disabled ? "text-gray-400" : "text-black"
              }`}
          />

          {/* <span className="px-2 py-1 text-sm font-medium min-w-[30px] text-center">{value}</span> */}
          <Button
            onClick={increment}
            // onClick={() => !disabled && onChange(value + 1)} // prevent click
            variant="ghost"
            size="sm"
            disabled={disabled} // 🔹 button-level disable
            className={`py-1 text-gray-600 ${disabled ? "hover:bg-transparent" : "hover:bg-gray-100"
              }`}
          >
            <Icon type='upArrow' className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
