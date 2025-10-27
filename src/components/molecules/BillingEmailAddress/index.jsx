import React, { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "../../../shared/ui/RadioButtonGroup"

const BillingEmailForm = ({ onValidationChange }) => {
    const [usePrimaryEmail, setUsePrimaryEmail] = useState(true)
    const [customEmail, setCustomEmail] = useState("")

    // Sample primary email address
    const primaryEmail = "kiwow31027@inupup.com"

    const handleRadioChange = (value) => {
        if (value === "primary") {
            setUsePrimaryEmail(true)
            setCustomEmail("") // Clear custom email when selecting primary
        } else {
            setUsePrimaryEmail(false)
        }
        onValidationChange?.(value === "primary" ? true : Boolean(customEmail))
    }

    // Emit initial validity (primary selected by default)
    useEffect(() => {
        onValidationChange?.(usePrimaryEmail ? true : Boolean(customEmail))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="w-full space-y-6 pb-8 border-b-2 border-gray-300 ">
            <h2 className="text-md"> Billing Email Address</h2>

            <div className="space-y-4">
                <RadioGroup name="billing-email-choice" value={usePrimaryEmail ? "primary" : ""} onValueChange={handleRadioChange} className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <RadioGroupItem value="primary" />
                        <span className="text-sm text-gray-700">Use my primary email address for billing statements.</span>
                    </label>
                </RadioGroup>

                {/* Email input field */}
                <div>
                    <input
                        type="email"
                        value={usePrimaryEmail ? primaryEmail : customEmail}
                        onChange={(e) => {
                            const val = e.target.value
                            setCustomEmail(val)
                            onValidationChange?.(usePrimaryEmail ? true : Boolean(val))
                        }}
                        disabled={usePrimaryEmail}
                        placeholder={usePrimaryEmail ? "" : "EMAIL ADDRESS FOR BILLING STATEMENTS"}
                        className={`w-full px-4 py-3 text-lg border-2 rounded-md transition-colors ${usePrimaryEmail
                            ? "bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-white border-gray-300 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20"
                            }`}
                    />
                </div>
            </div>
        </div>
    )
}

export default BillingEmailForm