import { cn } from "../../../../utils/utils"
import { RadioGroup, RadioGroupItem } from "../../atoms/RadioButtonGroup"

const CustomRadioGroupField = ({
    label,
    name,
    options,
    value,
    onChange,
    required = false,
    optional = false,
    error,
    className,
}) => {
    return (
        <div className={cn("space-y-3", className)}>
            <label className="block text-sm font-medium text-foreground">
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
                {optional && <span className="text-muted-foreground ml-1">(Optional)</span>}
            </label>
            <RadioGroup value={value} onValueChange={onChange} name={name} className="space-y-2">
                {options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} />
                        <label htmlFor={`${name}-${option.value}`} className="text-sm text-foreground cursor-pointer">
                            {option.label}
                        </label>
                    </div>
                ))}
            </RadioGroup>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    )
}

export default CustomRadioGroupField