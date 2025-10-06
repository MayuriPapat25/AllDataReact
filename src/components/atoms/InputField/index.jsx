import { forwardRef } from "react"
import { cn } from "../../../../utils/utils"

const InputField = forwardRef(
  ({ label, required, optional, error, helperText, className, id, onChange, type = "text", ...props }, ref) => {
    const describedById = id ? `${id}-error` : undefined
    return (
      <div className="space-y-2">
        {label && (
          <label className="flex justify-between">
            {label}
            {optional && <span className="ml-2 text-xs text-muted-foreground">Optional</span>}
          </label>
        )}

        <div className="br-field-left">
          {/* {required && <span className="mr-1 text-muted-foreground text-green-600">|</span>} */}
          <input
            ref={ref}
            id={id}
            type={type}
            className={cn(
              "w-full px-3 py-2 border-2 border-gray-300 text-sm",
              // "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              "placeholder:text-muted-foreground",
              error && "border-destructive",
              className,
            )}
            aria-invalid={Boolean(error)}
            aria-describedby={describedById}
            {...props}
            onChange={onChange}
          />
        </div>
        {error && (
          <p id={describedById} className={cn("text-sm min-h-[1.25rem]", error ? "text-error" : "text-transparent")}>
            {error || "_"}
          </p>
        )}
        {helperText && <div className="text-xs text-gray-500 leading-relaxed">{helperText}</div>}
      </div>
    )
  },
)

export default InputField
