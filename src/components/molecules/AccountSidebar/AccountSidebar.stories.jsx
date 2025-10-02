// AccountSidebar.stories.jsx

import React from "react";
import AccountSidebar from "./index";

export default {
    title: "Organisms/AccountSidebar",
    component: AccountSidebar,
    argTypes: {
        onItemClick: { action: "item clicked" },
        onSectionClick: { action: "section clicked" },
    },
};

const Template = (args) => <AccountSidebar {...args} />;

// Mock data
const sectionsData = [
    {
        id: "orders",
        title: "My Orders",
        items: [
            { id: "all", label: "All Orders" },
            { id: "pending", label: "Pending Orders" },
            { id: "completed", label: "Completed Orders" },
        ],
    },
    {
        id: "profile",
        title: "Profile",
        items: [
            { id: "personal", label: "Personal Info" },
            { id: "security", label: "Security Settings" },
        ],
    },
    {
        id: "billing",
        title: "Billing",
        items: [
            { id: "payment", label: "Payment Methods" },
            { id: "history", label: "Billing History" },
        ],
    },
];

// ✅ Story 1 - Default Empty Sidebar
export const Default = Template.bind({});
Default.args = {
    sections: [],
};

// ✅ Story 2 - With Sections + Items
export const WithSections = Template.bind({});
WithSections.args = {
    sections: sectionsData,
};

// ✅ Story 3 - First Section Active by default
export const FirstSectionActive = Template.bind({});
FirstSectionActive.args = {
    sections: sectionsData,
};
FirstSectionActive.play = async ({ canvasElement }) => {
    const firstSectionBtn = canvasElement.querySelector("button");
    if (firstSectionBtn) firstSectionBtn.click();
};

// ✅ Story 4 - Item Selection
export const WithItemSelection = Template.bind({});
WithItemSelection.args = {
    sections: sectionsData.map((sec, secIdx) => ({
        ...sec,
        items: sec.items.map((item, itemIdx) => ({
            ...item,
            isActive: secIdx === 0 && itemIdx === 1, // mark 1st section's 2nd item active
        })),
    })),
};

// ✅ Story 5 - Custom Styling
export const CustomStyling = Template.bind({});
CustomStyling.args = {
    sections: sectionsData,
    className: "border-4 border-indigo-500 rounded-lg",
};
