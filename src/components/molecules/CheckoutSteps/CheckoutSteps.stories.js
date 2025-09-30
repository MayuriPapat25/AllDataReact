// CheckoutSteps.stories.jsx
import CheckoutSteps from "./index";

export default {
    title: "Components/CheckoutSteps",
    component: CheckoutSteps,
    tags: ["autodocs"],
};

const steps = [
    { number: 1, label: "Shipping" },
    { number: 2, label: "Billing" },
    { number: 3, label: "Review" },
    { number: 4, label: "Confirmation" },
];

export const Step1 = {
    args: {
        currentStep: 1,
        steps,
    },
};

export const Step2 = {
    args: {
        currentStep: 2,
        steps,
    },
};

export const Step3 = {
    args: {
        currentStep: 3,
        steps,
    },
};

export const Completed = {
    args: {
        currentStep: 4,
        steps,
    },
};
