import { AlertTriangle, Info } from "lucide-react"

export function ErrorAlert({ type, message }) {
  const isWarning = type === "warning"

  return (
    <div
      className="flex items-start gap-3 p-4 rounded-sm border-l-4"
      style={{
        backgroundColor: isWarning ? "#fdf2f2" : "#e3f2fd",
        borderLeftColor: isWarning ? "var(--alldata-error)" : "var(--alldata-cart-item-description)",
        borderTop: `1px solid ${isWarning ? "var(--alldata-error)" : "var(--alldata-cart-item-description)"}`,
        borderRight: `1px solid ${isWarning ? "var(--alldata-error)" : "var(--alldata-cart-item-description)"}`,
        borderBottom: `1px solid ${isWarning ? "var(--alldata-error)" : "var(--alldata-cart-item-description)"}`,
      }}
    >
      <div className="flex-shrink-0 mt-0.5">
        {isWarning ? (
          <AlertTriangle className="w-5 h-5" style={{ color: "var(--alldata-error)" }} />
        ) : (
          <Info className="w-5 h-5" style={{ color: "var(--alldata-cart-item-description)" }} />
        )}
      </div>
      <p
        className="text-sm leading-relaxed font-normal"
        style={{
          color: isWarning ? "var(--alldata-error)" : "var(--alldata-cart-item-description)",
          fontFamily: "var(--font-gotham)",
        }}
      >
        {message}
      </p>
    </div>
  )
}
