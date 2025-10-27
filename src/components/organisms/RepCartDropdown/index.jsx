import { RepCartContent } from "../RepCartContent/RepCartContent"

const RepCartDropdown = ({ isOpen = true, variant = "dropdown" }) => {
  if (variant === "dropdown" && !isOpen) return null
  // Full page
  return (
    <div className="m-auto max-w-4xl pt-11">
      <h4 className="mb-4 text-primary">Cart Subscription Review</h4>
      <RepCartContent />
    </div>
  )
}

export default RepCartDropdown
