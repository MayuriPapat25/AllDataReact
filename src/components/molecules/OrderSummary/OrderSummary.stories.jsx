// OrderSummary.stories.jsx
import React from "react";
import OrderSummary from "./index";

export default {
    title: "Organisms/OrderSummary",
    component: OrderSummary,
    argTypes: {
        type: {
            control: { type: "radio" },
            options: ["variant1", "variant2", "variant3", "variant4"],
        },
        className: { control: "text" },
        listClassName: { control: "text" },
    },
};

const sampleData = {
    paymentFrequency: "Monthly",
    subscriptionTerm: "12 months",
    autoRenewalDate: "2026-10-01",
    services: [
        { name: "Service A", accessPoints: 3, monthlyPrice: "$50.00", icon: "service-icon" },
        { name: "Service B", accessPoints: 1, monthlyPrice: "$30.00", icon: "service-icon" },
    ],
    subscriptionSubtotal: "$80.00",
    bundleDiscount: "$10.00",
    discount: "$5.00",
    totalMonthly: "$65.00",
    CurrentTotalMonthlySubtotal: "$70.00",
    MonthlySubscriptionSubtotal: "$75.00",
    salesTax: "$6.50",
    totalDueToday: "$65.00",
    isPromotionalRate: true,
};

const Template = (args) => <OrderSummary {...args} />;

export const Variant1 = Template.bind({});
Variant1.args = {
    data: sampleData,
    type: "variant1",
};

export const Variant2 = Template.bind({});
Variant2.args = {
    data: sampleData,
    type: "variant2",
};

export const Variant3 = Template.bind({});
Variant3.args = {
    data: sampleData,
    type: "variant3",
};

export const Variant4 = Template.bind({});
Variant4.args = {
    data: sampleData,
    type: "variant4",
};
