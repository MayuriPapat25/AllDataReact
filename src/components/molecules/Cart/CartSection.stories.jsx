// CartSection.stories.jsx
import React from "react";
import { CartSection } from "./CartSection";
import { action } from "storybook/actions";

export default {
    title: "Molecules/CartSection",
    component: CartSection,
    argTypes: {
        title: { control: "text" },
    },
};

const sampleItems = [
    {
        id: 1,
        name: "Premium Subscription",
        description: "Access to all premium features",
        price: 29.99,
        originalPrice: 49.99,
        badge: "MONTHLY",
        badgeVariant: "default",
    },
    {
        id: 2,
        name: "Annual Subscription",
        description: "Full access for 1 year",
        price: 299.99,
        originalPrice: 349.99,
        badge: "ANNUALLY",
        badgeVariant: "default",
    },
];

const Template = (args) => <CartSection {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: "Your Cart",
    items: sampleItems,
    onRemoveItem: action("Item removed"),
};
