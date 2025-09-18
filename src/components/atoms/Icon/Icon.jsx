export function Icon({ type, className, onClick }) {
  const icons = {
    close: "✕",
    check: "✔",
    cart: "🛒",
    mobile: "📱",
    diagnostics: "🩺",
    repair: "🛠️",
    community: "🌐",
    estimator: "📊",
    delete: "🗑️",
  }

  return (
    <span
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {icons[type] || "❓"}
    </span>
  )
}

// Optional aliases for clarity
export const ProductIcon = (props) => <Icon {...props} />
export const DeleteIcon = (props) => <Icon {...props} type="delete" />
