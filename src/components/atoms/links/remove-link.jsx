"use client"

import { Trash2 } from "lucide-react"

export function RemoveLink({ onRemove }) {
  return (
    <button
      onClick={onRemove}
      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 min-w-0 whitespace-nowrap"
    >
      <Trash2 className="w-4 h-4 flex-shrink-0" />
      <span>REMOVE</span>
    </button>
  )
}
