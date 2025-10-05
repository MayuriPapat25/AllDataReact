// AccountUpdateModal.stories.jsx
import React, { useState } from "react";
import AccountUpdateModal from "./index";

export default {
    title: "Organisms/AccountUpdateModal",
    component: AccountUpdateModal,
    tags: ["autodocs"],
};

// A wrapper with state, since modal depends on isOpen
const ModalWrapper = (args) => {
    const [open, setOpen] = useState(args.isOpen);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="px-4 py-2 rounded bg-indigo-600 text-white"
            >
                Open Modal
            </button>
            <AccountUpdateModal
                {...args}
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
};

// ✅ Default Modal
export const Default = (args) => <ModalWrapper {...args} />;
Default.args = {
    isOpen: true,
    title: "Request to Update Account Details",
    desc1: "Account Details cannot be changed without a request approval.",
    desc2:
        "Please allow 24-48 hours for Account information to be reviewed and updated.",
};

// ✅ Custom Title + Descriptions
export const CustomTitleAndDescription = (args) => <ModalWrapper {...args} />;
CustomTitleAndDescription.args = {
    isOpen: true,
    title: "Update Shop Information",
    desc1: "You can request to update shop details here.",
    desc2: "Our team will review your request within 1-2 business days.",
};

// ✅ Closed State
export const Closed = (args) => <ModalWrapper {...args} />;
Closed.args = {
    isOpen: false,
};

// ✅ Interactive Form Fill
export const Interactive = (args) => <ModalWrapper {...args} />;
Interactive.args = {
    isOpen: true,
};
Interactive.parameters = {
    docs: {
        description: {
            story:
                "Fill in form fields, toggle checkboxes, and submit the form to see state changes in the console.",
        },
    },
};
