import React from 'react';
import CartItems from './index'; // Adjust the import path as necessary
// Assuming ProductName and the image are accessible

// Mock data for the stories
const baseData = [
    {
        id: 1,
        name: "Premium Device Protection Plan",
        price: 15.00,
        isIncluded: false,
        includedWith: null,
    },
    {
        id: 2,
        name: "Standard Technical Support",
        price: 0.00,
        isIncluded: true,
        includedWith: "Broadband Package",
    },
    {
        id: 3,
        name: "Advanced Cloud Storage (500GB)",
        price: 9.99,
        isIncluded: false,
        includedWith: null,
    },
];

export default {
    title: 'Components/CartItems',
    component: CartItems,
    // Optional: Define arguments for the component props
    argTypes: {
        data: {
            control: 'object',
            description: 'An array of cart item objects.',
        },
    },
};

// ---
// Story 1: Default/Standard View
// ---

const Template = (args) => <CartItems {...args} />;

export const Default = Template.bind({});
Default.args = {
    data: baseData,
};
Default.parameters = {
    docs: {
        description: {
            story: 'The standard view of the CartItems component showing a mix of monthly and included items.',
        },
    },
};

// ---
// Story 2: Empty Cart
// ---

export const EmptyCart = Template.bind({});
EmptyCart.args = {
    data: [],
};
EmptyCart.parameters = {
    docs: {
        description: {
            story: 'What the component looks like when the `data` array is empty. This mostly renders an empty container.',
        },
    },
};

// ---
// Story 3: Only Included Items (Zero Price)
// ---

export const OnlyIncludedItems = Template.bind({});
OnlyIncludedItems.args = {
    data: [
        {
            id: 10,
            name: "Basic Router Rental",
            price: 0.00,
            isIncluded: true,
            includedWith: "Fiber 500 Plan",
        },
        {
            id: 11,
            name: "Installation Service",
            price: 0.00,
            isIncluded: true,
            includedWith: "New Activation",
        },
    ],
};
OnlyIncludedItems.parameters = {
    docs: {
        description: {
            story: 'Showcase when all items are included and have a price of $0.00.',
        },
    },
};

// ---
// Story 4: Only Monthly Items (Standard Pricing)
// ---

export const OnlyMonthlyItems = Template.bind({});
OnlyMonthlyItems.args = {
    data: [
        {
            id: 20,
            name: "Extended Warranty for TV",
            price: 25.99,
            isIncluded: false,
            includedWith: null,
        },
        {
            id: 21,
            name: "Sports Channel Package",
            price: 19.99,
            isIncluded: false,
            includedWith: null,
        },
    ],
};
OnlyMonthlyItems.parameters = {
    docs: {
        description: {
            story: 'Showcase when all items are monthly charges.',
        },
    },
};