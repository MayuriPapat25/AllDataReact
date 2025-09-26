import { useState, useEffect } from "react"

const PasswordField = ({
    id,
    label,
    value = "",
    onChange,
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
                <label htmlFor={id} className="text-base font-medium text-gray-700 ml-2.5">
                    {label}
                </label>
                <button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                >
                    {showPassword ? "HIDE" : "SHOW"}
                </button>
            </div>
            <div className="relative flex">
                {required && <span className="mr-1 text-muted-foreground text-green-600">|</span>}
                <input
                    id={id}
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    aria-invalid={Boolean(error || validationError)}
                    aria-describedby={id ? `${id}-error` : undefined}
                    className={`px-3 py-2 text-base border-2 pr-12 w-full ${error || validationError ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                />
            </div>
            {error && (
                <p id={id ? `${id}-error` : undefined} className="text-sm text-red-500">
                    {error}
                </p>
            )}
            {helperText && (
                <p className={`text-sm leading-relaxed ${validationError ? "text-red-500" : "text-gray-500"}`}>{helperText}</p>
            )}
        </div>
    )
}

export default PasswordField
