// OrderConfirmation.stories.jsx
import React from "react";
import OrderConfirmation from "./index";

export default {
    title: "Organisms/OrderConfirmation",
    component: OrderConfirmation,
    argTypes: {
        orderNumber: { control: "text" },
        loginUrl: { control: "text" },
    },
};

const Template = (args) => <OrderConfirmation {...args} />;

export const Default = Template.bind({});
Default.args = {
    orderNumber: "123456",
    loginUrl: "myalldata.com",
};

export const CustomLoginUrl = Template.bind({});
CustomLoginUrl.args = {
    orderNumber: "987654",
    loginUrl: "customlogin.com",
};
