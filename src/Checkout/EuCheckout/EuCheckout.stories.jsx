import React from "react";
import EuCheckout from "./index";

export default {
    title: "Pages/EuCheckout",
    component: EuCheckout,
};

// ✅ Default EU Checkout page
export const Default = () => <EuCheckout />;
Default.storyName = "Default View";
