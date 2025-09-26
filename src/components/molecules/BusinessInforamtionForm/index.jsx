import React from "react"
import { useState } from "react"
import InputField from "../../atoms/InputField/index"
import SelectField from "../../atoms/SelectField"
import PhoneField from "../../atoms/PhoneNumberField"
import { VatField } from "../../atoms/VatField"
import FileUploadField from "../../atoms/FileUpload"
import CustomRadioGroupField from "../../atoms/CustomRadioGroupField"

const phoneTypeOptions = [
    { value: "home", label: "Home" },
    { value: "mobile", label: "Mobile" },
    { value: "work", label: "Work" },
    { value: "fax", label: "Fax" },
]

const jobTitleOptions = [
    { value: "manager", label: "Manager" },
    { value: "director", label: "Director" },
    { value: "owner", label: "Owner" },
    { value: "employee", label: "Employee" },
    { value: "other", label: "Other" },
]

const shopTypeOptions = [
    { value: "public-sector", label: "Public Sector" },
    { value: "private-sector", label: "Private Sector" },
    { value: "non-profit", label: "Non-Profit" },
    { value: "retail", label: "Retail" },
    { value: "wholesale", label: "Wholesale" },
    { value: "general-repair", label: "General Repair" },
]

const ownershipTypeOptions = [
    { value: "corporation", label: "Corporation" },
    { value: "llc", label: "LLC" },
    { value: "partnership", label: "Partnership" },
    { value: "sole-proprietorship", label: "Sole Proprietorship" },
]

const languageOptions = [
    { value: "english", label: "English" },
    { value: "german", label: "German" },
    { value: "french", label: "French" },
    { value: "spanish", label: "Spanish" },
    { value: "italian", label: "Italian" },
]

const taxExemptOptions = [
    { value: "not-exempt", label: "MY BUSINESS IS NOT TAX EXEMPT" },
    { value: "exempt", label: "MY BUSINESS IS TAX EXEMPT" },
]

