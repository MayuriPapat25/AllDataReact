import React, { forwardRef } from "react"
import { cn } from "../../../utils/utils"

const SelectField = forwardRef(
  ({ label, required, optional, error, options = [], className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted-foreground">
          {label}
          {optional && <span className="ml-2 text-xs text-muted-foreground">Optional</span>}
        </label>
        <div className="flex items-center">
          {required && <span className="mr-1 text-muted-foreground">|</span>}
          <select
            ref={ref}
            className={cn(
              "w-full px-3 py-2 border border-input bg-background rounded-md text-sm appearance-none",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              error && "border-destructive",
              className,
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  },
)

SelectField.displayName = "SelectField"

export { SelectField }
