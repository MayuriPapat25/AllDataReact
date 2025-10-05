// Tabs.stories.jsx
import React, { useState } from "react";
import { Tabs } from "./index";

export default {
    title: "Organisms/Tabs",
    component: Tabs,
    parameters: {
        layout: "fullscreen",
    },
};

const sampleTabs = [
    {
        id: "billing",
        label: "Billing",
        content: <div>Billing Content Goes Here</div>,
    },
    {
        id: "products",
        label: "Products",
        content: <div>Products Content Goes Here</div>,
    },
    {
        id: "account-settings",
        label: "Account Settings",
        content: <div>Account Settings Content Goes Here</div>,
    },
];

const Template = (args) => {
    const [activeTab, setActiveTab] = useState(args.defaultActiveTab || sampleTabs[0].id);

    return (
        <Tabs
            {...args}
            tabs={sampleTabs}
            defaultActiveTab={activeTab}
            onTabChange={(tabId) => {
                setActiveTab(tabId);
                console.log("Tab changed to:", tabId);
            }}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    defaultActiveTab: "billing",
};

export const ProductsTabActive = Template.bind({});
ProductsTabActive.args = {
    defaultActiveTab: "products",
};

export const AccountSettingsTabActive = Template.bind({});
AccountSettingsTabActive.args = {
    defaultActiveTab: "account-settings",
};
