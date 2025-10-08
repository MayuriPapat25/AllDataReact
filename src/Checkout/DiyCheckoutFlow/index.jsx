import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CheckoutSteps from "../../components/molecules/CheckoutSteps"
import StepContentDIYCheckout from "../../components/molecules/StepContentDIYCheckout";

const DIYCheckout = () => {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1);

    const handleContinue = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            navigate('/diycustomeraccount')
        }
    };

    const steps = [
        { number: 1, label: "BILLING" },
        { number: 2, label: "PLACE HOLDER" },
        { number: 3, label: "ORDER COMPLETE" },
    ];

    return (
        <div className="min-h-screen py-12">
            <div className="">
                <CheckoutSteps currentStep={currentStep} steps={steps} />

                <StepContentDIYCheckout currentStep={currentStep} onContinue={handleContinue} onBack={handleBack} />
            </div>
        </div>
    );
};

export default DIYCheckout;