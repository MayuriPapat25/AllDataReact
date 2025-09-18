import React, { useState } from 'react'
import { InputField } from '../../atoms/InputField'
import { SelectField } from '../../atoms/SelectField'

const NewPaymentMethod = (props) => {
    const [formData, setFormData] = useState({
        paymentType: "existing",
        selectedCard: "", // Initialize selectedCard
        cardNumber: "",
        expirationMonth: "",
        expirationYear: "",
        cvv: "",
        cardholderName: "",
        country: "",
        state: "",
        address1: "",
        address2: "",
        city: "",
        postalCode: "",
        email: "",
    })

    const [errors, setErrors] = useState({})

    const countries = [
        { value: "us", label: "United States" },
        { value: "ca", label: "Canada" },
        { value: "uk", label: "United Kingdom" },
    ]

    const months = Array.from({ length: 12 }, (_, i) => ({
        value: String(i + 1).padStart(2, "0"),
        label: String(i + 1).padStart(2, "0"),
    }))

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 10 }, (_, i) => ({
        value: String(currentYear + i),
        label: String(currentYear + i),
    }))

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    return (
        <div className="mt-6 space-y-6">
            {/* Card Type Icons Display */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Type</label>
                <div className="flex space-x-2">
                    <img src="/visa-logo-generic.png" alt="Visa" className="h-8 w-12 object-contain" />
                    <img src="/mastercard-logo.png" alt="Mastercard" className="h-8 w-12 object-contain" />
                    <img src="/american-express-logo.png" alt="American Express" className="h-8 w-12 object-contain" />
                    <img src="/abstract-discover-logo.png" alt="Discover" className="h-8 w-12 object-contain" />
                </div>
            </div>
            <InputField
                label="Card Number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                error={errors.cardNumber}
                required
                className="md:col-span-2"
            />
            <div className="grid grid-cols-2">
                <SelectField
                    label="Expiration Date"
                    name="expirationMonth"
                    value={formData.expirationMonth}
                    onChange={handleInputChange}
                    options={months}
                    error={errors.expirationMonth}
                    required
                    placeholder="Month"
                    className="w-1/2"
                />
                <SelectField
                    label=""
                    name="expirationYear"
                    value={formData.expirationYear}
                    onChange={handleInputChange}
                    options={years}
                    error={errors.expirationYear}
                    required
                    placeholder="Year"
                    className="mt-7 w-1/2"
                />
            </div>
            <div className="grid grid-cols-2 gap-4" >
                <InputField
                    label="CVV"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    error={errors.cvv}
                    required
                />
                <img src="/visa-logo-generic.png" alt="Visa" className="h-8 w-12 object-contain mt-10" />
            </div>

            <InputField
                label="Cardholder Name"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleInputChange}
                error={errors.cardholderName}
                required
            />

            <SelectField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                options={countries}
                error={errors.country}
                required
                className="w-1/2"
            />

            <InputField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                error={errors.state}
                required
            />
            <InputField
                label="Address 1 (Only enter A-Z, 0-9, hyphens, underscores, & periods)"
                name="address1"
                value={formData.address1}
                onChange={handleInputChange}
                error={errors.address1}
                required
            />

            <InputField
                label="Address 2 (Only enter A-Z, 0-9, hyphens, underscores, & periods)"
                name="address2"
                value={formData.address2}
                onChange={handleInputChange}
                error={errors.address2}
            />

            <InputField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                error={errors.city}
                required
            />
            <InputField
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                error={errors.postalCode}
                required
            />
            <InputField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                required
            />

            <div className="flex items-center text-sm text-gray-600 justify-end">
                <span className="text-green-600 mr-2 ">|</span>
                = Required Field
            </div>
            <div className="border-b-4 border-gray-500" />

        </div>
    )
}


export default NewPaymentMethod

