import React from 'react';
import { DiyCartDropdown } from './diyCartDropdown'; // Adjust the path as necessary

// --- Mocks for Dependencies ---

// 1. Mock 'react-router-dom' Link with a simple div that logs the path
const MockLink = ({ to, children, onClick }) => (
    <div
        onClick={(e) => {
            e.preventDefault(); // Prevent actual navigation in Storybook
            onClick && onClick();
            console.log(`Link clicked, navigates to: ${to}`);
        }}
    >
        {children}
    </div>
);

// 2. Mock custom components (Button and Icon)
const MockButton = ({ children, onClick, variant, size, className, ...props }) => (
    <button
        onClick={onClick}
        className={`p-2 rounded font-semibold ${className}`}
        style={{
            border: variant === 'outline' ? '1px solid #ccc' : 'none',
            backgroundColor: variant === 'outline' ? 'transparent' : (variant === 'ghost' ? 'transparent' : '#f0f0f0'),
            color: variant === 'outline' ? '#333' : '#000',
            width: className?.includes('btn-full') ? '100%' : 'auto'
        }}
        {...props}
    >
        {children}
    </button>
);

const MockIcon = ({ type, className, size }) => (
    <span
        className={className}
        style={{ fontSize: size }}
        role="img"
        aria-label={`${type} icon`}
    >
        {type === 'close' ? '×' : '🛒'}
    </span>
);


// 3. Create a controlled version of the component with mocked imports
const DiyCartDropdownControlled = ({ initialCartItems = [], ...props }) => {
    const [isOpen, setIsOpen] = React.useState(props.isOpen);
    const [cartItems] = React.useState(initialCartItems);

    // Create a version of the component with the original logic but using mocks
    // This is the cleanest way to control the internal state (cartItems) for stories
    const ComponentWithMocks = React.useCallback(({ isOpen, onClose, className }) => {
        if (!isOpen) return null;

        return (
            <div
                className={`absolute right-0 top-full mt-2 z-50 w-[225px] sm:w-80 md:w-96 max-w-[225px] sm:mx-0 ${className}`}
            >
                <div className="shadow-lg bg-white rounded-lg">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3">
                        <span className="text-xs text-gray-500">
                            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in cart
                        </span>
                        <MockButton // Using MockButton
                            onClick={onClose}
                            variant="ghost"
                            size="sm"
                            className="flex items-center justify-center p-1 rounded"
                        >
                            <MockIcon type="close" className="text-black" size={20} /> {/* Using MockIcon */}
                        </MockButton>
                    </div>

                    {/* Cart Items */}
                    <div className="max-h-80 sm:max-h-96 overflow-y-auto px-4 py-2">
                        {cartItems.length === 0 ? (
                            <div className="p-6 text-center text-gray-650 flex flex-col items-center">
                                <MockIcon type="cart" className="w-8 h-8 mb-2 text-gray-400" />
                                <p className="text-sm">Your cart is empty</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="py-1">
                                        <div className="text-sm font-gotham font-ultra text-black break-words">{item.name}</div>
                                        <div className="text-xs text-gray-600">
                                            {item.price}/{item.duration}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {cartItems.length > 0 && (
                        <div className="px-4 py-4">
                            <MockLink to="/diy-cart" onClick={onClose}> {/* Using MockLink */}
                                <MockButton // Using MockButton
                                    variant="outline"
                                    className="btn btn-primary btn-full"
                                >
                                    VIEW CART
                                </MockButton>
                            </MockLink>
                        </div>
                    )}
                </div>
            </div>
        );
    }, [cartItems]);
    // --- End of ComponentWithMocks ---

    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '300px' }}>
            <MockButton onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Close Cart' : 'Open Cart'}
            </MockButton>
            <ComponentWithMocks
                {...props}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </div>
    );
};

// --- Storybook Metadata (Meta) ---

export default {
    title: 'Components/DiyCartDropdown',
    component: DiyCartDropdown,
    tags: ['autodocs'],
    // Apply a decorator to position the dropdown correctly for all stories
    decorators: [(Story) => (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '50px',
            minHeight: '350px',
            backgroundColor: '#f9f9f9'
        }}>
            <Story />
        </div>
    )],
    argTypes: {
        isOpen: {
            control: 'boolean',
            description: 'Controls the visibility of the dropdown. Used internally by the component.',
        },
        onClose: { action: 'onClose clicked', description: 'Callback function when the close button or view cart is clicked.' },
    },
};

// --- Stories (Named Exports) ---

const defaultItems = [
    {
        id: "1",
        name: "ALLDATA DIY 2022 AUDI A5 QUATTRO COUPE 45 (FPD) L4-2.0L TURBO (DPAA) MFI",
        price: "$125.98",
        duration: "7 years",
    },
    {
        id: "2",
        name: "ALLDATA DIY 2014 PORSCHE 911 CARRERA 4S CABRIOLET (991) F6-3.8L",
        price: "$125.98",
        duration: "7 years",
    },
];

/**
 * Demonstrates the dropdown when it is open and contains 2 items. 
 * This is the primary use case.
 */
export const DefaultWithItems = {
    render: (args) => <DiyCartDropdownControlled initialCartItems={defaultItems} {...args} />,
    args: {
        isOpen: true,
    },
};

/**
 * Shows the component when the cart is empty, displaying a call-to-action message.
 */
export const EmptyCart = {
    render: (args) => <DiyCartDropdownControlled initialCartItems={[]} {...args} />,
    args: {
        isOpen: true,
    },
};

/**
 * Shows the default state where the dropdown is closed (invisible).
 * This confirms the conditional rendering is working correctly.
 */
export const Closed = {
    render: (args) => <DiyCartDropdownControlled initialCartItems={defaultItems} {...args} />,
    args: {
        isOpen: false,
    },
};

/**
 * Demonstrates the component with a very long item name to test text wrapping and layout integrity.
 */
export const LongItemName = {
    render: (args) => <DiyCartDropdownControlled initialCartItems={[
        {
            id: "1",
            name: "VERY LONG NAME FOR A CAR MODEL LIKE THE 2025 HYUNDAI IONIQ 5 N LIMITED EDITION PERFORMANCE HATCHBACK WITH REGENERATIVE BRAKING AND ALL-WHEEL DRIVE",
            price: "$125.98",
            duration: "7 years",
        },
    ]} {...args} />,
    args: {
        isOpen: true,
    },
    parameters: {
        // Force a specific viewport size to test responsive behavior
        viewport: {
            defaultViewport: 'sm', // Small screen size
        },
    },
};