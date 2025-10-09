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
  Bell, // info
  CirclePlus,//circle plus icon
  RotateCcw, //refund
  CarFront, //car front
  Euro, //euro currency
  DollarSign, //doller currency
  FileDown, //file download
  CircleMinus, //cancel subscription
  ChevronDown, //down Arrow
  ToggleLeft,// toggle yes
  ToggleRight,// toggle no
  CircleDollarSign,
  ChevronUp
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
    error: AlertTriangle,
    warning: AlertTriangle,
    info: Info,
    success: CheckCircle2,
    information: Bell,
    plus: CirclePlus,
    refund: RotateCcw,
    carFront: CarFront,
    euro: Euro,
    doller: DollarSign,
    circleDollar: CircleDollarSign,
    downloadFile: FileDown,
    cancelSubscription: CircleMinus,
    downArrow: ChevronDown,
    toggleYes: ToggleLeft,
    toggleNo: ToggleRight,
    remove: CircleMinus,
    upArrow: ChevronUp
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
