import React, { forwardRef } from "react"
import { cn } from "../../../../utils/utils"

const InputField = forwardRef(
  ({ label, required, optional, error, className, id, type = "text", ...props }, ref) => {
    const describedById = id ? `${id}-error` : undefined
    return (
      <div className="space-y-2">
        {
          label &&
          <h3 className="flex text-display-sm-medium justify-between">
            {label}
            {optional && <span className="ml-2 text-xs text-muted-foreground">Optional</span>}
          </h3>
        }

        <div className="flex items-center">
          {required && <span className="mr-1 text-muted-foreground text-green-600">|</span>}
          <input
            ref={ref}
            id={id}
            type={type}
            className={cn(
              "min-w-1/2 px-3 py-2 border border-input bg-background rounded-md text-sm",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              "placeholder:text-muted-foreground",
              error && "border-destructive",
              className,
            )}
            aria-invalid={Boolean(error)}
            aria-describedby={describedById}
            {...props}
          />
        </div>
        {
          error && <p id={describedById} className={cn("text-sm min-h-[1.25rem]", error ? "text-red-500" : "text-transparent")}>
            {error || "_"}
          </p>
        }

      </div>
    )
  },
)

InputField.displayName = "InputField"

export { InputField }
