import {
  X, // close
  Check, // success
  ShoppingCart, // cart
  Smartphone, // mobile
  Stethoscope, // diagnostics
  Wrench, // repair
  Globe, // community
  BarChart3, // estimator
  Trash2, // delete
  AlertCircle, // error
  AlertTriangle, // warning
  Info, // info
  CheckCircle2, // success
  CircleMinus, // remove
} from "lucide-react"

export function Icon({ type, className, onClick }) {
  const icons = {
    close: X,
    check: Check,
    cart: ShoppingCart,
    mobile: Smartphone,
    diagnostics: Stethoscope,
    repair: Wrench,
    community: Globe,
    estimator: BarChart3,
    delete: Trash2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
    success: CheckCircle2,
    remove: CircleMinus,
  }

  const LucideIcon = icons[type] || AlertCircle

  return (
    <LucideIcon
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
      size={18}
    />
  )
}

// Aliases
export const ProductIcon = (props) => <Icon {...props} />
export const DeleteIcon = (props) => <Icon {...props} type="delete" />
export const MessageIcon = (props) => <Icon {...props} />
