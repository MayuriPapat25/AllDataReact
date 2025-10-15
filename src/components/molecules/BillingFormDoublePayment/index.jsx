import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "../../../shared/ui/RadioButtonGroup"
import SelectField from "../../../shared/ui/SelectField"


const BillingFormDoublePayment = ({ onPaymentTypeChange, onCardSelect, header, subheader, paymentOptions }) => {
  const [paymentType, setPaymentType] = useState("existing")

  const existingCards = [
    { value: "1", label: "Visa Ending in 4844" },
    { value: "2", label: "Mastercard Ending in 1234" },
    { value: "3", label: "American Express Ending in 5678" },
  ]

  const handlePaymentTypeChange = (value) => {
    const type = value
    setPaymentType(type)
    onPaymentTypeChange?.(type)
  }

  return (
    <div className="w-full mr-10 pt-8">
      <div className="pb-4">
        {
          header && <h1 className="text-2xl font-bold text-gray-900">{header}</h1>
        }
        {
          subheader &&
          <p className="text-sm text-gray-600 mt-2">
            You will have time to review your order before completing your purchase.
          </p>
        }
      </div>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 tracking-wide">PAYMENT TYPE</h2>

          <RadioGroup value={paymentType} onValueChange={handlePaymentTypeChange} className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="existing" id="existing" />
                <label
                  htmlFor="existing"
                  onClick={() => handlePaymentTypeChange("existing")}
                  className="text-muted-foreground font-medium tracking-wide cursor-pointer"
                >
                  USE PAYMENT METHOD ON FILE
                </label>
              </div>

              {paymentType === "existing" && (
                <div className="ml-6 mt-3 max-w-[40rem]">
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
                  ADD NEW PAYMENT TYPE
                </label>
              </div>

              {paymentType === "new" && (
                <div className="ml-6 mt-3 h-12  bg-background">
                  New Payment Iframe
                  <iframe ></iframe>
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