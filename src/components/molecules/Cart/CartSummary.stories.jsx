// CartSummary.stories.jsx
import React from "react";
import { CartSummary } from "./CartSummary";

export default {
    title: "Molecules/CartSummary",
    component: CartSummary,
    argTypes: {
        subtotal: { control: 'number' },
        bundleDiscount: { control: 'number' },
        taxWarranty: { control: 'number' },
        total: { control: 'number' },
    },
};

const Template = (args) => <CartSummary {...args} />;

export const Default = Template.bind({});
Default.args = {
    subtotal: 120.0,
    bundleDiscount: 20.0,
    taxWarranty: 5.0,
    total: 105.0,
};

export const NoDiscount = Template.bind({});
NoDiscount.args = {
    subtotal: 120.0,
    bundleDiscount: 0.0,
    taxWarranty: 5.0,
    total: 125.0,
};

export const HighDiscount = Template.bind({});
HighDiscount.args = {
    subtotal: 200.0,
    bundleDiscount: 100.0,
    taxWarranty: 10.0,
    total: 110.0,
};
