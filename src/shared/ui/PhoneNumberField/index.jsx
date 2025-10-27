
import { forwardRef } from "react"
import { cn } from "../../utils/utils"

const PhoneField = forwardRef(
    ({ label, required, optional, error, countryCode, className, onChange, ...props }, ref) => {
        return (
            <div className="space-y-2">
                {label && (
                    <label className="block text-display-sm-medium text-muted-foreground">
                        {label}
                        {optional && <span className="ml-2 text-xs text-muted-foreground">Optional</span>}
                    </label>
                )}

                <div className={cn(required && "br-field-left")}>
                    {countryCode && (
                        <h3 className={cn(
                            "flex items-center px-3 py-2 border border-r-0 bg-muted rounded-l-md text-sm text-muted-foreground",
                            error ? "border-error" : "border-gray-300" // Apply red border on error
                        )}>
                            {countryCode}
                        </h3>
                    )}

                    <input
                        ref={ref}
                        type="tel"
                        pattern="[0-9]*"
                        className={cn(
                            "w-full px-3 py-2 text-sm",
                            error
                                ? "border-2 border-error focus:border-error" // Red border on error
                                : "border-2 border-gray-300 focus:border-blue-500", // Default/Focus borders
                            "placeholder:text-muted-foreground",
                            className,
                        )}
                        onChange={onChange}
                        {...props}
                    />
                </div>
                {error && <p className="text-sm text-error">{error}</p>}
            </div>
        )
    },
)

PhoneField.displayName = "PhoneField"

export default PhoneField
