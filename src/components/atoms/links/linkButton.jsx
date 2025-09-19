// atoms/Buttons/LinkButton.jsx
import { Button } from "../Buttons/Button"

export function LinkButton({ children, className = "", ...props }) {
  return (
    <Button
      variant="link"
      {...props}
      className={`no-underline text-[#282970] hover:opacity-80 font-normal cursor-pointer ${className}`}
      style={{ textDecoration: "none" }}
    >
      {children}
    </Button>
  )
}
