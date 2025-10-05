// CustomRadioGroupField.stories.jsx
import React, { useState } from "react";
import CustomRadioGroupField from "./index";

export default {
    title: "Molecules/CustomRadioGroupField",
    component: CustomRadioGroupField,
    argTypes: {
        label: { control: "text" },
        name: { control: "text" },
        options: { control: "object" },
        value: { control: "text" },
        required: { control: "boolean" },
        optional: { control: "boolean" },
        error: { control: "text" },
        className: { control: "text" },
    },
};

const Template = (args) => {
    const [selected, setSelected] = useState(args.value || "");
    return <CustomRadioGroupField {...args} value={selected} onChange={setSelected} />;
};

export const Default = Template.bind({});
Default.args = {
    label: "Select an option",
    name: "example",
    options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
    ],
    value: "option1",
};

export const RequiredField = Template.bind({});
RequiredField.args = {
    ...Default.args,
    required: true,
};

export const OptionalField = Template.bind({});
OptionalField.args = {
    ...Default.args,
    optional: true,
};

export const WithError = Template.bind({});
WithError.args = {
    ...Default.args,
    error: "Please select an option",
};
