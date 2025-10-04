// BusinessInformationForm.stories.jsx
import BusinessInformationForm from "./index";
import { action } from "storybook/actions";

export default {
    title: "Forms/BusinessInformationForm",
    component: BusinessInformationForm,
};

// Standard variant
export const Standard = {
    args: {
        variant: "standard",
        onSubmit: action("Standard form submitted"),
    },
};

// Authorized variant
export const Authorized = {
    args: {
        variant: "authorized",
        onSubmit: action("Authorized form submitted"),
    },
};
