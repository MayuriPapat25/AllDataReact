// StepContentEUCheckout.stories.jsx
import React, { useState } from "react";
import StepContentEUCheckout from "./index";

export default {
    title: "Organisms/StepContentEUCheckout",
    component: StepContentEUCheckout,
    argTypes: {
        onContinue: { action: "continueClicked" },
        onBack: { action: "backClicked" },
    },
};

const Template = (args) => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleContinue = () => {
        args.onContinue();
        setCurrentStep((prev) => Math.min(prev + 1, 5));
    };

    const handleBack = () => {
        args.onBack();
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    return (
        <StepContentEUCheckout
            {...args}
            currentStep={currentStep}
            onContinue={handleContinue}
            onBack={handleBack}
        />
    );
};

export const Default = Template.bind({});
Default.args = {};

export const Step1 = Template.bind({});
Step1.args = { currentStep: 1 };

export const Step2 = Template.bind({});
Step2.args = { currentStep: 2 };

export const Step3 = Template.bind({});
Step3.args = { currentStep: 3 };

export const Step4 = Template.bind({});
Step4.args = { currentStep: 4 };

export const Step5 = Template.bind({});
Step5.args = { currentStep: 5 };
