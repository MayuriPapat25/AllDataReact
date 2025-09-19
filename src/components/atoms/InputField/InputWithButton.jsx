import { useState } from "react"
import { TextField } from "./TextField" // updated to match InputField/index.jsx
import { PrimaryButton } from "../Buttons/PrimaryButton"

export function InputWithButton({ placeholder = "", buttonText, onSubmit, disabled = false, className = "" }) {
  const [value, setValue] = useState("")

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim())
      setValue("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <TextField
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1"
      />
      <PrimaryButton
        variant="outline"
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
        className="whitespace-nowrap"
      >
        {buttonText}
      </PrimaryButton>
    </div>
  )
}
