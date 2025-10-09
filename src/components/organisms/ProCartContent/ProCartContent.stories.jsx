import React, { useState } from 'react';
import { ProCartContent } from './ProCartContent'; // Adjust path as necessary
import repairIcon from "../../../assets/images/repair_color.png" // Assuming this path works

// --- Mocking Dependencies ---

// 1. Mock useNavigate from 'react-router-dom'
const useNavigateMock = () => (path) => console.log('Navigating to:', path);
const mockNavigate = useNavigateMock();

// 2. Mock all custom UI components with simple placeholders or controlled versions
const MockRadioButton = ({ label, checked, onChange, value }) => (
    <label className="flex items-center space-x-2">
        <input
            type="radio"
            checked={checked}
            onChange={() => onChange(value)}
            className="accent-[#f75e00]"
        />
        <span className="text-sm">{label}</span>
    </label>
);
const MockProductName = ({ name }) => <span className="font-bold">{name}</span>;
const MockCounterDropdown = ({ value, onChange, showLabel }) => (
    <div className="text-center">
        {showLabel && <div className="text-xs text-gray-500 mb-1">Access Points</div>}
        <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-12 border text-center"
            min="1"
        />
    </div>
);
const MockPriceText = ({ amount, label, isDiscount, isTotal }) => (
    <div className="flex justify-between">
        <span className={`${isTotal ? 'text-lg font-bold' : ''}`}>{label}</span>
        <span className={`${isDiscount ? 'text-red-500' : ''} ${isTotal ? 'text-lg font-bold' : ''}`}>
            {isDiscount ? '- ' : ''}${Math.abs(amount).toFixed(2)}
        </span>
    </div>
);
const MockInputWithButton = ({ placeholder, buttonText, onSubmit }) => (
    <div className="flex border">
        <input type="text" placeholder={placeholder} className="p-2 flex-1" />
        <button onClick={onSubmit} className="bg-gray-200 p-2">{buttonText}</button>
    </div>
);
const MockMessage = ({ type, children }) => (
    <div className={`p-3 rounded border text-sm ${type === 'error' ? 'bg-red-100 border-red-400' : type === 'info' ? 'bg-blue-100 border-blue-400' : type === 'warning' ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-100 border-gray-400'}`}>
        {children}
    </div>
);
const MockDeleteIcon = ({ onClick, className }) => (
    <div onClick={onClick} className={`${className} cursor-pointer`} style={{ width: '20px', height: '20px' }}>
        🗑️
    </div>
);
const MockMessageIcon = () => <span>ⓘ</span>;
const MockLinkButton = ({ children, onClick, variant }) => (
    <button onClick={onClick} className={`text-blue-600 ${variant === 'ghost' ? 'hover:underline' : ''}`}>
        {children}
    </button>
);
const MockDropdown = ({ value, onValueChange, options }) => (
    <select value={value} onChange={(e) => onValueChange(e.target.value)} className="p-2 border">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
);
const MockAccessPointsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 }}>
            <div style={{ background: 'white', margin: '10% auto', padding: '20px', width: '300px' }}>
                <h3>What are Access Points?</h3>
                <p>This is a modal explaining access points.</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};
const MockButton = ({ children, onClick, variant, className }) => (
    <button
        onClick={onClick}
        className={`p-3 rounded font-semibold text-center ${className} ${variant === 'outline' ? 'border border-blue-600 text-blue-600 bg-white' : 'bg-blue-600 text-white'}`}
    >
        {children}
    </button>
);

