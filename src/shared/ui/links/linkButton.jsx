// atoms/Buttons/LinkButton.jsx

import { Button } from "../../../shared/ui/Buttons/Button";

export function LinkButton({ children, className = "", ...props }) {
  return (
    <Button
      variant="link"
      {...props}
      className={`no-underline text-primary hover:opacity-80 text-sm cursor-pointer ${className}`}
      style={{ textDecoration: "none" }}
    >
      {children}
    </Button>
  )
}
