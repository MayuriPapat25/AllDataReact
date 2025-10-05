// src/stories/AccountClosureModal.stories.jsx
import React, { useState } from "react";
import AccountClosureModal from "./index";

export default {
    title: "Molecules/AccountClosureModal",
    component: AccountClosureModal,
    argTypes: {
        isOpen: { control: "boolean" },
        title: { control: "text" },
        desc1: { control: "text" },
        desc2: { control: "text" },
        requiredMessage: { control: "text" },
    },
};

const Template = (args) => <AccountClosureModal {...args} />;

export const Closed = Template.bind({});
Closed.args = {
    isOpen: false,
    title: "Close Account",
    desc1: "You are requesting to close your account.",
    desc2: "Please confirm your details before submitting.",
    requiredMessage: "= Required Fields",
};

export const Open = Template.bind({});
Open.args = {
    isOpen: true,
    title: "Close Account",
    desc1: "You are requesting to close your account.",
    desc2: "Please confirm your details before submitting.",
    requiredMessage: "= Required Fields",
};

export const Interactive = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="p-6">
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setOpen(true)}
            >
                Open Modal
            </button>

            <AccountClosureModal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Close Account"
                desc1="You are requesting to close your account."
                desc2="Please confirm your details before submitting."
                requiredMessage="= Required Fields"
            />
        </div>
    );
};