// --- Story Wrapper to Control Initial State and Mocks ---
const ProCartContentWrapper = ({ initialCartItems = [], initialPaymentFrequency = "MONTHLY" }) => {
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [paymentFrequency, setPaymentFrequency] = useState(initialPaymentFrequency);
    const [subscriptionTerm, setSubscriptionTerm] = useState("12 Months");
    const [promoCode, setPromoCode] = useState("");
    const [showAccessPointsModal, setShowAccessPointsModal] = useState(false);

    const handleAccessPointChange = (itemId, newValue) => {
        setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, accessPoints: newValue } : item));
    };

    const handleRemoveItem = (itemId) => {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
    };

    const handleApplyPromo = () => {
        console.log("Applying promo code:", promoCode);
    };

    // The component structure is kept, but with mocked state and dependencies
    return (
        <div>
            {/* Messages */}
            <MockMessage type="error" className="mb-3">
                In order to purchase <strong>ALLDATA INSPECTIONS</strong>, you must also purchase{" "}
                <strong>ALLDATA REPAIR</strong> or <strong>ALLDATA COLLISION</strong>
            </MockMessage>
            <MockMessage type="info" className="mb-3">
                <strong>ALLDATA INSPECTIONS</strong> requires <strong>ALLDATA MOBILE</strong>, and it has been added to your cart.
            </MockMessage>
            <MockMessage type="warning" className="mb-3">
                Your Total Due has been updated. Please review your cart before continuing with purchase.
            </MockMessage>

            {/* Payment Frequency */}
            <div className="mb-6 bg-white py-4 px-8 shadow-lg">
                <div className="flex items-center justify-between">
                    <label className="text-md text-black">Payment Frequency</label>
                    <div className="flex gap-6">
                        <MockRadioButton
                            name="paymentFrequency"
                            value="MONTHLY"
                            checked={paymentFrequency === "MONTHLY"}
                            onChange={setPaymentFrequency}
                            label="MONTHLY"
                        />
                        <MockRadioButton
                            name="paymentFrequency"
                            value="ANNUALLY"
                            checked={paymentFrequency === "ANNUALLY"}
                            onChange={setPaymentFrequency}
                            label="ANNUALLY"
                        />
                    </div>
                </div>
            </div>

            {/* Access Points Info */}
            <div className="mb-4 flex justify-end">
                <MockLinkButton
                    onClick={() => setShowAccessPointsModal(true)}
                    className="flex items-center text-xs"
                >
                    <MockMessageIcon type="info" className="mr-1" />
                    What are Access Points?
                </MockLinkButton>
            </div>

            {/* Cart Items */}
            <div className="mb-6 shadow-lg bg-white">
                {cartItems.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">Your cart is empty.</div>
                ) : (
                    cartItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`py-4 px-8 ${index !== cartItems.length - 1 ? "border-b border-light-smoky-white" : ""}`}
                        >
                            {/* Desktop */}
                            <div className="hidden sm:grid items-center gap-4" style={{ gridTemplateColumns: "1fr 144px 1fr 48px" }}>
                                <div className="flex items-center gap-3 text-md">
                                    <img src={repairIcon} alt="Repair Color" className="w-[40px]" />
                                    <MockProductName name={item.name} />
                                </div>
                                <div className="text-center">
                                    <MockCounterDropdown
                                        value={item.accessPoints}
                                        onChange={(value) => handleAccessPointChange(item.id, value)}
                                        showLabel={true}
                                    />
                                </div>
                                <div className="text-right">
                                    <div className="font-normal">${item.price?.toFixed(2) ?? "0.00"}</div>
                                    <div className="text-sm text-gray-600">
                                        {item.isIncluded ? `Included with ${item.includedWith}` : "Monthly"}
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <MockDeleteIcon
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-primary hover:text-error cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Mobile - Simplified view */}
                            <div className="sm:hidden space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src={repairIcon} alt="Repair Color" className="w-[30px]" />
                                        <MockProductName name={item.name} />
                                    </div>
                                    <MockDeleteIcon
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-gray-400 hover:text-error cursor-pointer"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <MockCounterDropdown
                                        value={item.accessPoints}
                                        onChange={(value) => handleAccessPointChange(item.id, value)}
                                        showLabel={true}
                                    />
                                    <div className="text-right">
                                        <div className="font-normal">${item.price?.toFixed(2) ?? "0.00"}</div>
                                        <div className="text-sm text-gray-500 font-light">
                                            {item.isIncluded ? `Included with ${item.includedWith}` : "Monthly"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Remove Products */}
            <div className="mb-6 flex justify-end">
                <MockLinkButton size="sm" className="text-xs" onClick={() => console.log("Remove added products")}>
                    Remove Added Products
                </MockLinkButton>
            </div>

            {/* Pricing Summary */}
            <div className="mb-6 shadow-lg bg-white">
                <div className="space-y-2">
                    <div className="border-b-2 border-light-smoky-white">
                        <div className="py-4 px-8">
                            <MockPriceText amount={218.0} label="Subscription Subtotal" />
                        </div>
                    </div>
                    <div className="border-b-2 border-light-smoky-white">
                        <div className="py-4 px-8">
                            <MockPriceText amount={-12.75} label="Bundle Discount" isDiscount />
                        </div>
                    </div>
                    <div className="border-b-2 border-light-smoky-white">
                        <div className="py-4 px-8">
                            <MockPriceText amount={205.25} label="Total Monthly" />
                        </div>
                    </div>
                    <div className="border-b-2 border-light-smoky-white">
                        <div className="py-4 px-8">
                            <MockPriceText amount={205.25} label="Total Due:" isTotal />
                            <p className="text-gray-600 text-right mt-1">Taxes Not Included</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Promo Code */}
            <div className="mb-6 bg-white py-4 px-8 flex items-center shadow-lg bg-white">
                <span className="text-md text-black whitespace-nowrap mr-4">
                    Add Promo Code
                </span>
                <MockInputWithButton
                    placeholder="ENTER CODE"
                    buttonText="APPLY"
                    onSubmit={handleApplyPromo}
                    className="flex-1 min-w-0"
                />
            </div>

            {/* Subscription Term */}
            <div className="mb-4 shadow-lg bg-white">
                <div className="flex items-center justify-between border-b-2 border-light-smoky-white py-4 px-8 w-full">
                    <label className="text-md text-black">Subscription Term</label>
                    <MockDropdown
                        value={subscriptionTerm}
                        onValueChange={setSubscriptionTerm}
                        options={[
                            { value: "3 Months", label: "3 Months" },
                            { value: "6 Months", label: "6 Months" },
                            { value: "12 Months", label: "12 Months" },
                        ]}
                    />
                </div>
                <div className="flex items-center justify-between py-4 px-8 w-full">
                    <label className="text-black text-md whitespace-nowrap">
                        Auto Renewal Date:
                    </label>
                    <div className="text-md ml-4 text-blck text-right">09/09/2026</div>
                </div>
            </div>

            {/* Footer */}
            <div className="space-y-3">
                <p className="text-gray-600 mb-6">
                    *Promotional rate. All rates subject to applicable sales taxes. Taxes applied at checkout.
                </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2">
                <MockButton
                    variant="outline"
                    className="btn-full cursor-pointer btn btn-primary"
                    onClick={() => mockNavigate('/usanonycheckout')}
                >
                    CHECKOUT
                </MockButton>
                <MockLinkButton variant="ghost" className="w-full text-center" onClick={() => console.log('Continue Shopping')}>
                    Continue Shopping
                </MockLinkButton>
            </div>

            {/* Access Points Modal */}
            <MockAccessPointsModal
                isOpen={showAccessPointsModal}
                onClose={() => setShowAccessPointsModal(false)}
            />
        </div>
    );
};


