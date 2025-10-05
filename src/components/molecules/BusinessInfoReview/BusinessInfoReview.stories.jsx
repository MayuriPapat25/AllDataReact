// src/components/molecules/BusinessInfoReview/BusinessInfoReview.stories.jsx
import React from "react";
import BusinessInfoReview from "./index";
import { action } from "storybook/actions";

export default {
    title: "Molecules/BusinessInfoReview",
    component: BusinessInfoReview,
    argTypes: {
        onEdit: { action: "edit clicked" },
    },
};

const Template = (args) => <BusinessInfoReview {...args} />;

export const Default = Template.bind({});
Default.args = {
    businessData: {
        businessName: "Test Business",
        phoneNumber: "7016176368",
        signerFirstName: "Hinal",
        signerLastName: "Modo",
        signerTitle: "Manager",
        signerEmail: "hinal.parikh@qed42.com",
        businessType: "Education",
        ownershipType: "Corporation",
        taxExemptStatus: "My business is not tax exempt",
    },
    onEdit: action("Edit button clicked"),
};

export const EmptyData = Template.bind({});
EmptyData.args = {
    businessData: {},
    onEdit: action("Edit button clicked"),
};
