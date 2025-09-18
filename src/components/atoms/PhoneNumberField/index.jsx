import React, { forwardRef } from "react"
import { cn } from "../../../../utils/utils"

const PhoneField = forwardRef(
    ({ label, required, optional, error, countryCode = "+49", className, ...props }, ref) => {
        return (
            <div className="space-y-2">
                {
                    label &&
                    <h3 className="block text-display-sm-medium text-muted-foreground">
                        {label}
                        {optional && <span className="ml-2 text-xs text-muted-foreground">Optional</span>}
                    </h3>
                }

                <div className="flex items-center">
                    {required && <span className="mr-1 text-muted-foreground">|</span>}
                    {
                        countryCode &&
                        <h3 className="flex items-center px-3 py-2 border border-r-0 border-input bg-muted rounded-l-md text-sm text-muted-foreground">
                            {countryCode}
                        </h3>
                    }

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
                {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
        )
    },
)

PhoneField.displayName = "PhoneField"

export { PhoneField }
