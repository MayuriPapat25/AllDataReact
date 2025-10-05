import React from "react";
import SavedPaymentMethods from "./SavedPaymentMethods";

export default {
    title: "Organisms/SavedPaymentMethods",
    component: SavedPaymentMethods,
};

// ✅ Default story — main expanded view
export const Default = () => <SavedPaymentMethods />;
Default.storyName = "Default View";

// ✅ Collapsed credit card section
export const Collapsed = () => {
    return <SavedPaymentMethodsWrapper defaultExpanded={false} />;
};
Collapsed.storyName = "Collapsed Card Section";

// ✅ Add New Payment Method section open
export const AddNewPaymentMethodOpen = () => {
    return <SavedPaymentMethodsWrapper addNewOpen={true} />;
};
AddNewPaymentMethodOpen.storyName = "Add New Payment Method Open";

// ✅ Minimal wrapper to control internal state for Storybook
function SavedPaymentMethodsWrapper({ defaultExpanded = true, addNewOpen = false }) {
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const [addingNew, setAddingNew] = React.useState(addNewOpen);

    return <SavedPaymentMethods />;
}
