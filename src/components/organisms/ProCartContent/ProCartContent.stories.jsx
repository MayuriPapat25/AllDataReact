import React, { useState } from "react";
import { ProCartContent } from "./ProCartContent";

export default {
    title: "Organisms/ProCartContent",
    component: ProCartContent,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "The `ProCartContent` component displays a complete shopping cart experience for ALLDATA PRO subscriptions. It includes messages, pricing summary, subscription terms, access point management, and checkout actions.",
            },
        },
    },
};

const Template = (args) => (
    <div className="w-full max-w-4xl p-6 bg-gray-50 min-h-screen">
        <ProCartContent {...args} />
    </div>
);

/** Default view with monthly billing and populated cart */
export const Default = Template.bind({});
Default.args = {};
Default.storyName = "Default View";

/** Simulates the user switching to annual billing mode */
export const AnnualBilling = () => {
    const [mode, setMode] = useState("ANNUALLY");

    return (
        <div className="w-full max-w-4xl p-6 bg-gray-50 min-h-screen">
            <ProCartContent />
            <div className="mt-4 text-sm text-gray-500 text-center">
                (Simulating annual payment frequency)
            </div>
        </div>
    );
};
AnnualBilling.storyName = "Annual Billing Mode";

/** Story showing Access Points Modal open */
export const WithAccessPointsModal = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="w-full max-w-4xl p-6 bg-gray-50 min-h-screen">
            <ProCartContent />
            <div className="mt-4 text-sm text-gray-500 text-center">
                (Access Points Modal is visible)
            </div>
        </div>
    );
};
WithAccessPointsModal.storyName = "Access Points Modal Open";

/** Story for UI testing and layout review */
export const LayoutReview = Template.bind({});
LayoutReview.args = {};
LayoutReview.storyName = "Layout & UI Review";
LayoutReview.parameters = {
    docs: {
        description: {
            story:
                "A visual layout test story to review spacing, typography, and responsive layout for `ProCartContent`.",
        },
    },
};

/** Interactive story to simulate real usage */
export const Interactive = () => {
    const [show, setShow] = useState(true);
    return (
        <div className="relative w-full max-w-4xl p-6 bg-gray-50 min-h-screen">
            <button
                onClick={() => setShow((prev) => !prev)}
                className="mb-4 px-4 py-2 bg-orange-500 text-white rounded"
            >
                {show ? "Hide Cart" : "Show Cart"}
            </button>
            {show && <ProCartContent />}
        </div>
    );
};
Interactive.storyName = "Interactive (Toggle View)";
Interactive.parameters = {
    docs: {
        description: {
            story:
                "Allows toggling the visibility of the ProCartContent component interactively within Storybook.",
        },
    },
};
