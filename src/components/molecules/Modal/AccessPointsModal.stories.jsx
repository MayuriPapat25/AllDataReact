// AccessPointsModal.stories.jsx
import React, { useState } from "react";
import { AccessPointsModal } from "./AccessPointsModal";

export default {
    title: "Molecules/AccessPointsModal",
    component: AccessPointsModal,
    argTypes: {
        isOpen: { control: "boolean" },
        onClose: { action: "closed" },
    },
};

const Template = (args) => {
    const [open, setOpen] = useState(args.isOpen);

    const handleClose = () => {
        setOpen(false);
        args.onClose();
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Open Modal
            </button>
            <AccessPointsModal {...args} isOpen={open} onClose={handleClose} />
        </>
    );
};

export const Default = Template.bind({});
Default.args = {
    isOpen: false,
};
