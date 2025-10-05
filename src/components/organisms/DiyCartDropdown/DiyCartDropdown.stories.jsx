import React, { useState } from "react";
import { DiyCartDropdown } from "./diyCartDropdown";

export default {
    title: "Molecules/DiyCartDropdown",
    component: DiyCartDropdown,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "The `DiyCartDropdown` component displays a dropdown cart summary for the DIY shop. It shows cart items, pricing, and navigation options to view the full cart.",
            },
        },
    },
};

/**
 * Wrapper for demonstrating open/close interaction inside Storybook
 */
const InteractiveTemplate = (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    return (
        <div className="relative h-96 flex items-start justify-center pt-10">
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {isOpen ? "Close Cart" : "Open Cart"}
            </button>
            <DiyCartDropdown {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};

const Template = (args) => (
    <div className="relative h-96 flex justify-end p-8 bg-gray-50">
        <DiyCartDropdown {...args} />
    </div>
);

/** Default open view showing two demo items */
export const Default = Template.bind({});
Default.args = {
    isOpen: true,
    className: "top-10 right-10",
};
Default.storyName = "Default (Open with Items)";

/** Story with dropdown closed — renders nothing */
export const Closed = Template.bind({});
Closed.args = {
    isOpen: false,
};
Closed.storyName = "Closed (Hidden State)";
Closed.parameters = {
    docs: {
        description: {
            story:
                "When `isOpen` is false, the dropdown does not render. This story verifies conditional rendering.",
        },
    },
};

/** Story simulating empty cart */
export const EmptyCart = (args) => {
    const EmptyMock = () => {
        const [isOpen, setIsOpen] = useState(true);
        return (
            <div className="relative h-96 flex justify-end p-8 bg-gray-50">
                <DiyCartDropdown
                    {...args}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    className="top-10 right-10"
                />
            </div>
        );
    };
    return <EmptyMock />;
};
EmptyCart.storyName = "Empty Cart";

/** Interactive demo with open/close button */
export const Interactive = InteractiveTemplate.bind({});
Interactive.args = {
    isOpen: false,
};
Interactive.storyName = "Interactive Toggle";
Interactive.parameters = {
    docs: {
        description: {
            story:
                "Use this story to interactively open and close the dropdown inside Storybook.",
        },
    },
};
