import React from "react";
import AccountSettings from "./AccountSettings";

export default {
    title: "Organisms/AccountSettings",
    component: AccountSettings,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "The `AccountSettings` component displays and manages a user's shop, billing, and contact information. It includes sections for address management, saved payment methods, contracts, and billing cycles.",
            },
        },
    },
};

const Template = (args) => <AccountSettings {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = "Default View";

export const WithEmptyBillingAndMailing = Template.bind({});
WithEmptyBillingAndMailing.args = {
    // This story can simulate toggled-off addresses in the component
    mockProps: {
        billingAddressSame: false,
        mailingAddressSame: false,
    },
};
WithEmptyBillingAndMailing.storyName = "Billing & Mailing Shown";

export const ReadOnlyMode = Template.bind({});
ReadOnlyMode.args = {};
ReadOnlyMode.parameters = {
    docs: {
        description: {
            story:
                "Displays the account details in fully read-only mode. Useful for admin preview or static display.",
        },
    },
};

export const LongShopNameExample = Template.bind({});
LongShopNameExample.args = {
    mockProps: {
        companyName: "Super Long Enterprise Corporation International Ltd.",
        shopName: "The Ultimate Test Shop for Account Settings UI Validation",
    },
};
LongShopNameExample.storyName = "With Long Shop Name";
