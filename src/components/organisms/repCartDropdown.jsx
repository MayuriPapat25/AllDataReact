import { Button } from "../atoms/Buttons/Button"
import { Icon } from "../atoms/Icon/Icon"
import { RepCartContent } from "./RepCartContent"

export function RepCartDropdown({ isOpen = true, variant = "dropdown" }) {
  if (variant === "dropdown" && !isOpen) return null
  // Full page
  return (
    <div className="p-4">
      <h4 className="mb-4 text-primary">Cart Subscription Review</h4>
      <RepCartContent />
    </div>
  )
}
