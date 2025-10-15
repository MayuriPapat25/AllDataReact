import { cn } from "../../../shared/utils/utils"

export function Button({
  children,
  onClick,
  type = "button",
  variant,
  size = "sm",
  className = "",
  disabled = false,
  ...props
}) {
  const baseClasses =
    "font-medium transition-colors cursor-pointer"

  const variants = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500",
    outline: "border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-gray-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    link: "text-primary underline hover:text-blue-800 focus:ring-blue-500",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-6 py-3 text-base",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}



{/* <Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Go to Page</Button>
<Button variant="primary" disabled>Disabled</Button> */}