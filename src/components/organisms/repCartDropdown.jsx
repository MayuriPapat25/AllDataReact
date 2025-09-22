import { Button } from "../atoms/Buttons/Button"
import { Icon } from "../atoms/Icon/Icon"
import { RepCartContent } from "./RepCartContent"

export function RepCartDropdown({ isOpen = true, variant = "dropdown" }) {
  if (variant === "dropdown" && !isOpen) return null
  // Full page
  return (
    <div className="p-4">
      <h2 className="text-2xl font-medium mb-4">Cart Subscription Review</h2>
      <RepCartContent />
    </div>
  )
}
