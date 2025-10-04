// OrderSummaryDIY.stories.jsx
import React from "react";
import OrderSummaryDIY from "./index";

export default {
    title: "Organisms/OrderSummaryDIY",
    component: OrderSummaryDIY,
};

const Template = (args) => <OrderSummaryDIY {...args} />;

export const Default = Template.bind({});
Default.args = {};
