import React from 'react';

// --- Mocking the InfoText Component for Storybook ---
// In a real project, you would import the actual InfoText component.
// We are mocking it here to make the stories runnable without the full atoms directory.
const MockInfoText = ({ label, value }) => {
    return (
        <div className="flex justify-between text-sm text-gray-700 font-medium">
            <span className="text-gray-500 font-normal">{label}</span>
            <span className="text-gray-900 font-semibold">{value}</span>
        </div>
    );
}

// --- PaymentFrequency Component Definition (Copied from prompt) ---
// We redefine the component here, using the mock InfoText for the story render.
const PaymentFrequency = () => {
    // Note: We are temporarily aliasing the MockInfoText to InfoText 
    // for this isolated story file to resolve the import path.
    const ComponentInfoText = MockInfoText;

    return (
        <div className="mb-6 shadow-xl rounded-lg bg-white overflow-hidden max-w-sm mx-auto">
            <div className="border-b border-gray-100">
                <div className="p-4">
                    <ComponentInfoText label="Payment Frequency" value="Monthly" />
                </div>
            </div>
            <div className="border-b border-gray-100">
                <div className="p-4">
                    <ComponentInfoText label="Subscription Term" value="12 Months" />
                </div>
            </div>
            <div className="border-b-2 border-light-smoky-white">
                <div className="p-4">
                    <ComponentInfoText label="Auto Renewal Date" value="09/10/2026" />
                </div>
            </div>
            {/* Added a subtle footer for better visual context */}
            <div className="p-3 bg-gray-50 text-xs text-center text-gray-500">
                Billing details are fixed for this term.
            </div>
        </div>
    )
}


export default {
    title: 'Billing/PaymentFrequency',
    component: PaymentFrequency,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

/**
 * The default story displays the component with its hardcoded values: Monthly payment, 12-month term, and a specific renewal date.
 * This is the standard view for an active subscription with auto-renewal enabled.
 */
export const DefaultView = {
    args: {},
};

/**
 * This story demonstrates how the component looks when placed in a slightly larger container,
 * showcasing its responsiveness and centered alignment (due to `max-w-sm mx-auto` styling).
 */
export const ContainedView = {
    render: (args) => (
        <div style={{ padding: '20px', backgroundColor: '#f9fafb', width: '100%', maxWidth: '600px', border: '1px dashed #ccc' }}>
            <PaymentFrequency {...args} />
        </div>
    ),
    args: {},
};
