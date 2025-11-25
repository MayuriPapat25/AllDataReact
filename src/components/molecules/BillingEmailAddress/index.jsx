import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "../../../shared/ui/RadioButtonGroup"
import { translations } from '../../../shared/translations'

const BillingEmailForm = ({ onValidationChange }) => {
  const [radioValue, setRadioValue] = useState("primary")
  const [customEmail, setCustomEmail] = useState("")

  // Sample primary email address
  const primaryEmail = "kiwow31027@inupup.com"

  const handleRadioClick = () => {
    if (radioValue === "primary") {
      // If already selected, deselect it
      setRadioValue(null)
      onValidationChange?.(Boolean(customEmail))
    } else {
      // Select the radio button
      setRadioValue("primary")
      setCustomEmail("")
      onValidationChange?.(true)
    }
  }

  const handleRadioChange = (value) => {
    setRadioValue(value)
    if (value === "primary") {
      setCustomEmail("")
      onValidationChange?.(true)
    } else {
      onValidationChange?.(Boolean(customEmail))
    }
  }

  // Emit initial validity (primary selected by default)
  useEffect(() => {
    onValidationChange?.(radioValue === "primary" ? true : Boolean(customEmail))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isDisabled = radioValue === "primary"

  return (
    <div className="w-full space-y-6 pb-8 border-b-2 border-gray-300 ">
      <h2 className="text-md">{translations?.billing_email_address}</h2>

      <div className="space-y-4">
        <RadioGroup value={radioValue} onValueChange={handleRadioChange}>
          <label className="flex items-center space-x-3 cursor-pointer" onClick={handleRadioClick}>
            <RadioGroupItem value="primary" />
            <span className="text-sm text-gray-700">{translations?.primary_email_address_for_billing_statement}</span>
          </label>
        </RadioGroup>

        {/* Email input field */}
        <div>
          <input
            type="email"
            value={isDisabled ? primaryEmail : customEmail}
            onChange={(e) => {
              const val = e.target.value
              setCustomEmail(val)
              onValidationChange?.(radioValue === "primary" ? true : Boolean(val))
            }}
            disabled={isDisabled}
            placeholder={isDisabled ? "" : "EMAIL ADDRESS FOR BILLING STATEMENTS"}
            className={`w-full px-4 py-3 text-lg border-2 rounded-md transition-colors ${isDisabled
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