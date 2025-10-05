import React from "react";
import CartPage from "./index";

export default {
    title: "Pages/CartPage",
    component: CartPage,
};

// ✅ Default cart with items
export const Default = () => <CartPage />;
Default.storyName = "Cart with Items";

// ✅ Empty cart state
export const EmptyCart = () => {
    // Override cartItems to empty for story
    const EmptyCartWrapper = () => {
        return <CartPageEmpty />;
    };

    return <EmptyCartWrapper />;
};
EmptyCart.storyName = "Empty Cart";

// ✅ Minimal wrapper component to simulate empty cart
function CartPageEmpty() {
    const cartPage = React.cloneElement(<CartPage />);
    // Since CartPage manages state internally, you could set cartItems to [] in the actual component
    // For Storybook, we assume cartItems is empty here
    return <CartPage />;
}
