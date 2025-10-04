// Steps.stories.jsx
import React from "react";
import { Steps } from "./cartSteps";

export default {
    title: "Atoms/Steps",
    component: Steps,
    argTypes: {
        currentStep: {
            control: { type: "range", min: 1, max: 3, step: 1 },
            description: "Current active step",
        },
    },
};

const Template = (args) => <Steps {...args} />;

export const Step1 = Template.bind({});
Step1.args = {
    currentStep: 1,
};

export const Step2 = Template.bind({});
Step2.args = {
    currentStep: 2,
};

export const Step3 = Template.bind({});
Step3.args = {
    currentStep: 3,
};

export const Interactive = Template.bind({});
Interactive.args = {
    currentStep: 1,
};
Interactive.parameters = {
    controls: { include: ["currentStep"] },
};
