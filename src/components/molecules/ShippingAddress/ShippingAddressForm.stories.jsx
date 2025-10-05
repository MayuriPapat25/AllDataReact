// ShippingAddressForm.stories.jsx
import React, { useState } from "react";
import ShippingAddressForm from "./index";

export default {
    title: "Organisms/ShippingAddressForm",
    component: ShippingAddressForm,
    argTypes: {
        fromReview: { control: "boolean" },
        onEdit: { action: "editClicked" },
    },
};

const Template = (args) => {
    const [fromReview, setFromReview] = useState(args.fromReview || false);

    const handleEdit = () => {
        setFromReview(false);
        args.onEdit();
    };

    return <ShippingAddressForm {...args} fromReview={fromReview} onEdit={handleEdit} />;
};

export const Default = Template.bind({});
Default.args = {
    fromReview: false,
};

export const FromReview = Template.bind({});
FromReview.args = {
    fromReview: true,
};
