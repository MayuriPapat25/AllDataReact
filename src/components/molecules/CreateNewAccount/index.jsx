import React, { useState } from 'react'
import InputField from '../../atoms/InputField'
import PhoneField from '../../atoms/PhoneNumberField'
import PasswordField from '../../atoms/InputField/PasswordField'
import TermsConditions from '../../atoms/TermsCondition'

const CreateNewAccount = ({ onValidationChange }) => {
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState({
        email: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: "",
    })

    const validateForm = () => {
        const newErrors = {
            email: "",
            phone: "",
            username: "",
            password: "",
            confirmPassword: "",
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = "Please enter a valid email address."
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address."
        }

        // Phone validation
        if (!formData.phone) {
            newErrors.phone = "Please enter at least 10 digits."
        } else if (formData.phone.replace(/\D/g, "").length < 10) {
            newErrors.phone = "Please enter at least 10 digits."
        }

        // Username validation
        if (!formData.username) {
            newErrors.username = "Username is required."
        } else if (formData.username.length < 6) {
            newErrors.username = "Login needs to contain at least 6 characters"
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required."
        } else if (formData.password.length < 8) {
            newErrors.password =
                "Password must be at least 8 characters long and include 3 of the following 4 character types: 1 number, 1 lowercase letter, 1 uppercase letter, 1 symbol. Symbols can include: !@#$%&? ,*"
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password."
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match, please try again."
        }

        setErrors(newErrors)
        return Object.values(newErrors).every((error) => error === "")
    }

    const handleContinue = () => {
        const isFormValid = validateForm()

        if (isFormValid && agreedToTerms) {
            onContinue()
        } else {
            // ensure latest validation state is reflected in parent disabling Continue
            onValidationChange?.(false)
        }
    }

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

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
        const phoneDigits = (formData.phone || "").replace(/\D/g, "")
        const phoneOk = phoneDigits.length >= 10
        const usernameOk = !!formData.username && formData.username.length >= 6
        const passwordOk = isPasswordStrong(formData.password)
        const confirmOk = !!formData.confirmPassword && formData.confirmPassword === formData.password
        return emailOk && phoneOk && usernameOk && passwordOk && confirmOk && agreedToTerms
    }

    // Notify parent component about validation state changes (live)
    React.useEffect(() => {
        onValidationChange?.(computeIsValid())
    }, [formData, agreedToTerms])

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8">
            <div className="mb-8 ml-2.5">
                <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight">CREATE A NEW ACCOUNT</h1>
                <p className="text-gray-600 text-lg">
                    If you are purchasing a new subscription, please create an account below to complete purchase.
                </p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <InputField
                        label="Primary Email Address for General Account Communication"
                        required
                        id="email"
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        error={errors.email}
                        className="w-full border-[#c7c7c7] border-2"
                    />
                </div>

                <div className="space-y-2">
                    <PhoneField
                        label="Business Phone Number"
                        required
                        placeholder="9999889889"
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        error={errors.phone}
                        className="border-[#c7c7c7] border-2"
                    />
                </div>

                <div className="space-y-2">
                    <InputField
                        label="Username"
                        required
                        id="username"
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        error={errors.username}
                        className="w-full border-[#c7c7c7] border-2"
                    />
                </div>
                {/* Password */}
                <PasswordField
                    id="password"
                    label="Password"
                    placeholder="CREATE A PASSWORD"
                    value={formData.password}
                    onChange={(value) => handleInputChange("password", value)}
                    error={errors.password}
                    helperText="Password must be at least 8 characters long and include 3 of the following 4 character types: 1 number, 1 lowercase letter, 1 uppercase letter, 1 symbol. Symbols can include: !@#$%&? ,*"
                    required
                />

                {/* Confirm Password */}
                <PasswordField
                    id="confirmPassword"
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    placeholder='Re-enter Password'
                    onChange={(value) => handleInputChange("confirmPassword", value)}
                    error={errors.confirmPassword}
                    required
                />


                <TermsConditions checked={agreedToTerms} onCheckedChange={setAgreedToTerms} />
            </div>
        </div>
    )
}

export default CreateNewAccount
