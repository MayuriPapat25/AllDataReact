// BillingInformationEdit.stories.jsx
import React from "react";
import BillingInformationEdit from "./index"
import { action } from "storybook/actions"

export default {
    title: "Forms/BillingInformationEdit",
    component: BillingInformationEdit,
};

export const Default = {
    args: {
        paymentType: "Credit Card",
        name: "Libena Mathew",
        address: {
            street: "Block C-25",
            city: "Ontario",
            postalCode: "NU 1234",
            country: "Canada",
        },
        onEdit: action("edit-clicked"),
    },
}

export const CustomValues = {
    args: {
        paymentType: "PayPal",
        name: "Arjun Sharma",
        address: {
            street: "221B Baker Street",
            city: "London",
            postalCode: "NW1 6XE",
            country: "UK",
        },
        onEdit: action("edit-clicked"),
    },
}

export const LongAddress = {
    args: {
        paymentType: "Wire Transfer",
        name: "Isabella Hernandez",
        address: {
            street: "12345 Long Street Name That Might Wrap Across Multiple Lines Apt. 6789",
            city: "San Francisco",
            postalCode: "CA 94105",
            country: "USA",
        },
        onEdit: action("edit-clicked"),
    },
}

export const WithoutEdit = {
    args: {
        paymentType: "UPI",
        name: "Ravi Kumar",
        address: {
            street: "Flat 404, Palm Residency",
            city: "Bangalore",
            postalCode: "560034",
            country: "India",
        },
        onEdit: undefined, // disables edit button action
    },
}
