// src/components/molecules/CartItem/CartItem.stories.jsx
import React from "react";
import { CartItem } from "./CartItem";
import { action } from "storybook/actions";

export default {
    title: "Molecules/CartItem",
    component: CartItem,
    argTypes: {
        badge: {
            control: { type: "select", options: ["MONTHLY", "ANNUALLY", ""] },
        },
    },
};

const Template = (args) => <CartItem {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: 1,
    name: "Premium Subscription",
    description: "Access to all premium features",
    price: 29.99,
    originalPrice: 49.99,
    badge: "MONTHLY",
    badgeVariant: "default",
    onRemove: action("Removed item"),
};