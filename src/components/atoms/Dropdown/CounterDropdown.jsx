import { Button } from "../Buttons/Button"

export function CounterDropdown({ value, onChange, className = "", showLabel = true }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {showLabel && (
        <span className="text-sm text-black whitespace-nowrap hidden md:block">
          Access Points
        </span>
      )}
      <div className="flex items-center border-2 border-gray-300">
        <Button
          onClick={() => onChange(Math.max(1, value - 1))}
          variant="ghost"
          size="sm"
          className="py-1 text-gray-600 hover:bg-gray-100"
        >
          -
        </Button>
        <span className="px-2 py-1 text-sm font-medium min-w-[30px] text-center">{value}</span>
        <Button
          onClick={() => onChange(value + 1)}
          variant="ghost"
          size="sm"
          className="py-1 text-gray-600 hover:bg-gray-100"
        >
          +
        </Button>
      </div>
    </div>
  )
}
