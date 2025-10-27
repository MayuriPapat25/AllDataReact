import React from "react"
import { useState } from "react"
import InputField from "../../../shared/ui/InputField/index"
import SelectField from "../../../shared/ui/SelectField"
import PhoneField from "../../../shared/ui/PhoneNumberField"
import FileUploadField from "../../../shared/ui/FileUpload"
import CustomRadioGroupField from "../../molecules/CustomRadioGroupField"

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

const BusinessInformationForm = ({ variant = "standard", onSubmit, onValidationChange }) => {
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
        // Emit validation status on every change
        const next = { ...formData, [field]: value }
        const validationErrors = validateForm(next)
        onValidationChange?.(Object.keys(validationErrors).length === 0)
    }

    const validateForm = (data = formData) => {
        const newErrors = {}

        if (!data.businessName.trim()) {
            newErrors.businessName = "Business/Shop Name is required"
        }

        if (variant === "standard") {
            if (!data.phoneNumber.trim()) {
                newErrors.phoneNumber = "Business Phone Number is required"
            } else if (!/^\d{10,15}$/.test(data.phoneNumber.replace(/\s/g, ""))) {
                newErrors.phoneNumber = "Please enter a valid phone number"
            }

            if (!data.phoneType) {
                newErrors.phoneType = "Business Phone Type is required"
            }
        }

        if (!data.firstName.trim()) {
            newErrors.firstName =
                variant === "authorized" ? "Authorized Signer First Name is required" : "First Name is required"
        }

        if (!data.lastName.trim()) {
            newErrors.lastName =
                variant === "authorized" ? "Authorized Signer Last Name is required" : "Last Name is required"
        }

        if (!data.jobTitle) {
            newErrors.jobTitle = variant === "authorized" ? "Title of Authorized Signer is required" : "Job Title is required"
        }

        if (variant === "authorized") {
            if (!data.email.trim()) {
                newErrors.email = "Authorized Signer Email Address is required"
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                newErrors.email = "Please Enter A Valid Email Address."
            }

            if (!data.ownershipType) {
                newErrors.ownershipType = "Ownership Type is required"
            }

            if (data.taxExemptStatus === "exempt" && !data.taxIdNumber.trim()) {
                newErrors.taxIdNumber = "Tax ID Number is required for tax exempt businesses"
            }
        }

        if (!data.shopType) {
            newErrors.shopType = "Shop Type is required"
        }

        if (variant === "standard") {
            if (!data.language) {
                newErrors.language = "Preferred Language is required"
            }
        }

        if (data.vat && !/^[A-Z]{2}[0-9A-Z]{2,12}$/.test(data.vat)) {
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

    // Emit initial validation state
    React.useEffect(() => {
        onValidationChange?.(Object.keys(validateForm()).length === 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="max-w-2xl bg-card pb-8 border-b-2 border-gray-300">
            <div className="mb-6 flex justify-between text-center">
                <h2 className="mb-1 text-md">BUSINESS INFORMATION</h2>
                <p className="text-sm text-muted-foreground">
                    {variant === "standard" && "| = Fields are Required"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Business/Shop Name */}
                <InputField
                    label="Business/Shop Name"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    error={errors.businessName}
                    required={variant === "standard"}
                />

                {/* Standard variant: Phone Number and Type */}
                {variant === "standard" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <PhoneField
                            label="Business Phone Number"
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                            error={errors.phoneNumber}
                            required={variant === "standard"}
                        />
                        <SelectField
                            label="Business Phone Type"
                            options={phoneTypeOptions}
                            value={formData.phoneType}
                            onChange={(e) => handleInputChange("phoneType", e.target.value)}
                            error={errors.phoneType}
                            className="w-full"
                            required={variant === "standard"}
                        />
                    </div>
                )}

                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label={variant === "authorized" ? "Authorized Signer First Name" : "First Name"}
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        error={errors.firstName}
                        required={variant === "standard"}
                    />
                    <InputField
                        label={variant === "authorized" ? "Authorized Signer Last Name" : "Last Name"}
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        error={errors.lastName}
                        required={variant === "standard"}
                    />
                </div>

                {/* Job Title */}
                <SelectField
                    label={variant === "authorized" ? "Title Of Authorized Signer" : "Job Title"}
                    options={jobTitleOptions}
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                    error={errors.jobTitle}
                    className="w-full border-gray-300 "
                    required={variant === "standard"}
                />

                {/* Authorized variant: Email Address */}
                {variant === "authorized" && (
                    <InputField
                        label="Authorized Signer Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        error={errors.email}
                    />
                )}

                {/* Shop Type and Ownership Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                        label="Shop Type"
                        options={shopTypeOptions}
                        value={formData.shopType}
                        onChange={(e) => handleInputChange("shopType", e.target.value)}
                        error={errors.shopType}
                        className="w-full border-gray-300 "
                        required={variant === "standard"}
                    />
                    {variant === "authorized" && (
                        <SelectField
                            label="Ownership Type"
                            options={ownershipTypeOptions}
                            value={formData.ownershipType}
                            onChange={(e) => handleInputChange("ownershipType", e.target.value)}
                            error={errors.ownershipType}
                            className="w-full border-gray-300 "
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
                            error={errors.taxExemptStatus}
                        />

                        {/* Tax ID Number - only show if tax exempt */}
                        {formData.taxExemptStatus === "exempt" && (
                            <InputField
                                label="Enter Your Tax ID Number"
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
                {/* <VatField
                    label="VAT"
                    optional
                    placeholder="ENTER VAT ID"
                    value={formData.vat}
                    onChange={(e) => handleInputChange("vat", e.target.value)}
                    error={errors.vat}
                /> */}

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