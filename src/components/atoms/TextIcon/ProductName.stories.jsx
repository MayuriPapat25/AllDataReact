import React from "react";
import ProductName from "./ProductName";

export default {
    title: "Components/ProductName", // Storybook category
    component: ProductName,
    tags: ["autodocs"],
    argTypes: {
        name: {
            control: "text",
            description: "The name of the product to display",
        },
        className: {
            control: "text",
            description: "Custom CSS classes for styling",
        },
    },
};

// Default Template
const Template = (args) => <ProductName {...args} />;

export const Default = Template.bind({});
Default.args = {
    name: "Sample Product",
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
    name: "Stylish Product",
    className: "text-blue-600 font-bold text-lg",
};

export const LongProductName = Template.bind({});
LongProductName.args = {
    name: "This is a very long product name to test wrapping behavior",
    className: "text-gray-800",
};
