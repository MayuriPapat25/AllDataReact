import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/utils";

const SelectField = forwardRef(
  (
    {
      id,
      label,
      required,
      optional,
      error,
      options = [],
      className,
      wrapperClass,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const computedAriaLabel = ariaLabel || (!label ? "Select an option" : undefined);

    return (
      <div className="space-y-2">
        {/* Visible label if provided */}
        {label && (
          <label
            htmlFor={selectId}
            className="block"
          >
            {label}
            {optional && (
              <span className="ml-2 text-xs text-muted-foreground">Optional</span>
            )}
          </label>
        )}

        <div className={cn("relative flex items-center w-full", wrapperClass, required && "br-field-left")}>
          <select
            id={selectId}
            ref={ref}
            aria-label={computedAriaLabel}
            aria-invalid={!!error}
            className={cn(
              "w-full px-3 py-2 appearance-none text-sm",
              // Applying border-2 for consistency with other fields, and managing default/error state
              error
                ? "border-2 border-error focus:border-error" // Red border on error
                : "border-2 border-gray-300 focus:border-blue-500", // Default/Focus borders
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown className="absolute right-3 pointer-events-none h-4 w-4 text-muted-foreground" />
        </div>

        {error && <p className="text-sm text-error" id={`${selectId}-error`}>{error}</p>}
      </div>
    );
  }
);

export default SelectField;
