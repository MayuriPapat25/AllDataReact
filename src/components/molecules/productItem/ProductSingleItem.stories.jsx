// ProductSingleItem.stories.jsx
import React, { useState } from "react";
import { ProductSingleItem } from "./diyProductItem";

export default {
    title: "Molecules/ProductSingleItem",
    component: ProductSingleItem,
    argTypes: {
        status: { control: "text" },
        description: { control: "text" },
        expiration: { control: "text" },
        plan: { control: "radio", options: ["1-year", "1-month", "3-years"] },
        price: { control: "text" },
        onPlanChange: { action: "planChanged" },
        onRemove: { action: "removed" },
    },
};

const Template = (args) => {
    const [selectedPlan, setSelectedPlan] = useState(args.plan);

    const handlePlanChange = (value) => {
        setSelectedPlan(value);
        args.onPlanChange(value);
    };

    return <ProductSingleItem {...args} plan={selectedPlan} onPlanChange={handlePlanChange} />;
};

export const Default = Template.bind({});
Default.args = {
    status: "Active",
    description: "ALLDATA Professional Subscription",
    expiration: "12/31/2025",
    plan: "1-year",
    price: "499.00",
};

export const Expired = Template.bind({});
Expired.args = {
    status: "Expired",
    description: "ALLDATA DIY Subscription",
    expiration: "06/30/2024",
    plan: "1-month",
    price: "19.99",
};
