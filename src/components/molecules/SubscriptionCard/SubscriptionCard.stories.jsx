// SubscriptionCard.stories.jsx
import React from "react";
import { SubscriptionCard } from "./index";

export default {
    title: "Molecules/SubscriptionCard",
    component: SubscriptionCard,
    argTypes: {
        title: { control: "text" },
        description: { control: "text" },
        accessDuration: { control: "text" },
        price: { control: "text" },
        priceNote: { control: "text" },
        className: { control: "text" },
    },
};

const Template = (args) => <SubscriptionCard {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    title: "ALLDATA REPAIR",
    description: "Comprehensive repair solution for your vehicle",
    accessDuration: "12 Months Access",
    price: "$209.00",
};

export const Promotional = Template.bind({});
Promotional.args = {
    title: "ALLDATA MOBILE",
    description: "Mobile diagnostic tools for technicians",
    accessDuration: "6 Months Access",
    price: "$99.00",
    priceNote: "promotional rate",
    className: "border-2 border-blue-500",
};

export const LongDescription = Template.bind({});
LongDescription.args = {
    title: "ALLDATA COMMUNITY PLUS",
    description:
        "Access the full community portal with extra diagnostic support and exclusive updates for advanced vehicle repairs",
    accessDuration: "12 Months Access",
    price: "$129.00",
    priceNote: "annual subscription",
};