const BusinessInformationForm = ({ variant = "standard", onSubmit }) => {
    const [formData, setFormData] = useState({
        businessName: "",
        phoneNumber: "",
        phoneType: "home",
        firstName: "",
        lastName: "",
        jobTitle: "manager",
        shopType: variant === "authorized" ? "general-repair" : "public-sector",
        ownershipType: "corporation",
        email: "",
        vat: "",
        purchaseOrderRef: "",
        language: "english",
        taxExemptStatus: "not-exempt",
        taxIdNumber: "",
        taxExemptCertificate: null,
    })

    const [errors, setErrors] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.businessName.trim()) {
            newErrors.businessName = "Business/Shop Name is required"
        }

        if (variant === "standard") {
            if (!formData.phoneNumber.trim()) {
                newErrors.phoneNumber = "Business Phone Number is required"
            } else if (!/^\d{10,15}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
                newErrors.phoneNumber = "Please enter a valid phone number"
            }

            if (!formData.phoneType) {
                newErrors.phoneType = "Business Phone Type is required"
            }
        }

        if (!formData.firstName.trim()) {
            newErrors.firstName =
                variant === "authorized" ? "Authorized Signer First Name is required" : "First Name is required"
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName =
                variant === "authorized" ? "Authorized Signer Last Name is required" : "Last Name is required"
        }

        if (!formData.jobTitle) {
            newErrors.jobTitle = variant === "authorized" ? "Title of Authorized Signer is required" : "Job Title is required"
        }

        if (variant === "authorized") {
            if (!formData.email.trim()) {
                newErrors.email = "Authorized Signer Email Address is required"
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = "Please Enter A Valid Email Address."
            }

            if (!formData.ownershipType) {
                newErrors.ownershipType = "Ownership Type is required"
            }

            if (formData.taxExemptStatus === "exempt" && !formData.taxIdNumber.trim()) {
                newErrors.taxIdNumber = "Tax ID Number is required for tax exempt businesses"
            }
        }

        if (!formData.shopType) {
            newErrors.shopType = "Shop Type is required"
        }

        if (variant === "standard") {
            if (!formData.language) {
                newErrors.language = "Preferred Language is required"
            }
        }

        if (formData.vat && !/^[A-Z]{2}[0-9A-Z]{2,12}$/.test(formData.vat)) {
            newErrors.vat = "Please enter a valid VAT ID (e.g., DE123456789)"
        }

        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitted(true)

        const validationErrors = validateForm()
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            console.log("Form submitted successfully:", formData)
            onSubmit?.(formData)
        }
    }

    return (
        <div className="max-w-2xl bg-card">
            <div className="mb-6 flex justify-between text-center">
                <h2 className="text-lg font-semibold text-foreground mb-1">BUSINESS INFORMATION</h2>
                <p className="text-sm text-muted-foreground">
                    {variant === "authorized" ? "* Fields are Required" : "| = Fields are Required"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Business/Shop Name */}
                <InputField
                    label="Business/Shop Name"
                    required
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    error={errors.businessName}
                />

                {/* Standard variant: Phone Number and Type */}
                {variant === "standard" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <PhoneField
                            label="Business Phone Number"
                            required
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                            error={errors.phoneNumber}
                        />
                        <SelectField
                            label="Business Phone Type"
                            required
                            options={phoneTypeOptions}
                            value={formData.phoneType}
                            onChange={(e) => handleInputChange("phoneType", e.target.value)}
                            error={errors.phoneType}
                        />
                    </div>
                )}

                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label={variant === "authorized" ? "Authorized Signer First Name" : "First Name"}
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        error={errors.firstName}
                    />
                    <InputField
                        label={variant === "authorized" ? "Authorized Signer Last Name" : "Last Name"}
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        error={errors.lastName}
                    />
                </div>

                {/* Job Title */}
                <SelectField
                    label={variant === "authorized" ? "Title Of Authorized Signer" : "Job Title"}
                    required
                    options={jobTitleOptions}
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                    error={errors.jobTitle}
                    className="w-1/2 border-gray-300 "
                />

                {/* Authorized variant: Email Address */}
                {variant === "authorized" && (
                    <InputField
                        label="Authorized Signer Email Address"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        error={errors.email}
                    />
                )}

                {/* Shop Type and Ownership Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                        label="Shop Type"
                        required
                        options={shopTypeOptions}
                        value={formData.shopType}
                        onChange={(e) => handleInputChange("shopType", e.target.value)}
                        error={errors.shopType}
                        className="w-1/2 border-gray-300 "
                    />
                    {variant === "authorized" && (
                        <SelectField
                            label="Ownership Type"
                            required
                            options={ownershipTypeOptions}
                            value={formData.ownershipType}
                            onChange={(e) => handleInputChange("ownershipType", e.target.value)}
                            error={errors.ownershipType}
                        />
                    )}
                </div>

                {/* Authorized variant: Tax Exempt Status */}
                {variant === "authorized" && (
                    <>
                        <CustomRadioGroupField
                            label="Tax Exempt Status"
                            name="taxExemptStatus"
                            options={taxExemptOptions}
                            value={formData.taxExemptStatus}
                            onChange={(value) => handleInputChange("taxExemptStatus", value)}
                            required
                            error={errors.taxExemptStatus}
                        />

                        {/* Tax ID Number - only show if tax exempt */}
                        {formData.taxExemptStatus === "exempt" && (
                            <InputField
                                label="Enter Your Tax ID Number"
                                required
                                value={formData.taxIdNumber}
                                onChange={(e) => handleInputChange("taxIdNumber", e.target.value)}
                                error={errors.taxIdNumber}
                            />
                        )}

                        {/* Tax Exempt Certificate Upload */}
                        {formData.taxExemptStatus === "exempt" && (
                            <FileUploadField
                                label="Please Upload Your Tax Exempt Certificate Here"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => handleInputChange("taxExemptCertificate", e.target.files?.[0] || null)}
                                warning="Warning: Reseller Certificate does not qualify for tax exemption."
                                error={errors.taxExemptCertificate}
                            />
                        )}
                    </>
                )}

                {/* VAT */}
                <VatField
                    label="VAT"
                    optional
                    placeholder="ENTER VAT ID"
                    value={formData.vat}
                    onChange={(e) => handleInputChange("vat", e.target.value)}
                    error={errors.vat}
                />

                {/* Standard variant: Purchase Order Reference Number */}
                {variant === "standard" && (
                    <InputField
                        label="Purchase Order Reference Number"
                        optional
                        placeholder="ENTER PURCHASED ORDER REFERENCE"
                        value={formData.purchaseOrderRef}
                        onChange={(e) => handleInputChange("purchaseOrderRef", e.target.value)}
                    />
                )}

                {/* Standard variant: Preferred Language */}
                {variant === "standard" && (
                    <SelectField
                        label="Preferred Language For Communication"
                        required
                        options={languageOptions}
                        value={formData.language}
                        onChange={(e) => handleInputChange("language", e.target.value)}
                        error={errors.language}
                        className="w-1/2 border-gray-300 "
                    />
                )}
            </form>
        </div>
    )
}

export default BusinessInformationForm