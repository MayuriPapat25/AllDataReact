import { useState } from "react"

const PasswordField = ({
    id,
    label,
    placeholder = "••••••••••",
    helperText,
    className = "",
    required = false,
}) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex justify-between items-center">
                <label htmlFor={id} className="text-base font-medium text-gray-700">
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
                    placeholder={placeholder}
                    className="px-3 py-2 text-base border-2 border-gray-300 focus:border-blue-500 pr-12 w-full"
                />
            </div>
            {helperText && <p className="text-sm text-gray-500 leading-relaxed">{helperText}</p>}
        </div>
    )
}

export default PasswordField