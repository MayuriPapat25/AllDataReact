import React, { forwardRef } from "react"

function cn(...classNames) {
    return classNames.filter(Boolean).join(" ")
}

const PhoneField = forwardRef(
    ({ label, required, optional, error, countryCode = "+49", className, ...props }, ref) => {
        return (
            <div className="space-y-2">
        <label className="block text-sm font-medium text-muted-foreground">
          {required && <span className="mr-1 text-muted-foreground">|</span>}
          {label}
          {optional && <span className="ml-2 text-xs text-muted-foreground">Optional</span>}
        </label>
        <div className="flex">
          <div className="flex items-center px-3 py-2 border border-r-0 border-input bg-muted rounded-l-md text-sm text-muted-foreground">
            {countryCode}
          </div>
          <input
            ref={ref}
            type="tel"
            className={cn(
              "flex-1 px-3 py-2 border border-input bg-background rounded-r-md text-sm",
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

PhoneField.displayName = "PhoneField"

export { PhoneField }
