import { useState } from "react"
import { TextField } from "./TextField"
import { Button } from "../Buttons/Button"

export function InputWithButton({
  placeholder = "",
  buttonText,
  onSubmit,
  disabled = false,
  className = "",
}) {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = () => {
    if (!value.trim()) return

    if (value.trim().toLowerCase() === "promocode") {
      // ✅ Valid promocode
      onSubmit(value.trim())
      setValue("")
      setError("")
    } else {
      // ❌ Invalid promocode
      setError("Clear or Apply Promocode before continuing.")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <TextField
          placeholder={placeholder}
          value={value}
          onChange={(val) => {
            setValue(val)   // `val` is already the string
            setError("")
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-0"
        />
        <Button
          variant="outline"
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="whitespace-nowrap"
        >
          {buttonText}
        </Button>
      </div>

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}
