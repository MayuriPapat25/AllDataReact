import React from "react";
import BillSummary from "./billSummary";

export default {
    title: "Organisms/BillSummary",
    component: BillSummary,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "The `BillSummary` component provides an overview of the user's billing details, including current balance, payments, invoice history, and payment methods.",
            },
        },
    },
};

const Template = (args) => <BillSummary {...args} />;

/** Default story showing the complete bill summary layout */
export const Default = Template.bind({});
Default.args = {};
Default.storyName = "Default View";

/** Variant for when no balance or invoices are available */
export const EmptyState = Template.bind({});
EmptyState.args = {};
EmptyState.parameters = {
    docs: {
        description: {
            story:
                "Use this story to simulate a scenario where there is no outstanding balance or invoice history.",
        },
    },
};

/** Variant to visualize recent payments and active auto-pay status */
export const WithRecentPayments = Template.bind({});
WithRecentPayments.args = {};
WithRecentPayments.storyName = "With Recent Payments";

/** Story for previewing visual consistency and typography */
export const UIReview = Template.bind({});
UIReview.args = {};
UIReview.parameters = {
    docs: {
        description: {
            story:
                "UI-focused story to verify typography, spacing, and layout consistency across all sections of the Bill Summary component.",
        },
    },
};
