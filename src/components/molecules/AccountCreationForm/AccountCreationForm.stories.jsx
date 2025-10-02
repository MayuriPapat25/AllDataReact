// src/stories/AccountCreationForm.stories.jsx
import React from "react";
import AccountCreationForm from "./index"; // adjust import path
import { action } from "@storybook/addon-actions";

export default {
    title: "Forms/AccountCreationForm",
    component: AccountCreationForm,
    argTypes: {
        variant: {
            control: { type: "select" },
            options: ["full", "business", "email"],
        },
        className: { control: "text" },
    },
};

// Base template
const Template = (args) => <AccountCreationForm {...args} />;

// --- Stories ---

export const FullVariant = Template.bind({});
FullVariant.args = {
    variant: "full",
    onSubmit: action("Form Submitted"),
    onValidationChange: action("Validation Changed"),
};

export const BusinessVariant = Template.bind({});
BusinessVariant.args = {
    variant: "business",
    onSubmit: action("Form Submitted"),
    onValidationChange: action("Validation Changed"),
};

export const EmailVariant = Template.bind({});
EmailVariant.args = {
    variant: "email",
    onSubmit: action("Form Submitted"),
    onValidationChange: action("Validation Changed"),
};

// Interactive demo with local state
export const Interactive = () => (
    <div className="p-6 bg-gray-50 min-h-screen">
        <AccountCreationForm
            variant="full"
            onSubmit={(data) => {
                action("Form Submitted")(data);
                alert("Form submitted! Check Actions tab in Storybook.");
            }}
            onValidationChange={action("Validation Changed")}
        />
    </div>
);
