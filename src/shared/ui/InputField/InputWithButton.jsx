import { TextField } from "./TextField"
import { Button } from "../Buttons/Button"

export function InputWithButton({
  placeholder = "",
  buttonText,
  onSubmit,
  disabled,
  className = "",
  handleKeyDown,
  value,
  handlePromoCodeField,
}) {

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2  ">
        <TextField
          placeholder={placeholder}
          value={value}
          onChange={handlePromoCodeField}
          onKeyDown={handleKeyDown}
          className="border-2"
          disabled={disabled}
        />
        <Button
          variant="outline"
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
          className="btn mb-2"
        >
          {buttonText}
        </Button>
      </div>

    </div>
  )
}
