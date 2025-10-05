import React, { useState } from "react";
import { ProCartDropdown } from "./proCartDropdown";

export default {
    title: "Organisms/ProCartDropdown",
    component: ProCartDropdown,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "The `ProCartDropdown` component renders the subscription cart overlay or a full-page version of the cart depending on the selected variant. It wraps the `ProCartContent` and provides close handling, overlay, and responsive layout.",
            },
        },
    },
};

/** Default Dropdown View */
const Template = (args) => (
    <div className="relative h-screen bg-gray-100">
        <ProCartDropdown {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    isOpen: true,
    variant: "dropdown",
};
Default.storyName = "Default (Dropdown Open)";

/** Dropdown Closed — Renders Nothing */
export const Closed = Template.bind({});
Closed.args = {
    isOpen: false,
    variant: "dropdown",
};
Closed.storyName = "Closed (Hidden State)";
Closed.parameters = {
    docs: {
        description: {
            story:
                "When `isOpen` is false and variant is `dropdown`, the component does not render anything.",
        },
    },
};

/** Full Page Variant */
export const FullPage = Template.bind({});
FullPage.args = {
    variant: "full",
};
FullPage.storyName = "Full Page View";
FullPage.parameters = {
    docs: {
        description: {
            story:
                "Renders the `ProCartDropdown` as a full-page layout instead of an overlay dropdown. This is typically used for mobile or dedicated cart pages.",
        },
    },
};

/** Interactive Story for Toggling Open/Close */
export const Interactive = (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative h-screen bg-gray-100 flex flex-col items-center justify-center">
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-orange-600 text-white rounded"
            >
                Open Cart Dropdown
            </button>

            {isOpen && (
                <ProCartDropdown
                    {...args}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    variant="dropdown"
                />
            )}
        </div>
    );
};
Interactive.storyName = "Interactive (Open/Close)";
Interactive.parameters = {
    docs: {
        description: {
            story:
                "This story allows toggling the dropdown open and closed, simulating real user interaction.",
        },
    },
};
