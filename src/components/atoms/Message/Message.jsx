import { Icon } from "../Icon/Icon"
import { cn } from "../../../../utils/utils"

export const Message = ({ type, children, className = "" }) => {
  const getMessageStyles = () => {
    switch (type) {
      case "error":
        return "bg-red-50 text-red-800 border-t-[4px]"
      case "warning":
        return "bg-yellow-50 text-yellow-800 border-t-[4px]"
      case "info":
        return "bg-blue-50 text-blue-800 border-t-[4px]"
      case "success":
        return "bg-green-50 text-green-800 border-t-[4px]"
      default:
        return "bg-gray-50 text-gray-800 border-t-[4px]"
    }
  }

  const getIconColor = () => {
    switch (type) {
      case "error":
        return "text-[#cf0101]"
      case "warning":
        return "text-yellow-500"
      case "info":
        return "text-[#6897e6]"
      case "success":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const getBorderStyle = () => {
    switch (type) {
      case "error":
        return { borderTopColor: "#cf0101" }
      case "info":
        return { borderTopColor: "#6897e6" }
      case "warning":
        return { borderTopColor: "#facc15" } // yellow-400
      case "success":
        return { borderTopColor: "#22c55e" } // green-500
      default:
        return { borderTopColor: "#9ca3af" } // gray-400
    }
  }

  return (
    <div
      className={cn("flex items-start gap-3 p-4 rounded-b-md border-t-[4px]", getMessageStyles(), className)}
      style={getBorderStyle()}
    >
      <Icon type={type} className={cn("w-5 h-5 mt-0.5", getIconColor())} />
      <div className="flex-1 text-sm leading-relaxed">{children}</div>
    </div>
  )
}
