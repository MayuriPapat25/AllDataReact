import React from "react";
import UsAuthCheckout from "./index";

export default {
    title: "Pages/UsAuthCheckout",
    component: UsAuthCheckout,
};

// ✅ Default view of the US Authenticated Checkout page
export const Default = () => <UsAuthCheckout />;
Default.storyName = "Default View";
