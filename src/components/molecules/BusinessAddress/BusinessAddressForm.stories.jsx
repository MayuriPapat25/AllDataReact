// BusinessAddressForm.stories.jsx
import BusinessAddressForm from "./index";
import { action } from "storybook/actions";

export default {
    title: "Forms/BusinessAddressForm", // ✅ Appears in sidebar
    component: BusinessAddressForm,      // ✅ Needed for Docs tab
    parameters: {
        docs: {
            description: {
                component: "Form component to capture US or International business addresses.",
            },
        },
    },
};

// US Address variant
export const USAddress = {
    args: {
        variant: "us",
        onDataChange: action("US address updated"),
    },
};

// International Address variant
export const InternationalAddress = {
    args: {
        variant: "international",
        onDataChange: action("International address updated"),
    },
};
