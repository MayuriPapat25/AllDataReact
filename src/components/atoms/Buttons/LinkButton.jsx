import { Button } from "./Button"

export default function LinkButton({ children, onClick, className, ...props }) {
  return (
    <Button
      onClick={onClick}
      variant="ghost" // base variant from Button
      className={`text-primary underline hover:primary ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
}
