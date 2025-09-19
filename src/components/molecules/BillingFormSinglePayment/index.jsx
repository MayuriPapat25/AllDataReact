import React from 'react'
import { RadioGroup, RadioGroupItem } from "../../atoms/RadioButtonGroup"
import SelectField from "../../atoms/SelectField"
import NewPaymentMethod from "../NewPaymentMethod"


const BillingFormSinglePayment = ({ paymentOptions, header }) => {

    return (
        <div className="w-full mr-10 pt-8">
            <div className="pb-4">
                {
                    header && <h1 className="text-2xl font-bold text-gray-900">{header}</h1>
                }
            </div>
            <div className="space-y-6">
                <div>
                    <RadioGroup
                        value={paymentOptions[0]?.value}
                        onValueChange={(value) => handleInputChange("taxExemptStatus", value)}
                        name="tax-exempt-status"
                        className="space-y-3"
                    >
                        {paymentOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-3">
                                <RadioGroupItem value={option.value} id={`tax-exempt-${option.value}`} />
                                <label
                                    htmlFor={`tax-exempt-${option.value}`}
                                    className="text-sm font-medium text-muted-foreground cursor-pointer"
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
                {paymentOptions[0]?.value === "new" && (
                    <div className="ml-6 mt-3 h-12  bg-background">
                        <NewPaymentMethod />
                    </div>
                )}

            </div>
        </div>
    )
}

export default BillingFormSinglePayment
