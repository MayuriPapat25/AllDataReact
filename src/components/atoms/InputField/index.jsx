import React, { forwardRef } from "react"
import { cn } from "../../../../utils/utils"

const InputField = forwardRef(
  ({ label, required, optional, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="flex text-sm font-medium text-muted-foreground justify-between">
          {label}
          {optional && <span className="ml-2 text-xs text-muted-foreground">Optional</span>}
        </label>
        <div className="flex items-center">
          {required && <span className="mr-1 text-muted-foreground">|</span>}
          <input
            ref={ref}
            className={cn(
              "w-full px-3 py-2 border border-input bg-background rounded-md text-sm",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              "placeholder:text-muted-foreground",
              error && "border-destructive",
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  },
)

InputField.displayName = "InputField"

export { InputField }
