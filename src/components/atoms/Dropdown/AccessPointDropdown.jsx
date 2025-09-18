import { Button } from "../Buttons/Button"

export function AccessPointDropdown({ value, onChange, className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-sm text-gray-600 mr-2">Access Points</span>
      <div className="flex items-center border border-gray-300 rounded">
        <Button
          onClick={() => onChange(Math.max(1, value - 1))}
          variant="ghost"
          size="sm"
          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
        >
          -
        </Button>
        <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">{value}</span>
        <Button
          onClick={() => onChange(value + 1)}
          variant="ghost"
          size="sm"
          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
        >
          +
        </Button>
      </div>
    </div>
  )
}
