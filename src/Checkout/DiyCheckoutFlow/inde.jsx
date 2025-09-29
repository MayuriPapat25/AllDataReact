import { useState } from "react"
import CheckoutSteps from "../../components/molecules/CheckoutSteps"
import StepContentDIYCheckout from "../../components/molecules/StepContentDIYCheckout";

const DIYCheckout = () => {

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
        { number: 1, label: "BILLING" },
        { number: 2, label: "PLACE HOLDER" },
        { number: 3, label: "ORDER COMPLETE" },
    ];

    return (
        <div className="min-h-screen bg-[#fafafa] py-12">
            <div className="">
                <div className="p-8 mb-8 bg-[#fafafa]">
                    <CheckoutSteps currentStep={currentStep} steps={steps} />
                </div>

                <div className="bg-[#fafafa] mx-20">
                    <StepContentDIYCheckout currentStep={currentStep} onContinue={handleContinue} onBack={handleBack} />
                </div>
            </div>
        </div>
    );
};

export default DIYCheckout;