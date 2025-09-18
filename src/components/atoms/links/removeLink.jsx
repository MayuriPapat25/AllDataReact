import { Trash2 } from "lucide-react"
import { Button } from "../Buttons/Button"

export function RemoveLink({ onRemove }) {
  return (
    <Button
      onClick={onRemove}
      variant="link"
      size="sm"
      className="flex items-center gap-1 min-w-0 whitespace-nowrap"
    >
      <Trash2 className="w-4 h-4 flex-shrink-0" />
      <span>REMOVE</span>
    </Button>
  )
}
