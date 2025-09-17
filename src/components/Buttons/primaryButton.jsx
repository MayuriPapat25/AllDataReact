export function PrimaryButton({ children, className, disabled, asChild = false, ...props }) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded border-0
        disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
        ${className || ""}
      `}
      {...props}
    >
      {children}
    </button>

  )
}
