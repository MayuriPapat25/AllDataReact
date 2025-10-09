import { RepCartContent } from "../RepCartContent/RepCartContent"

export function RepCartDropdown({ isOpen = true, variant = "dropdown" }) {
  if (variant === "dropdown" && !isOpen) return null
  // Full page
  return (
    <div className="mt-10">
      <h4 className="mb-4 text-primary">Cart Subscription Review</h4>
      <RepCartContent />
    </div>
  )
}
