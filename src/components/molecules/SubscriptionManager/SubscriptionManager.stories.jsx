// SubscriptionManager.stories.jsx
import React, { useState } from "react";
import SubscriptionManager from "./index";

export default {
    title: "Organisms/SubscriptionManager",
    component: SubscriptionManager,
    parameters: {
        layout: "fullscreen",
    },
};

const Template = (args) => <SubscriptionManager {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithRemovalModalOpen = () => {
    // Using a wrapper component to open modal on load
    const Wrapper = () => {
        const [open, setOpen] = useState(true);
        return <SubscriptionManager initialModalOpen={open} />;
    };
    return <Wrapper />;
};
