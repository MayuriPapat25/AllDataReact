import { Button } from "../../../components/atoms/Buttons/Button" // updated path
import { Badge } from "../../../components/atoms/Badge/Badge" // updated path

export function CartItem({
  id,
  name,
  description,
  price,
  originalPrice,
  badge,
  badgeVariant = "default",
  onRemove,
}) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          </div>
          <h4 className="text-sm font-medium text-gray-900">{name}</h4>
          {badge && (
            <Badge
              variant={badgeVariant}
              className={`text-xs px-2 py-0.5 rounded ${
                badge === "MONTHLY"
                  ? "bg-blue-100 text-blue-800"
                  : badge === "ANNUALLY"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {badge}
            </Badge>
          )}
        </div>
        {description && <p className="text-xs text-gray-500 ml-8">{description}</p>}
      </div>
      <div className="flex items-center gap-3 ml-4">
        <div className="text-right">
          {originalPrice && originalPrice !== price && (
            <div className="text-xs text-gray-400 line-through">${originalPrice.toFixed(2)}</div>
          )}
          <div className="text-sm font-medium text-gray-900">${price.toFixed(2)}</div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(id)}
          className="text-gray-400 hover:text-red-500 p-1"
        >
          ×
        </Button>
      </div>
    </div>
  )
}
