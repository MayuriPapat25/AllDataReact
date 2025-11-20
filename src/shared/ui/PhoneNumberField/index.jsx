
import { forwardRef } from "react"
import { cn } from "../../utils/utils"
import { translations } from "../../translations";

const formatPhoneNumber = (value) => {
    if (!value) return value;
    const digits = value.replace(/\D/g, ""); // remove non-numeric
    const length = digits.length;

    if (length < 4) return digits;
    if (length < 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

const PhoneField = forwardRef(
    ({ label,
        required,
        value,
        onChange,
        error,
        errorText,
        helperText,
        optional,
        countryCode,
        className,
        ...props }, ref) => {

        const handleInputChange = (e) => {
            const formatted = formatPhoneNumber(e.target.value);
            onChange({ ...e, target: { ...e.target, value: formatted } });
        };

        return (
            <div className="space-y-2">
                {label && (
                    <label className="block text-display-sm-medium text-muted-foreground">
                        {label}
                        {optional && <span className="ml-2 text-xs text-muted-foreground">{translations?.optional}</span>}
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
                        value={value}
                        maxLength={12}
                        pattern="[0-9]*"
                        className={cn(
                            "w-full px-3 py-2 text-sm",
                            error
                                ? "border-2 border-error focus:border-error" // Red border on error
                                : "border-2 border-gray-300 focus:border-blue-500", // Default/Focus borders
                            "placeholder:text-muted-foreground",
                            className,
                        )}
                        onChange={handleInputChange}
                        {...props}
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

PhoneField.displayName = "PhoneField"

export default PhoneField
