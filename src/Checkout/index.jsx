"use client"

import { useState } from "react"
import StepContent from "../components/molecules/StepContent"
import CheckoutSteps from "../components/atoms/CheckoutSteps"

const Checkout = () => {
    const [currentStep, setCurrentStep] = useState(1)

    const handleContinue = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    return (
        <div className="min-h-screen bg-[#fafafa] py-12">
            <div className="max-w-6xl mx-auto">
                <div className="p-8 mb-8 bg-[#fafafa]">
                    <CheckoutSteps currentStep={currentStep} />
                </div>

                <div className="bg-[#fafafa] p-8">
                    <StepContent currentStep={currentStep} onContinue={handleContinue} onBack={handleBack} />
                </div>
            </div>
        </div>
    )
}

export default Checkout