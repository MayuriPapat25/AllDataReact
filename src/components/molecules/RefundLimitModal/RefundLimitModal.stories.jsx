import React from 'react';
// import { X } from "lucide-react"; // Original import
// import { Button } from "../../atoms/Buttons/Button"; // Original import

// --- Mocks for external dependencies ---
// Mocking the Lucide X icon with a simple SVG
const MockX = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

// Mocking the Button component (simplified version)
const MockButton = ({ children, onClick, className }) => (
    <button
        onClick={onClick}
        // Applying tailwind classes to approximate the final button look
        className={`rounded-lg transition-all duration-200 ${className}`}
    >
        {children}
    </button>
);


// --- RefundLimitModal Component Definition (Adapted for Storybook) ---
// Using the Mocked dependencies
const X = MockX;
const Button = MockButton;

const RefundLimitModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        // The fixed inset-0 is crucial for modal display
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-xl w-full p-8 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close modal"
                >
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">REFUND LIMIT REACHED</h2>

                <p className="text-center text-gray-600 mb-8">
                    You have reached the maximum limit for vehicle changes or refunds. For further assistance. Please{" "}
                    <a href="#" className="test-primary hover:text-blue-700 hover:underline font-medium transition-colors">
                        contact support.
                    </a>
                </p>

                <div className="flex justify-center">
                    <Button
                        onClick={onClose}
                        className="px-12 py-2 border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 font-semibold shadow-md hover:shadow-lg"
                    >
                        OK
                    </Button>
                </div>
            </div>
        </div>
    );
};


// --- Storybook Setup ---

export default {
    title: 'Modals/RefundLimitModal',
    component: RefundLimitModal,
    parameters: {
        layout: 'fullscreen', // Use fullscreen to clearly show the backdrop
    },
    tags: ['autodocs'],
    argTypes: {
        isOpen: {
            control: 'boolean',
            description: 'Controls the visibility of the modal.'
        },
        onClose: {
            action: 'closed',
            description: 'Callback function when the modal is closed.'
        },
    },
};

// Component wrapper to handle state for interactive story preview
const StoryContainer = (props) => {
    const [isOpen, setIsOpen] = React.useState(props.initialOpen);

    // Synchronize prop change from controls with internal state
    React.useEffect(() => {
        setIsOpen(props.initialOpen);
    }, [props.initialOpen]);

    return (
        <div className="p-10" style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <h1 className="text-lg font-semibold mb-4">Content Behind Modal</h1>
            <p className="text-gray-600">This simulates the content of the page that would be blurred by the modal backdrop.</p>

            <button
                onClick={() => setIsOpen(true)}
                className="mt-6 p-3 border border-gray-300 rounded-lg bg-white text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors"
            >
                {isOpen ? 'Modal Open (Click Backdrop or OK to Close)' : 'Click to Open Modal'}
            </button>

            <RefundLimitModal
                {...props}
                isOpen={isOpen}
                onClose={() => {
                    props.onClose(); // Log action
                    setIsOpen(false);
                }}
            />
        </div>
    );
};


/**
 * The modal is initially open, demonstrating its appearance, backdrop, and center alignment.
 */
export const Opened = {
    render: StoryContainer,
    args: {
        initialOpen: true,
    },
};

/**
 * The modal is initially closed, demonstrating that it renders null when `isOpen` is false. 
 * A button is provided in the canvas to manually open it.
 */
export const Closed = {
    render: StoryContainer,
    args: {
        initialOpen: false,
    },
};
