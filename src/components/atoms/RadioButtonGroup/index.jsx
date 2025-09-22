"use client"

import React from "react"
import { createContext, useContext } from "react"
import { cn } from "../../../../utils/utils"

const RadioGroupContext = createContext(undefined)

export function RadioGroup({ value, onValueChange, name = "radio-group", className, children }) {
    return (
        <RadioGroupContext.Provider value={{ value, onValueChange, name }}>
            <div className={cn("space-y-2", className)} role="radiogroup">
                {children}
            </div>
        </RadioGroupContext.Provider>
    )
}

export function RadioGroupItem({ value, id, className }) {
    const context = useContext(RadioGroupContext)

    if (!context) {
        throw new Error("RadioGroupItem must be used within a RadioGroup")
    }

    const { value: selectedValue, onValueChange, name } = context
    const isChecked = selectedValue === value

    return (
        <input
            type="radio"
            id={id || `${name}-${value}`}
            name={name}
            value={value}
            checked={isChecked}
            onChange={() => onValueChange(value)}
            className={cn(
                "h-4 w-4 text-orange-500 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer",
                isChecked && "border-orange-500 bg-orange-500",
                className
            )}
        />
    )
}
