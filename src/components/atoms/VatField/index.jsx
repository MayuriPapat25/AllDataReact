import React, { forwardRef } from "react"
import { cn } from "../../../../utils/utils"

const VatField = forwardRef(
  ({ label, required, optional, error, countryPrefix = "DE", className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {
          label &&
          <h3 className="flex text-sm font-medium text-muted-foreground justify-between">
            {label}
            {optional && <span className="ml-2 text-xs text-muted-foreground">Optional</span>}
          </h3>
        }

        <div className="flex items-center">
          {
            countryPrefix &&
            <h3 className="flex items-center px-3 py-2 border border-r-0 border-input bg-muted rounded-l-md text-sm font-medium">
              {countryPrefix}
            </h3>
          }

          <input
            ref={ref}
            type="text"
            className={cn(
              "flex-1 px-3 py-2 border-2 border-gray-300 rounded-r-md text-sm",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              "placeholder:text-muted-foreground",
              error && "border-destructive",
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-error">{error}</p>}
      </div>
    )
  },
)

VatField.displayName = "VatField"

export { VatField }
