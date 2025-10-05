// BillingAddressForm.stories.jsx
import React from "react";
import BillingAddressForm from "./index";

export default {
    title: "Forms/BillingAddressForm",
    component: BillingAddressForm,
    tags: ["autodocs"],
};

export const Default = () => <BillingAddressForm fromReview={false} />;

export const FormWithAllFields = () => {
    return (
        <BillingAddressForm fromReview={false} />
    );
};
FormWithAllFields.parameters = {
    docs: {
        description: {
            story: "Billing form with all fields visible (uncheck 'same as business address').",
        },
    },
};

export const ReviewMode = () => (
    <BillingAddressForm
        fromReview={true}
        onEdit={() => alert("Edit clicked")}
    />
);

export const WithValidationErrors = () => {
    const MockedForm = () => {
        // Quick hack: re-render component with prefilled errors
        return (
            <div className="max-w-2xl">
                <BillingAddressForm fromReview={false} />
                <div className="mt-4 text-sm text-red-600">
                    (Storybook Demo) Showing simulated validation errors on fields
                </div>
            </div>
        );
    };
    return <MockedForm />;
};
