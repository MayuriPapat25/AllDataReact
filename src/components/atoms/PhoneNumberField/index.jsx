
import { forwardRef } from "react"
import { cn } from "../../../../utils/utils"

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

                <div className="br-field-left">
                    {/* {required && <span className="mr-1 text-muted-foreground text-green-600">|</span>} */}
                    {countryCode && (
                        <h3 className="flex items-center px-3 py-2 border border-r-0 border-input bg-muted rounded-l-md text-sm text-muted-foreground">
                            {countryCode}
                        </h3>
                    )}

                    <input
                        ref={ref}
                        type="tel"
                        className={cn(
                            "w-full px-3 py-2 border-2 border-gray-300 text-sm",
                            // "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                            "placeholder:text-muted-foreground",
                            error && "border-destructive",
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
