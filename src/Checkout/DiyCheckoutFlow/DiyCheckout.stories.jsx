// src/stories/DIYCheckout.stories.jsx
import React, { useState } from "react";
import DIYCheckout from "./index";

export default {
    title: "Pages/DIYCheckout",
    component: DIYCheckout,
};

export const Default = () => <DIYCheckout />;

export const Interactive = () => {
    const [step, setStep] = useState(1);

    const handleContinue = () => {
        if (step < 5) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    return <DIYCheckout currentStep={step} onContinue={handleContinue} onBack={handleBack} />;
};
