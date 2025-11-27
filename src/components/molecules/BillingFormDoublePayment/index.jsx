import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "../../../shared/ui/RadioButtonGroup"
import SelectField from "../../../shared/ui/SelectField"
import { translations } from "../../../shared/translations"


const BillingFormDoublePayment = ({ onPaymentTypeChange, onCardSelect, paymentOptions }) => {
  const [paymentType, setPaymentType] = useState("existing")

  const existingCards = [
    { value: "1", label: "Visa Ending in 4844" },
    { value: "2", label: "Mastercard Ending in 1234" },
    { value: "3", label: "American Express Ending in 5678" },
  ]

  const handlePaymentTypeChange = (value) => {
    setPaymentType(value)
    onPaymentTypeChange?.(value)
  }

  return (
    <div className="w-full mr-10 pt-11">
      <div className="pb-4">
        <h1 className="text-2xl font-bold text-gray-900">{translations?.billing_information}</h1>
        <p className="text-sm text-gray-600 mt-2">
          {translations?.review_order_before_purchase}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 tracking-wide">{translations?.payment_type}</h2>

          <RadioGroup value={paymentType} onValueChange={handlePaymentTypeChange} className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="existing" id="existing" />
                <label
                  htmlFor="existing"
                  onClick={() => handlePaymentTypeChange("existing")}
                  className="text-muted-foreground font-medium tracking-wide cursor-pointer"
                >
                  {translations?.payment_method_file}
                </label>
              </div>

              {(paymentType === "existing" || paymentType === "new") && (
                <div className="ml-6 mt-3 max-w-160">
                  <SelectField
                    options={existingCards}
                    defaultValue="1"
                    onChange={(e) => onCardSelect?.(e.target.value)}
                    className="h-12 border-2 border-muted-foreground/30 bg-background text-muted-foreground"
                  />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="new" id="new" />
                <label
                  htmlFor="new"
                  onClick={() => handlePaymentTypeChange("new")}
                  className="text-muted-foreground font-medium tracking-wide cursor-pointer"
                >
                  {translations?.add_new_payment_type}
                </label>
              </div>

              {paymentType === "new" && (
                <div className="ml-6 mt-3 h-12  bg-background">
                  New Payment Iframe
                  <iframe
                    title="New Payment Iframe"
                    className="w-full h-48"
                  />
                </div>
              )}
            </div>
          </RadioGroup>
        </div>

      </div>
    </div>
  )
}

export default BillingFormDoublePayment