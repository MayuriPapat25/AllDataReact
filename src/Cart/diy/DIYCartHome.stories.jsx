import React from "react";
import DIYCartHome from "./index";

export default {
    title: "Pages/DIYCartHome",
    component: DIYCartHome,
};

// ✅ Default view — page with HeaderWithCart
export const Default = () => <DIYCartHome />;
Default.storyName = "Default View";
