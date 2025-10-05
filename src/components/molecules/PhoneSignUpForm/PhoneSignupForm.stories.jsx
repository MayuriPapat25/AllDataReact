// PhoneSignupForm.stories.jsx
import React, { useState } from "react";
import PhoneSignupForm from "./index";

export default {
    title: "Organisms/PhoneSignupForm",
    component: PhoneSignupForm,
    argTypes: {
        onEdit: { action: "editClicked" },
    },
};

const Template = (args) => {
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleEdit = () => {
        setPhoneNumber("");
        args.onEdit();
    };

    return <PhoneSignupForm phoneNumber={phoneNumber} onEdit={handleEdit} />;
};

export const EmptyForm = Template.bind({});
EmptyForm.args = {};

export const FilledForm = Template.bind({});
FilledForm.args = {};
FilledForm.decorators = [
    (Story) => {
        const [phoneNumber, setPhoneNumber] = useState("9998989898");

        const handleEdit = () => setPhoneNumber("");

        return <PhoneSignupForm phoneNumber={phoneNumber} onEdit={handleEdit} />;
    },
];
