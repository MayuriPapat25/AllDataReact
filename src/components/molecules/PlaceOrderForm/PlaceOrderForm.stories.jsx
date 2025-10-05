// PlaceOrderForm.stories.jsx
import React from "react";
import PlaceOrderForm from "./index";

export default {
    title: "Organisms/PlaceOrderForm",
    component: PlaceOrderForm,
};

const Template = (args) => <PlaceOrderForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
