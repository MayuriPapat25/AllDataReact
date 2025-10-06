import { useState } from "react"
import CheckoutSteps from "../../components/molecules/CheckoutSteps/index"
import StepContentEUCheckout from "../../components/molecules/StepContentEUCheckout"

const EuCheckout = () => {

    const [currentStep, setCurrentStep] = useState(1);

    const handleContinue = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const steps = [
        { number: 1, label: "ACCOUNT" },
        { number: 2, label: "COMPANY & BILLING" },
        { number: 3, label: "REVIEW" },
        { number: 4, label: "TERMS" },
        { number: 5, label: "ORDER COMPLETE" },
    ];

    return (
        <div className="min-h-screen py-12">
            <CheckoutSteps currentStep={currentStep} steps={steps} />
            <StepContentEUCheckout currentStep={currentStep} onContinue={handleContinue} onBack={handleBack} />
        </div>
    );
};

export default EuCheckout;