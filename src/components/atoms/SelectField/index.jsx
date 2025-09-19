import React, { forwardRef } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../../../utils/utils"

const SelectField = forwardRef(
  ({ label, required, optional, error, options = [], className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {
          label &&
          <h3 className="block text-sm font-medium text-muted-foreground">
            {label}
            {optional && <span className="ml-2 text-xs text-muted-foreground">Optional</span>}
          </h3>
        }
        <div className="flex items-center">
          {label && required && <span className="mr-1 text-muted-foreground text-green-600">|</span>}
          <select
            ref={ref}
            className={cn(
              "px-3 py-2 border border-input bg-background rounded-md text-sm appearance-none",
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
          <ChevronDown className="-ml-7 pointer-events-none h-4 w-4 text-muted-foreground" />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  },
)


export default SelectField 