// --- Default Cart Items for Stories ---
const defaultCartItems = [
    { id: "mobile", name: "Mobile", type: "mobile", price: 39.0, accessPoints: 1 },
    { id: "basic-diagnostics", name: "Basic Diagnostics", type: "diagnostics", price: 0.0, accessPoints: 1, isIncluded: true, includedWith: "Mobile" },
    { id: "repair", name: "Repair", type: "repair", price: 179.0, accessPoints: 1 },
    { id: "community", name: "Community", type: "community", price: 0.0, accessPoints: 1, isIncluded: true, includedWith: "Repair" },
];

const multiAccessPointsItems = [
    { id: "mobile", name: "Mobile", type: "mobile", price: 39.0, accessPoints: 3 },
    { id: "repair", name: "Repair", type: "repair", price: 179.0, accessPoints: 2 },
];


// --- Storybook Metadata (Meta) ---

export default {
    title: 'Pages/ProCartContent',
    component: ProCartContent,
    tags: ['autodocs'],
    // Add padding to ensure the content is easily viewable in the Storybook canvas
    decorators: [(Story) => (
        <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-[#f5f5f5]">
            <Story />
        </div>
    )],
    parameters: {
        layout: 'fullscreen',
    }
};

// --- Stories (Named Exports) ---

/**
 * The standard view of the cart with a typical set of products and default options.
 */
export const DefaultView = {
    render: (args) => <ProCartContentWrapper
        initialCartItems={defaultCartItems}
        initialPaymentFrequency="MONTHLY"
        {...args}
    />,
    args: {},
};

/**
 * A state demonstrating multiple access points for items and the 'ANNUALLY' payment option selected.
 */
export const MultiAccessPointsAnnualPayment = {
    render: (args) => <ProCartContentWrapper
        initialCartItems={multiAccessPointsItems}
        initialPaymentFrequency="ANNUALLY"
        {...args}
    />,
    args: {},
};

/**
 * Shows the cart content when it is completely empty. 
 * This verifies the conditional rendering for the empty cart state.
 */
export const EmptyCart = {
    render: (args) => <ProCartContentWrapper
        initialCartItems={[]}
        initialPaymentFrequency="MONTHLY"
        {...args}
    />,
    args: {},
};

/**
 * A story to show the mobile layout. Use Storybook's Viewport addon to view this.
 */
export const MobileView = {
    ...DefaultView,
    parameters: {
        // Use Storybook Viewport addon to simulate a mobile device width
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};