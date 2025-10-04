// src/components/molecules/CancelSubscriptionTrigger/CancelSubscriptionTrigger.stories.jsx
import React from "react";
import CancelSubscriptionTrigger from "./index";

export default {
    title: "Molecules/CancelSubscriptionTrigger",
    component: CancelSubscriptionTrigger,
};

const Template = (args) => <CancelSubscriptionTrigger {...args} />;

export const Default = Template.bind({});
Default.args = {};
