"use client"

import { HelpCircle } from "lucide-react"

export function WhatAreAccessPointsLink({ onClick }) {
  return (
    <div className="flex justify-end">
      <button
        onClick={onClick}
        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        <HelpCircle className="w-4 h-4" />
        What are Access Points?
      </button>
    </div>
  )
}
