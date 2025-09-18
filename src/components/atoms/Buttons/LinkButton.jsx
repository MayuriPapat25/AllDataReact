import { Button } from "./Button"

export default function LinkButton({ children, onClick, className, ...props }) {
  return (
    <Button
      onClick={onClick}
      variant="ghost" // base variant from Button
      className={`text-blue-600 underline hover:text-blue-800 ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
}
