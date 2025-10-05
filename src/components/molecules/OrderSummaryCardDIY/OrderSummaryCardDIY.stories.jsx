// OrderSummaryCardDIY.stories.jsx
import React from "react";
import OrderSummaryCardDIY from "./index";

export default {
    title: "Molecules/OrderSummaryCardDIY",
    component: OrderSummaryCardDIY,
};

const Template = (args) => <OrderSummaryCardDIY {...args} />;

export const Default = Template.bind({});
Default.args = {};
