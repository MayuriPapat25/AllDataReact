import React, { useState } from "react"
import StepContentUSAnonyCheckout from "../../components/molecules/StepContentUSAnonyCheckout"
import CheckoutSteps from "../../components/molecules/CheckoutSteps/index"
import USAnonyFlowValidation from "../../components/molecules/USAnonyFlowValidation";
import { useDispatch } from "react-redux";
import { clearBillingAddress, clearBusinessAddress, clearBusinessInfo, clearShippingAddress } from "../../store/store";

const UsAnonyCheckout = () => {
    const dispatch = useDispatch();

    const [currentStep, setCurrentStep] = useState(1);

    const handleContinue = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        // If going from Step 2 → Step 1, clear all BusinessInformation autosaved values
        if (currentStep === 2) {
            dispatch(clearBusinessAddress());
            dispatch(clearBusinessInfo());
            dispatch(clearBillingAddress());
            dispatch(clearShippingAddress())
        }

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
            <div className="">
                <CheckoutSteps currentStep={currentStep} steps={steps} />
                {/* <StepContentUSAnonyCheckout currentStep={currentStep} onContinue={handleContinue} onBack={handleBack} /> */}
                <USAnonyFlowValidation currentStep={currentStep} onContinue={handleContinue} onBack={handleBack} />
            </div>
        </div>
    );
};

export default UsAnonyCheckout;