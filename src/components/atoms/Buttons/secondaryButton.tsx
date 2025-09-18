export function SecondaryButton({ children, className, disabled, asChild = false, ...props }) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-6 py-2 rounded
        disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed
        ${className || ""}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
