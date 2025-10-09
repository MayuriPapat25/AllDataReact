import React from 'react';
// We use a functional mock component to substitute the original for clarity and dependency isolation
import { ProCartDropdown } from './ProCartDropdown';

// --- Mocking Dependencies ---

const MockButton = ({ children, onClick, variant, className, 'aria-label': ariaLabel }) => (
    <button
        onClick={onClick}
        className={`p-2 rounded ${className} font-semibold`}
        style={{ border: variant === 'outline' ? '1px solid #ccc' : 'none', backgroundColor: variant === 'ghost' ? 'transparent' : '#f0f0f0' }}
        aria-label={ariaLabel}
    >
        {children}
    </button>
);

const MockIcon = ({ type, className }) => (
    <span className={className} style={{ fontSize: '1.2rem' }}>
        {type === 'close' ? '×' : '⭐'}
    </span>
);

const MockProCartContent = () => (
    <div style={{ padding: '20px', border: '1px dashed #007bff', minHeight: '400px', backgroundColor: '#fff', borderRadius: '4px' }}>
        <h5 style={{ margin: 0, color: '#007bff' }}>[Mocked ProCartContent Component]</h5>
        <p className="text-sm text-gray-600 mt-2">
            This block represents the detailed cart items, payment frequency, and summary.
            The full functionality of this content is tested in the ProCartContent stories.
        </p>
    </div>
);

// Wrapper component to inject mocks into the structure of ProCartDropdown
function ProCartDropdownWithMocks({ isOpen, onClose, variant = "dropdown" }) {
    if (variant === "dropdown" && !isOpen) return null

    if (variant === "dropdown") {
        return (
            <div className="fixed inset-0 z-50">
                {/* Mocking the backdrop */}
                <div
                    className="absolute inset-0 bg-black bg-opacity-50"
                    onClick={onClose}
                    style={{ opacity: 0.5, zIndex: 50 }}
                />
                {/* Mocking the drawer */}
                <div className="absolute right-0 top-0 h-full w-full sm:w-[480px] md:w-[600px] bg-light-smoky-white shadow-xl overflow-y-auto" style={{ backgroundColor: '#f9f9f9', zIndex: 60 }}>
                    <div className="flex items-center justify-between py-4 px-8 border-b">
                        <h4 className="text-primary" style={{ color: '#f75e00' }}>Cart Subscription Preview</h4>
                        <MockButton // Using MockButton
                            onClick={onClose}
                            variant="ghost"
                            aria-label="Close cart"
                            className="p-0 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                            <MockIcon type="close" className="text-xl" /> {/* Using MockIcon */}
                        </MockButton>
                    </div>
                    <div className="p-4 sm:p-8">
                        <MockProCartContent /> {/* Using MockProCartContent */}
                    </div>
                </div>
            </div>
        )
    }

    // Full page view
    return (
        <div style={{ padding: '20px', border: '1px solid #eee', backgroundColor: 'white' }}>
            <h4 className="mb-4 text-primary" style={{ color: '#f75e00' }}>Cart Subscription Preview (Full Page)</h4>
            <MockProCartContent />
        </div>
    )
}

// --- Storybook Metadata (Meta) ---

export default {
    title: 'Components/ProCartDropdown',
    component: ProCartDropdown,
    tags: ['autodocs'],
    parameters: {
        // Set layout to fullscreen to properly test the fixed overlay
        layout: 'fullscreen',
    },
    argTypes: {
        isOpen: { control: 'boolean' },
        variant: { control: 'select', options: ['dropdown', 'full-page'] },
        onClose: { action: 'onClose clicked' },
    },
    // Decorator to provide a background context for the fixed component
    decorators: [(Story) => (
        <div style={{ height: '100vh', padding: '20px', backgroundColor: '#eef', position: 'relative' }}>
            <h2 className="text-gray-700">Content behind the cart overlay</h2>
            <p className="text-sm text-gray-500">This text helps visualize the modal's fixed position and backdrop.</p>
            <Story />
        </div>
    )],
};

// --- Stories (Named Exports) ---

/**
 * The default state: the full-height side-drawer modal/dropdown is open.
 * This tests the fixed positioning, backdrop, and close button functionality.
 */
export const DropdownOpen = {
    render: (args) => <ProCartDropdownWithMocks {...args} />,
    args: {
        isOpen: true,
        variant: 'dropdown',
    },
    parameters: {
        // Test responsiveness of the drawer width
        viewport: { defaultViewport: 'responsive' }
    }
};

/**
 * Tests the conditional rendering logic: when `isOpen` is false, the component should render nothing 
 * in the 'dropdown' variant, allowing the background content to be visible.
 */
export const DropdownClosed = {
    render: (args) => <ProCartDropdownWithMocks {...args} />,
    args: {
        isOpen: false,
        variant: 'dropdown',
    },
};

/**
 * Tests the "full-page" variant, which should display the content directly without the fixed overlay/modal structure, 
 * simulating the experience when the component is used on a dedicated cart page.
 */
export const FullPageView = {
    render: (args) => <ProCartDropdownWithMocks {...args} />,
    args: {
        isOpen: true, // isOpen is ignored in this variant
        variant: 'full-page',
    },
    parameters: {
        layout: 'padded', // Use 'padded' layout for the full page view
        backgrounds: { default: 'light' },
    }
};