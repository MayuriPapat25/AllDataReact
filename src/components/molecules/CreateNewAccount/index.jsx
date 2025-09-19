import React, { useState } from 'react'
import InputField from '../../atoms/InputField'
import PhoneField from '../../atoms/PhoneNumberField'
import PasswordField from '../../atoms/InputField/PasswordField'
import TermsConditions from '../../atoms/TermsCondition'
import { Button } from '../../atoms/Buttons/Button'

const CreateNewAccount = ({ onContinue, onCancel }) => {
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
        console.log('on click handleContinue')
        const isFormValid = validateForm()

        if (isFormValid && agreedToTerms) {
            onContinue()
        }
        // If validation fails, errors are already set by validateForm() and will be displayed
    }

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8">
            <div className="mb-8">
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
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        error={errors.email}
                        className="w-full"
                    />
                </div>

                <div className="space-y-2">
                    <PhoneField
                        label="Business Phone Number"
                        required
                        placeholder="9999889889"
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        error={errors.phone}
                    />
                </div>

                <div className="space-y-2">
                    <InputField
                        label="Username"
                        required
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        error={errors.username}
                        className="w-full"
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

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                        handleClick={handleContinue}
                        className="h-12 px-8 hover:bg-gray-50 bg-transparent text-gray-700 font-medium text-base border-2 border-orange-500"
                    >
                        CONTINUE TO COMPANY & BILLING
                    </Button>
                    {onCancel && (
                        <Button
                            handleClick={onCancel}
                            variant="outline"
                            className="h-12 px-8 border-2 border-gray-300 text-gray-700 font-medium text-base hover:bg-gray-50 bg-transparent"
                            variants='outline'
                        >
                            CANCEL
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateNewAccount
