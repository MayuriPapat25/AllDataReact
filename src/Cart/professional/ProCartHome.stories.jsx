import React from "react";
import ProCartHome from "./index";

export default {
    title: "Pages/ProCartHome",
    component: ProCartHome,
};

// ✅ Default view — page with ProHeader and full-page ProCartDropdown
export const Default = () => <ProCartHome />;
Default.storyName = "Default View";
