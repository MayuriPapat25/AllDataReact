"use client"

import { useState } from "react"
import InputField from "../../atoms/InputField"
import SelectField from "../../atoms/SelectField"
import { RadioGroup, RadioGroupItem } from "../../atoms/RadioButtonGroup"
import FileUpload from "../../atoms/FileUpload"

const titleOptions = [
    { value: "manager", label: "Manager" },
    { value: "owner", label: "Owner" },
    { value: "ceo", label: "CEO" },
    { value: "president", label: "President" },
    { value: "director", label: "Director" },
]

const shopTypeOptions = [
    { value: "general-repair", label: "General Repair" },
    { value: "automotive", label: "Automotive" },
    { value: "electronics", label: "Electronics" },
    { value: "appliance", label: "Appliance" },
    { value: "other", label: "Other" },
]

const ownershipOptions = [
    { value: "corporation", label: "Corporation" },
    { value: "llc", label: "LLC" },
    { value: "partnership", label: "Partnership" },
    { value: "sole-proprietorship", label: "Sole Proprietorship" },
]

const taxExemptOptions = [
    { value: "not-exempt", label: "MY BUSINESS IS NOT TAX EXEMPT" },
    { value: "exempt", label: "MY BUSINESS IS TAX EXEMPT" },
]

const BusinessInformationForm = () => {
    const [formData, setFormData] = useState({
        businessName: "",
        firstName: "",
        lastName: "",
        title: "manager",
        email: "",
        shopType: "general-repair",
        ownershipType: "corporation",
        taxExemptStatus: "exempt",
        taxId: "",
        certificate: null,
    })

    const [errors, setErrors] = useState({})

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }

        // Validate email in real-time
        if (field === "email" && typeof value === "string") {
            if (value && !validateEmail(value)) {
                setErrors((prev) => ({ ...prev, email: "Please Enter A Valid Email Address." }))
            }
        }
    }

    return (
        <div className="w-full border-b-4 border-gray-300 pb-8">
            <div>
                <div className="text-2xl font-bold text-foreground ml-1 mb-4">BUSINESS INFORMATION</div>
            </div>
            <div className="space-y-6">
                {/* Business Name */}
                <InputField
                    label="Business/Shop Name"
                    value={formData.businessName}
                    onChange={(value) => handleInputChange("businessName", value)}
                    placeholder="Enter business name"
                    error={errors.businessName}
                    className="w-full border-gray-300 "
                />

                {/* Authorized Signer Names */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="Authorized Signer First Name"
                        value={formData.firstName}
                        onChange={(value) => handleInputChange("firstName", value)}
                        placeholder="Enter first name"
                        error={errors.firstName}
                        className="w-full border-gray-300 "
                    />
                    <InputField
                        label="Authorized Signer Last Name"
                        value={formData.lastName}
                        onChange={(value) => handleInputChange("lastName", value)}
                        placeholder="Enter last name"
                        error={errors.lastName}
                        className="w-full border-gray-300 "
                    />
                </div>

                {/* Title */}
                <SelectField
                    label="Title Of Authorized Signer"
                    value={formData.title}
                    onChange={(value) => handleInputChange("title", value)}
                    options={titleOptions}
                    className="w-1/2 border-gray-300 "
                />

                {/* Email */}
                <InputField
                    label="Authorized Signer Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(value) => handleInputChange("email", value)}
                    placeholder="Enter email address"
                    error={errors.email}
                    hasError={!!errors.email}
                    className="w-full border-gray-300 "
                />

                {/* Shop Type and Ownership Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                        label="Shop Type"
                        value={formData.shopType}
                        onChange={(value) => handleInputChange("shopType", value)}
                        options={shopTypeOptions}
                        className="w-1/2 border-gray-300 "
                    />
                    <SelectField
                        label="Ownership Type"
                        value={formData.ownershipType}
                        onChange={(value) => handleInputChange("ownershipType", value)}
                        options={ownershipOptions}
                        className="w-1/2 border-gray-300 "
                    />
                </div>

                {/* Tax Exempt Status */}
                <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-700 block">Tax Exempt Status</label>
                    <RadioGroup
                        value={formData.taxExemptStatus}
                        onValueChange={(value) => handleInputChange("taxExemptStatus", value)}
                        name="tax-exempt-status"
                        className="space-y-4"
                    >
                        {taxExemptOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-3">
                                <RadioGroupItem value={option.value} id={`tax-exempt-${option.value}`} />
                                <label
                                    htmlFor={`tax-exempt-${option.value}`}
                                    className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {formData.taxExemptStatus === "exempt" && (
                    <>
                        {/* Tax ID Number */}
                        <InputField
                            label="Enter Your Tax ID Number"
                            value={formData.taxId}
                            onChange={(value) => handleInputChange("taxId", value)}
                            placeholder="Enter tax ID number"
                            error={errors.taxId}
                            className="w-full border-gray-300 "
                        />

                        {/* File Upload */}
                        <FileUpload
                            label="Please Upload Your Tax Exempt Certificate Here"
                            onChange={(file) => handleInputChange("certificate", file)}
                            accept=".pdf,.jpg,.jpeg,.png"
                            helperText="Warning: Reseller Certificate does not qualify for tax exemption."
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default BusinessInformationForm;