import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CheckoutSteps from "../../../components/molecules/CheckoutSteps"
import StepContentDIYCart from "../../../components/molecules/StepContentDIYCart";

const DIYCartFlow = () => {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1);

    const handleContinue = () => {
        if (currentStep < 3) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        } else {
            //Add back page here for add
            navigate('/')
        }
    };

    const steps = [
        { number: 1, label: "FIND YOUR VEHICLE" },
        {
            number: 2, label: "PICK YOUR PLAN"
        },
        { number: 3, label: "PLACE YOUR ORDER" },
    ];

    return (
        <div className="min-h-screen py-12">
            <div className="">
                <CheckoutSteps currentStep={currentStep} steps={steps} onStepClick={(stepNumber) => setCurrentStep(stepNumber)} />
                <StepContentDIYCart currentStep={currentStep} onContinue={handleContinue} onBack={handleBack} />
            </div>
        </div>
    );
};

export default DIYCartFlow;