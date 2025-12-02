import { forwardRef } from "react"
import { cn } from "../../../shared/utils/utils"


const InputField = forwardRef(
  ({ id, label, value, required, onChange, onBlur, placeholder, inputMode, optional, maxLength, onKeyPress, error, helperText, errorText, className, type = "text", disabled, ...props }, ref) => {
    const describedById = id ? `${id}-error` : undefined
    // Determine the border class based on error state
    const borderClasses = error
      ? "border-2 border-error focus:border-error" // Red border on error and focus
      : "border-2 border-gray-300 focus:border-blue-500" // Default/Focus borders

    return (
      <div className="space-y-2">
        {label && (
          <label className="flex justify-between text-display-sm-medium text-muted-foreground">
            {label}
            {optional && <span className="ml-2 text-xs text-muted-foreground">Optional</span>}
          </label>
        )}

        <div className={cn(required && "br-field-left")}>
          <input
            name={id}
            ref={ref}
            value={value}
            placeholder={placeholder}
            id={id}
            type={type}
            className={cn(
              "w-full px-3 py-2 text-sm",
              "placeholder:text-muted-foreground",
              borderClasses, // Apply the determined border classes
              className,
            )}
            aria-invalid={Boolean(error)}
            aria-describedby={describedById}
            {...props}
            onChange={onChange}
            onBlur={onBlur}
            inputMode={inputMode}
            maxLength={maxLength}
            onKeyPress={onKeyPress}
            disabled={disabled}
          />
        </div>
        {error ? (
          <p className="text-xs mt-1 text-red-500">{errorText}</p>
        ) : (
          <p className="text-xs mt-1 text-gray-500">{helperText}</p>
        )}
      </div>
    )
  },
)

export default InputField
