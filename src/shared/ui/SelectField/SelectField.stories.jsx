import React from "react";
import SelectField from "./index";

export default {
    title: "Atoms/SelectField",
    component: SelectField,
    tags: ["autodocs"],
    parameters: {
        a11y: {
            // Ensures accessibility linting runs in Storybook
            disable: false,
        },
    },
};

const Template = (args) => <SelectField {...args} />;

// ✅ Story 1: With Visible Label
export const WithLabel = Template.bind({});
WithLabel.args = {
    label: "Choose a Number",
    options: [
        { value: "1", label: "One" },
        { value: "2", label: "Two" },
        { value: "3", label: "Three" },
    ],
    id: "number-select",
};

// ✅ Story 2: Without Visible Label (ARIA label fallback)
export const WithAriaLabel = Template.bind({});
WithAriaLabel.args = {
    "aria-label": "Select a Number",
    options: [
        { value: "1", label: "One" },
        { value: "2", label: "Two" },
        { value: "3", label: "Three" },
    ],
};

// ✅ Story 3: With Error Message
export const WithError = Template.bind({});
WithError.args = {
    label: "Select Country",
    options: [
        { value: "us", label: "United States" },
        { value: "ca", label: "Canada" },
    ],
    error: "This field is required.",
};

// ✅ Story 4: Optional Field
export const OptionalField = Template.bind({});
OptionalField.args = {
    label: "Select State",
    optional: true,
    options: [
        { value: "ca", label: "California" },
        { value: "tx", label: "Texas" },
        { value: "ny", label: "New York" },
    ],
};
