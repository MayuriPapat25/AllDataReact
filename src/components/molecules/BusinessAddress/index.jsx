import React, { useState } from "react"
import InputField from "../../atoms/InputField/index" // Updated import path for InputField
import SelectField from "../../atoms/SelectField" // Updated import path for SelectField

const US_STATES = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
]

const BusinessAddressForm = ({ onDataChange, variant = "us", onValidationChange }) => {
    const [formData, setFormData] = useState(() => {
        if (variant === "us") {
            return {
                streetAddress: "12191 West Dr",
                unit: "",
                city: "Desert Hot Springs",
                state: "CA",
                zipCode: "92240-3851",
            }
        } else {
            return {
                streetNumber: "Infantrieweg 21",
                city: "Oldenburg (Oldenburg)",
                stateCounty: "Berlin",
                postCode: "26129",
            }
        }
    })

    const updateField = (field, value) => {
        const newData = { ...formData, [field]: value }
        setFormData(newData)
        onDataChange?.(newData)
        // Simple required validation for US variant
        const isValid = variant === "us"
            ? Boolean(newData.streetAddress && newData.city && newData.state && newData.zipCode)
            : Boolean(newData.streetNumber && newData.city && newData.state && newData.postCode)
        onValidationChange?.(isValid)
    }

    // Emit initial validation state
    React.useEffect(() => {
        const isValid = variant === "us"
            ? Boolean(formData.streetAddress && formData.city && formData.state && formData.zipCode)
            : Boolean(formData.streetNumber && formData.city && formData.state && formData.postCode)
        onValidationChange?.(isValid)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="space-y-6 mt-8 pb-8 border-b-2 border-gray-300">
            <div className="flex justify-between items-center">
                <h2 className="text-md">BUSINESS ADDRESS</h2>
                {variant === "international" && <span className="text-sm text-muted-foreground">| = Fields are Required</span>}
            </div>

            <div className="space-y-6">
                {variant === "us" ? (
                    <>
                        <InputField
                            label="Street Address"
                            value={formData.streetAddress}
                            onChange={(e) => updateField("streetAddress", e.target.value)}
                            placeholder="Enter street address"
                            className="w-full border-gray-300 "
                        />

                        <div className="relative">
                            <InputField
                                label="Unit, Suite, Apartment, etc."
                                value={formData.unit}
                                onChange={(e) => updateField("unit", e.target.value)}
                                placeholder="Enter unit, suite, apartment, etc."
                                className="w-full border-gray-300 "
                            />
                            <span className="absolute top-0 right-0 text-sm text-muted-foreground">Optional</span>
                        </div>

                        <InputField
                            label="City"
                            value={formData.city}
                            onChange={(e) => updateField("city", e.target.value)}
                            placeholder="Enter city"
                            className="w-full border-gray-300 "
                        />

                        <SelectField
                            label="State"
                            value={formData.state}
                            onChange={(e) => updateField("state", e.target.value)}
                            options={US_STATES}
                            placeholder="Select state"
                            className="w-1/2 border-gray-300 "
                        />

                        <InputField
                            label="ZIP Code"
                            value={formData.zipCode}
                            onChange={(e) => updateField("zipCode", e.target.value)}
                            placeholder="Enter ZIP code"
                            className="w-1/2 border-gray-300 "
                        />
                    </>
                ) : (
                    <>
                        <InputField
                            label="Street Number"
                            value={formData.streetNumber}
                            onChange={(e) => updateField("streetNumber", e.target.value)}
                            placeholder="Enter street number"
                            className="w-full border-gray-300 "
                            required
                        />

                        <InputField
                            label="City"
                            value={formData.city}
                            onChange={(e) => updateField("city", e.target.value)}
                            placeholder="Enter city"
                            className="w-full border-gray-300"
                            required
                        />

                        <SelectField
                            label="State"
                            value={formData.state}
                            onChange={(e) => updateField("state", e.target.value)}
                            options={US_STATES}
                            placeholder="Select state"
                            className="w-1/2 border-gray-300 "
                            required
                        />

                        <InputField
                            label="Post Code"
                            value={formData.postCode}
                            onChange={(e) => updateField("postCode", e.target.value)}
                            placeholder="Enter post code"
                            className="w-1/2 border-gray-300 "
                            required
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default BusinessAddressForm
