"use client"

import { useState } from "react"
import StepContentUSAnonyCheckout from "../components/molecules/StepContentUSAnonyCheckout"
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

    const steps = [
        { number: 1, label: "ACCOUNT" },
        { number: 2, label: "COMPANY & BILLING" },
        { number: 3, label: "REVIEW" },
        { number: 4, label: "TERMS" },
        { number: 5, label: "ORDER COMPLETE" },
    ]

    return (
        <div className="min-h-screen bg-[#fafafa] py-12">
            <div className="">
                <div className="p-8 mb-8 bg-[#fafafa]">
                    <CheckoutSteps currentStep={currentStep} steps={steps} />
                </div>

                <div className="bg-[#fafafa] mx-20">
                    <StepContentUSAnonyCheckout currentStep={currentStep} onContinue={handleContinue} onBack={handleBack} />
                </div>
            </div>
        </div>
    )
}

export default Checkout