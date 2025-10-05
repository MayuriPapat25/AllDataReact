import React from "react";
import CartModal from "./index";

export default {
    title: "Modals/CartModal",
    component: CartModal,
};

// ✅ Default cart modal open
export const Default = () => <CartModal onClose={() => console.log("Cart closed")} />;
Default.storyName = "Default Open";

// ✅ Simulate cart modal closed (if your component supported it)
export const Closed = () => {
    // CartModal doesn't internally manage "open", so we just render it as usual
    return <CartModal onClose={() => console.log("Cart closed")} />;
};
Closed.storyName = "Closed State (Manual Control)";
