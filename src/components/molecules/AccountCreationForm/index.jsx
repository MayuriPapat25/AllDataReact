import { useState, useEffect } from "react"
import InputField from "../../atoms/InputField/index"
import PasswordField from "../../atoms/InputField/PasswordField"
import PhoneField from "../../atoms/PhoneNumberField"
import SelectField from "../../atoms/SelectField"

const AccountCreationForm = ({
    variant = "full", // "full", "business", or "email"
    onSubmit,
    className = "",
    onValidationChange
}) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        businessPhone: "",
        email: "",
        confirmEmail: "",
        streetAddress: "",
        unit: "",
        city: "",
        state: "",
        zipCode: "",
        username: "",
        password: "",
        confirmPassword: "",
        useBillingAddress: false,
        agreeToTerms: false,
    })

    const [errors, setErrors] = useState({})
    // Agreement is tracked inside formData.agreeToTerms

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: "",
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (variant === "full") {
            if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
            if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
            if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required"
            if (!formData.confirmEmail.trim()) newErrors.confirmEmail = "Please confirm your email"
            if (formData.email !== formData.confirmEmail) newErrors.confirmEmail = "Emails do not match"
            if (!formData.streetAddress.trim()) newErrors.streetAddress = "Street address is required"
            if (!formData.city.trim()) newErrors.city = "City is required"
            if (!formData.state.trim()) newErrors.state = "State is required"
            if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
        } else if (variant === "business") {
            if (!formData.businessPhone.trim()) newErrors.businessPhone = "Business phone is required"
        }

        // Common validations
        if (!formData.email.trim()) newErrors.email = "Email is required"

        if (variant !== "email") {
            if (!formData.username.trim()) newErrors.username = "Username is required"
            if (variant === "business" && formData.username.length < 6) {
                newErrors.username = "Login needs to contain at least 6 characters"
            }
            if (!formData.password.trim()) newErrors.password = "Password is required"
            if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Please confirm your password"
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match"
            }
        }

        if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            onSubmit?.(formData)
        }
    }

    const stateOptions = [
        { value: "", label: "- Select -" },
        { value: "AL", label: "Alabama" },
        { value: "AK", label: "Alaska" },
        { value: "AZ", label: "Arizona" },
        { value: "AR", label: "Arkansas" },
        { value: "CA", label: "California" },
        // Add more states as needed
    ]

    const getHeaderContent = () => {
        switch (variant) {
            case "email":
                return {
                    title: "CONTINUE WITH YOUR EMAIL",
                    description: "Enter your email to receive your order confirmation and complete product setup after purchase.",
                    showRequiredIndicator: true,
                }
            default:
                return {
                    title: "CREATE A NEW ACCOUNT",
                    description: "If you are purchasing a new subscription, please create an account below to complete purchase.",
                    showRequiredIndicator: variant === "full",
                }
        }
    }

    const headerContent = getHeaderContent()

    const isPasswordStrong = (password) => {
        if (!password || password.length < 8) return false
        let types = 0
        if (/[0-9]/.test(password)) types++
        if (/[a-z]/.test(password)) types++
        if (/[A-Z]/.test(password)) types++
        if (/[!@#$%&? ,*]/.test(password)) types++
        return types >= 3
    }

    const computeIsValid = () => {
        const emailOk = !!formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        // Determine which phone field is required based on variant
        const rawPhone = variant === "full" ? formData.phoneNumber : variant === "business" ? formData.businessPhone : ""
        const phoneDigits = (rawPhone || "").replace(/\D/g, "")
        const phoneOk = variant === "email" ? true : phoneDigits.length >= 10
        const usernameOk = variant === "email" ? true : (!!formData.username && formData.username.length >= 6)
        const passwordOk = variant === "email" ? true : isPasswordStrong(formData.password)
        const confirmOk = variant === "email" ? true : (!!formData.confirmPassword && formData.confirmPassword === formData.password)
        const agreeOk = !!formData.agreeToTerms
        return emailOk && phoneOk && usernameOk && passwordOk && confirmOk && agreeOk
    }

    useEffect(() => {
        onValidationChange?.(computeIsValid())
    }, [formData, variant])

    return (
        <div className={`max-w-2xl mx-auto p-6 ${className}`}>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-black mb-4">{headerContent.title}</h1>
                <p className="text-gray-600">{headerContent.description}</p>
                {variant === "email" && (
                    <p className="text-gray-600 mt-4">
                        <span className="font-medium">Already have a subscription?</span> Please call{" "}
                        <span className="font-bold">+49 (0) 221 53 41 07 0</span> to edit or modify your existing subscription.
                    </p>
                )}
                {headerContent.showRequiredIndicator && (
                    <p className="text-gray-500 text-sm mt-2 flex items-center">
                        <span className="text-green-600 mr-1">|</span>= Fields are Required
                    </p>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {variant === "full" && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="First Name"
                                required
                                value={formData.firstName}
                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                                placeholder="FIRST NAME"
                                error={errors.firstName}
                            />
                            <InputField
                                label="Last Name"
                                required
                                value={formData.lastName}
                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                                placeholder="LAST NAME"
                                error={errors.lastName}
                            />
                        </div>

                        <PhoneField
                            label="Phone Number"
                            required
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                            placeholder="PHONE NUMBER"
                            error={errors.phoneNumber}
                        />
                    </>
                )}

                <InputField
                    label={
                        variant === "full"
                            ? "Email Address"
                            : variant === "email"
                                ? "Primary Email Address"
                                : "Primary Email Address for General Account Communication"
                    }
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder={variant === "full" ? "EMAIL ADDRESS" : "PRIMARY EMAIL ADDRESS"}
                    error={errors.email}
                    helperText={
                        variant === "full"
                            ? "Used for Username and General Account Information"
                            : variant === "email"
                                ? "Used for Username and General Account Communication"
                                : undefined
                    }
                />

                {variant === "full" && (
                    <InputField
                        label="Confirm Email Address"
                        required
                        type="email"
                        value={formData.confirmEmail}
                        onChange={(e) => handleInputChange("confirmEmail", e.target.value)}
                        placeholder="RE-ENTER EMAIL ADDRESS"
                        error={errors.confirmEmail}
                    />
                )}

                {variant === "business" && (
                    <PhoneField
                        label="Business/Shop Phone Number"
                        required
                        value={formData.businessPhone}
                        onChange={(e) => handleInputChange("businessPhone", e.target.value)}
                        placeholder="BUSINESS/SHOP PHONE NUMBER"
                        error={errors.businessPhone}
                    />
                )}

                {variant === "full" && (
                    <>
                        <InputField
                            label="Street address"
                            required
                            value={formData.streetAddress}
                            onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                            error={errors.streetAddress}
                        />

                        <InputField
                            label="Unit, Suite, Apartment, etc."
                            optional
                            value={formData.unit}
                            onChange={(e) => handleInputChange("unit", e.target.value)}
                        />

                        <InputField
                            label="City"
                            required
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            error={errors.city}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <SelectField
                                    label="State"
                                    required
                                    options={stateOptions}
                                    value={formData.state}
                                    onChange={(e) => handleInputChange("state", e.target.value)}
                                    error={errors.state}
                                />
                                <p className="text-sm text-gray-600 mt-1">
                                    Don't see your State/Province?
                                    <br />
                                    Change your Region and reselect Plan{" "}
                                    <a href="#" className="text-blue-600 underline">
                                        HERE
                                    </a>
                                    .
                                </p>
                            </div>
                            <InputField
                                label="ZIP code"
                                required
                                value={formData.zipCode}
                                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                error={errors.zipCode}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="billingAddress"
                                checked={formData.useBillingAddress}
                                onChange={(e) => handleInputChange("useBillingAddress", e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="billingAddress" className="text-sm text-gray-700">
                                Use for my billing address
                            </label>
                        </div>
                    </>
                )}

                {variant !== "email" && (
                    <>
                        <InputField
                            label="Username"
                            required
                            value={formData.username}
                            onChange={(e) => handleInputChange("username", e.target.value)}
                            placeholder={variant === "full" ? "USERNAME" : "CREATE A USERNAME"}
                            error={errors.username}
                            helperText={variant === "business" ? "Login needs to contain at least 6 characters" : undefined}
                        />

                        <PasswordField
                            id="password"
                            label="Password"
                            value={formData.password}
                            onChange={(value) => handleInputChange("password", value)}
                            placeholder={variant === "full" ? "CREATE A PASSWORD" : "CREATE A PASSWORD"}
                            error={errors.password}
                            required
                            helperText="Password must be at least 8 characters long and include 3 of the following 4 character types: 1 number, 1 lowercase letter, 1 uppercase letter, 1 symbol. Symbols can include: !@#$%&? ,*"
                        />

                        <PasswordField
                            id="confirmPassword"
                            label="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={(value) => handleInputChange("confirmPassword", value)}
                            placeholder="RE-ENTER YOUR PASSWORD"
                            error={errors.confirmPassword}
                            required
                        />
                    </>
                )}

                <div className="flex items-start space-x-2">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                        {variant === "email" ? (
                            <>
                                I agree to opt-in to receive emails from ALLDATA. We respect your privacy. Learn more about ALLDATA's{" "}
                                <a href="#" className="text-blue-600 underline">
                                    Privacy Policy
                                </a>
                                .
                            </>
                        ) : (
                            <>
                                I agree to ALLDATA's{" "}
                                <a href="#" className="text-blue-600 underline">
                                    Terms & Conditions
                                </a>{" "}
                                and opt-in to receive emails from ALLDATA. We respect your privacy. Learn more about ALLDATA's{" "}
                                <a href="#" className="text-blue-600 underline">
                                    Privacy Policy
                                </a>
                                .
                            </>
                        )}
                    </label>
                    {errors.agreeToTerms && <p className="text-sm text-red-500 mt-1">{errors.agreeToTerms}</p>}
                </div>
            </form>
        </div>)
}

export default AccountCreationForm
