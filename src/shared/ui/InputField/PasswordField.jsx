import { useState, useEffect } from "react"
import { Button } from "../../../shared/ui/Buttons/Button"

const PasswordField = ({
    id,
    label,
    value = "",
    onChange,
    onBlur,
    error,
    placeholder = "••••••••••",
    helperText,
    className = "",
    required = false,
}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [validationError, setValidationError] = useState("")

    const validatePassword = (password) => {
        if (!password) return ""

        if (password.length < 8) {
            return "Password must be at least 8 characters long"
        }

        let types = 0
        if (/[0-9]/.test(password)) types++ // number
        if (/[a-z]/.test(password)) types++ // lowercase
        if (/[A-Z]/.test(password)) types++ // uppercase
        if (/[!@#$%&? ,*]/.test(password)) types++ // symbol

        if (types < 3) {
            return "Password must include 3 of the following 4 character types: 1 number, 1 lowercase letter, 1 uppercase letter, 1 symbol"
        }

        return ""
    }

    useEffect(() => {
        if (value) {
            setValidationError(validatePassword(value))
        } else {
            setValidationError("")
        }
    }, [value])

    const handleChange = (e) => {
        const newValue = e.target.value
        onChange?.(newValue)
    }

    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex justify-between items-center">
                <label htmlFor={id}>
                    {label}
                </label>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-primary hover:text-blue-700 text-xs font-medium"
                >
                    {showPassword ? "HIDE" : "SHOW"}
                </Button>
            </div>
            <div className="br-field-left">
                <input
                    id={id}
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={handleChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    aria-invalid={Boolean(error || validationError)}
                    aria-describedby={id ? `${id}-error` : undefined}
                    className={`px-3 py-2 text-base border-2 pr-12 w-full ${error || validationError ? "border-error focus:border-error" : "border-gray-300 focus:border-blue-500"}`}
                />
            </div>
            {error && (
                <p id={id ? `${id}-error` : undefined} className="text-sm text-error">
                    {error}
                </p>
            )}
            {helperText && (
                <div className={`text-xs leading-relaxed ${validationError ? "text-error" : "text-gray-500"}`}>{helperText}</div>
            )}
        </div>
    )
}

export default PasswordField
