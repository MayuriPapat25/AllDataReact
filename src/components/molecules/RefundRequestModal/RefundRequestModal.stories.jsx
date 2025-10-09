import React from 'react';
// import { useState } from "react"; // Original import
// import { X } from "lucide-react"; // Original import
// import { Button } from '../../atoms/Buttons/Button'; // Original import

// --- Mocks for external dependencies ---
// Mocking the Lucide X icon with a simple SVG
const MockX = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
);

// Mocking the Button component (simplified version)
const MockButton = ({ children, onClick, className, variant }) => (
    <button
        onClick={onClick}
        // Applying tailwind classes to approximate the final button look
        className={`rounded-lg transition-all duration-200 ${className}`}
    >
        {children}
    </button>
);


// --- RefundRequestModal Component Definition (Adapted for Storybook) ---
const X = MockX;
const Button = MockButton;

const RefundRequestModal = ({ isOpen, onClose, vehicleInfo, onComplete, initialReason = "", initialShowSuccess = false }) => {
    const [reason, setReason] = React.useState(initialReason);
    const [showSuccess, setShowSuccess] = React.useState(initialShowSuccess);
    const [showError, setShowError] = React.useState(false); // Added for visual error feedback

    React.useEffect(() => {
        // Reset states when modal closes/opens
        if (!isOpen) {
            setReason("");
            setShowSuccess(false);
            setShowError(false);
        }
        // Allow prop overrides for storybook state testing
        setShowSuccess(initialShowSuccess);
        setReason(initialReason);
    }, [isOpen, initialShowSuccess, initialReason]);


    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!reason) {
            // Replaced alert() with visual error feedback
            setShowError(true);
            return;
        }
        setShowError(false);
        setShowSuccess(true);
        // Simulate API call delay
        setTimeout(() => {
            onComplete();
            setShowSuccess(false);
            setReason("");
            onClose(); // Close the modal after success flow
        }, 3000);
    };

    const handleCancel = () => {
        setReason("");
        setShowError(false);
        onClose();
    };

    // --- Success View ---
    if (showSuccess) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8 relative">
                    <button
                        onClick={handleCancel} // Using handleCancel to reset state and close
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <h2 className="text-2xl font-bold mb-6 text-center text-green-600">REFUND REQUEST SUBMITTED</h2>

                    <div className="text-center text-gray-600 mb-6">
                        <p className="mb-4 text-lg font-medium">Your refund request has been submitted successfully.</p>
                        <p className="text-sm">
                            Refund requests that meet the{" "}
                            <a href="#" className="text-blue-600 hover:underline font-medium transition-colors">
                                Subscription Rules
                            </a>{" "}
                            will be processed automatically. You will receive an email confirmation once your refund has been
                            processed. Please allow 7-10 days for your financial institution to add these funds to your account.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Button
                            onClick={handleCancel}
                            className="px-8 py-2 border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 font-semibold shadow-md"
                        >
                            CLOSE
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // --- Form View ---
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8 relative">
                <button
                    onClick={handleCancel}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close"
                >
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">NEED A REFUND?</h2>

                <div className="mb-6 border-b border-gray-200 pb-4">
                    <p className="text-sm text-gray-600 mb-2">
                        Sorry to hear you're not happy with the ALLDATA DIY subscription.
                    </p>
                    <p className="text-sm text-gray-700 font-medium mb-1">
                        L4-2.0L Turbo for your{" "}
                        <span className="font-semibold text-gray-900">{vehicleInfo || "2022 Audi A3 Quattro Coupe 4S (F8P)"}</span>
                    </p>
                    <p className="text-xs text-red-500 text-right font-medium">*Fields are required</p>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Reason for Refund</label>
                    <select
                        value={reason}
                        onChange={(e) => {
                            setReason(e.target.value);
                            setShowError(false); // Clear error on change
                        }}
                        className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 ${showError ? 'border-red-500 ring-red-100' : 'border-gray-300 focus:ring-blue-500'
                            }`}
                    >
                        <option value="">-Select-</option>
                        <option value="missing-info">Missing Vehicle Information</option>
                        <option value="incorrect-product">Purchased Incorrect Product</option>
                        <option value="poor-value">Poor Value for money</option>
                        <option value="difficult">Difficult to use</option>
                        <option value="no-longer-needed">No longer needed</option>
                        <option value="other">Other</option>
                    </select>
                    {showError && (
                        <p className="text-xs text-red-500 mt-1 font-medium">Please select a reason for refund.</p>
                    )}
                </div>

                <div className="mb-6">
                    <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-md border border-gray-200">
                        Refund requests that meet the{" "}
                        <a href="#" className="text-blue-600 hover:underline font-medium transition-colors">
                            Subscription Rules
                        </a>{" "}
                        will be processed automatically. You will receive an email confirmation once your refund has been processed.
                        Please allow 7-10 days for your financial institution to add these funds to your account.
                    </p>
                </div>

                <div className="flex gap-4 justify-center">
                    <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="px-8 py-2 border-2 border-gray-400 text-gray-600 bg-white hover:bg-gray-100 font-semibold shadow-md"
                    >
                        CANCEL
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="px-8 py-2 bg-orange-500 border-2 border-orange-500 text-white hover:bg-orange-600 font-semibold shadow-md"
                    >
                        SUBMIT
                    </Button>
                </div>
            </div>
        </div>
    );
};


// --- Storybook Setup ---

export default {
    title: 'Modals/RefundRequestModal',
    component: RefundRequestModal,
    parameters: {
        layout: 'fullscreen', // Use fullscreen to clearly show the backdrop
    },
    tags: ['autodocs'],
    argTypes: {
        isOpen: { control: 'boolean', description: 'Controls the visibility of the modal.' },
        onClose: { action: 'closed', description: 'Callback when modal is dismissed.' },
        onComplete: { action: 'completed', description: 'Callback when form submission is successful.' },
        vehicleInfo: { control: 'text', description: 'The vehicle description shown in the header.' },
    },
};

// Component wrapper to handle state for interactive story preview
const StoryContainer = (props) => {
    const [isOpen, setIsOpen] = React.useState(props.initialOpen);

    React.useEffect(() => {
        setIsOpen(props.initialOpen);
    }, [props.initialOpen]);

    const handleClose = () => {
        props.onClose();
        setIsOpen(false);
    };

    const handleComplete = () => {
        props.onComplete();
        // Modal will handle its own closing after success timeout
    };

    return (
        <div className="p-10" style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <h1 className="text-lg font-semibold mb-4">Content Behind Modal</h1>
            <p className="text-gray-600">Click the button below to open the Refund Request Modal.</p>

            <button
                onClick={() => setIsOpen(true)}
                className="mt-6 p-3 border border-gray-300 rounded-lg bg-white text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors"
            >
                {isOpen ? 'Modal Open' : 'Open Refund Request Modal'}
            </button>

            <RefundRequestModal
                {...props}
                isOpen={isOpen}
                onClose={handleClose}
                onComplete={handleComplete}
            />
        </div>
    );
};


/**
 * The default view of the refund request form, allowing the user to select a reason.
 * The internal state (reason, success message) is active for interactive testing.
 */
export const DefaultForm = {
    render: StoryContainer,
    args: {
        initialOpen: true,
        vehicleInfo: "2022 Audi A3 Quattro Coupe 4S (F8P)",
    },
};

/**
 * A story demonstrating how the modal looks for a different vehicle, showing prop injection.
 */
export const CustomVehicle = {
    render: StoryContainer,
    args: {
        initialOpen: true,
        vehicleInfo: "1967 Ford Mustang GT 390 Fastback",
    },
};

/**
 * This story demonstrates the success message state, which normally appears after submission.
 * This is useful for testing the success UI independently.
 */
export const SubmissionSuccess = {
    render: (args) => (
        <RefundRequestModal
            {...args}
            isOpen={true}
            initialShowSuccess={true} // Directly show the success state
            onClose={args.onClose}
            onComplete={args.onComplete}
        />
    ),
    args: {
        initialOpen: true,
        vehicleInfo: "2022 Audi A3 Quattro Coupe 4S (F8P)",
    },
};
