import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../../../utils/utils";

const SelectField = forwardRef(
  ({ id, label, required, optional, error, options = [], className, wrapperClass, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-muted-foreground">
            {label}
            {optional && <span className="ml-2 text-xs text-muted-foreground">Optional</span>}
          </label>
        )}

        <div className={cn("relative flex items-center w-full", wrapperClass)}>
          <select
            id={selectId}
            label={label}
            ref={ref}
            className={cn(
              "w-full px-3 py-2 border border-input bg-background text-sm appearance-none",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              error && "border-destructive",
              className
            )}
            aria-invalid={!!error}
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

        {error && <p className="text-sm text-red-500" id={`${selectId}-error`}>{error}</p>}
      </div>
    );
  }
);

export default SelectField;
