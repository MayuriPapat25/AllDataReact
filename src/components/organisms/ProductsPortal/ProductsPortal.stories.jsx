import React, { useState } from 'react';
import ProductsPortal from './ProductsPortal'; // The component being tested

// --- Mocking Dependencies ---

// 1. Mock Hooks
const useNavigateMock = () => (path) => console.log('Navigating to:', path);
const mockNavigate = useNavigateMock();

// 2. Mock Lucide Icons (Car, MessageSquare, Plus, SquareArrowOutUpRightIcon)
const MockCar = (props) => <span {...props} style={{ fontSize: '1.5em', color: 'currentColor' }}>🚗</span>;
const MockMessageSquare = (props) => <span {...props} style={{ fontSize: '1.5em', color: 'currentColor' }}>💬</span>;
const MockPlus = (props) => <span {...props} style={{ fontSize: '1.5em', color: 'currentColor' }}>➕</span>;
const MockSquareArrowOutUpRightIcon = (props) => <span {...props} style={{ fontSize: '1em', color: 'currentColor' }}>↗️</span>;

// 3. Mock Complex Child Components (Molecules)

// Mock ProductCard to render the list
const MockProductCard = ({ cards }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
        <h5 style={{ width: '100%', margin: '0 0 10px 0', color: '#007bff' }}>[Mocked Product Cards]</h5>
        {cards.map(card => (
            <div
                key={card.id}
                onClick={card.onClick}
                style={{
                    padding: '15px',
                    border: card.isDashed ? '2px dashed #999' : '1px solid #ddd',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    width: '120px',
                    backgroundColor: card.isDashed ? '#f9f9f9' : '#fff'
                }}
            >
                <div
                    className={card.iconColor}
                    style={{
                        margin: '0 auto 5px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: card.iconColor.includes('text-white') ? 'white' : 'black',
                        backgroundColor: card.iconColor.includes('bg-blue-600') ? '#2563eb' : card.iconColor.includes('bg-orange-500') ? '#f97316' : '#ccc'
                    }}
                >
                    {/* Render the appropriate mock icon */}
                    {card.id === 'repair' && <MockCar />}
                    {card.id === 'community' && <MockMessageSquare />}
                    {(card.id === 'find-fix' || card.id === 'estimator' || card.id === 'add-products') && <MockPlus />}
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '10px' }}>{card.title}</div>
                {card.subtitle && <div style={{ fontSize: '8px', color: '#666' }}>{card.subtitle}</div>}
            </div>
        ))}
    </div>
);

// Mock Atoms
const MockInfoText = ({ label, value, link }) => (
    <div className="flex justify-between items-center py-1">
        <span className="text-gray-700">{label}</span>
        {link ? (
            <a href={link} className="text-blue-600 underline text-sm">{value}</a>
        ) : (
            <span className="text-gray-900 font-medium text-sm">{value}</span>
        )}
    </div>
);
const MockIcon = ({ type, className }) => <span className={className}>{type === 'remove' ? '❌' : 'ⓘ'}</span>;
const MockMessageIcon = (props) => <span {...props}>ⓘ</span>;
const MockButton = ({ children, onClick, variant, className, size }) => (
    <button
        onClick={onClick}
        className={`${className} p-2 rounded`}
        style={{ border: variant === 'ghost' ? 'none' : '1px solid #ccc' }}
    >
        {children}
    </button>
);
const MockLinkButton = ({ children, onClick, className }) => (
    <button onClick={onClick} className={`${className} text-blue-600 hover:underline text-sm`}>
        {children}
    </button>
);

// Mock Modals
const MockAccountClosureModal = ({ isOpen, onClose, title, desc1 }) => {
    if (!isOpen) return null;
    return (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '30px', borderRadius: '8px', maxWidth: '400px' }}>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm">{desc1}</p>
                <button onClick={onClose} className="mt-4 p-2 bg-red-500 text-white rounded">Close Modal</button>
            </div>
        </div>
    );
};
const MockAccessPointsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ background: 'white', padding: '30px', borderRadius: '8px', maxWidth: '400px' }}>
                <h3 className="text-lg font-bold">What are Access Points?</h3>
                <p className="mt-2 text-sm">Access point information goes here.</p>
                <button onClick={onClose} className="mt-4 p-2 bg-blue-500 text-white rounded">Close Modal</button>
            </div>
        </div>
    );
};

// Mock SubscriptionManager
const MockSubscriptionManager = () => (
    <div style={{ padding: '20px', border: '1px dashed #f75e00', backgroundColor: '#fff', borderRadius: '4px' }}>
        <h5 style={{ margin: 0, color: '#f75e00' }}>[Mocked SubscriptionManager]</h5>
        <p className="text-sm text-gray-600 mt-2">Links/buttons to manage products, change plan, etc.</p>
    </div>
);


// --- ProductsPortal Component with Mocks and Controlled State ---
const ProductsPortalWrapper = ({ initialAccountClosureModalOpen = false, initialAccessPointsModalOpen = false }) => {

    // We recreate the state hooks from the original component
    const [showAccessPointsModal, setShowAccessPointsModal] = useState(initialAccessPointsModalOpen);
    const [isModalOpen, setIsModalOpen] = useState(initialAccountClosureModalOpen);

    // Mocked static data from the original component
    const productCards = [
        {
            id: "repair",
            title: "REPAIR",
            icon: <MockCar className="w-8 h-8" />,
            iconColor: "bg-blue-600 text-white",
            onClick: () => mockNavigate('/repair'),
        },
        {
            id: "community",
            title: "COMMUNITY",
            icon: <MockMessageSquare className="w-8 h-8" />,
            iconColor: "bg-orange-500 text-white",
            onClick: () => console.log("Community clicked"),
        },
        {
            id: "find-fix",
            title: "FIND A FIX",
            icon: <MockPlus className="w-8 h-8" />,
            iconColor: "bg-gray-600 text-white",
            onClick: () => console.log("Find a fix clicked"),
        },
        {
            id: "estimator",
            title: "ESTIMATOR",
            icon: <MockPlus className="w-8 h-8" />,
            iconColor: "bg-gray-600 text-white",
            onClick: () => console.log("Estimator clicked"),
        },
        {
            id: "add-products",
            title: "ADD PRODUCTS",
            subtitle: "Shop Additional Products",
            icon: <MockPlus className="w-6 h-6" />,
            iconColor: "bg-transparent border-2 border-gray-400",
            isDashed: true,
            onClick: () => console.log("Add products clicked"),
        },
    ];

    // The rest of the original component's JSX structure, using the mocks
    return (
        <>
            <main className="mb-8">
                <h1 className="h3 my-4 font-normal text-primary" style={{ fontWeight: 500 }}>Active Products</h1>
                <MockProductCard cards={productCards} />
            </main>
            <h2 className="h3 my-4 font-normal text-primary" style={{ fontWeight: 500 }}>Your Subscription</h2>
            <div className="mb-6 shadow-lg bg-white general-list">
                <div className="">
                    <div className="py-4 px-8 border-b-2 border-light-smoky-white">
                        <MockInfoText label="Subscription Term" value="1 Year" />
                    </div>
                    <div className="py-4 px-8 border-b-2 border-light-smoky-white">
                        <MockInfoText label="Auto Renewal Date" value="09/23/2026" />
                    </div>
                    <div className="py-4 px-8 border-b-2 border-light-smoky-white">
                        <MockInfoText label="Invoice Frequency" value="Monthly" />
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

            {/*  Subscription Management */}
            <div className="mb-6 shadow-lg bg-white">
                <MockSubscriptionManager />
            </div>

            {/* Cancel Subscription */}
            <div className="mb-6 p-6 shadow-lg bg-white general-list ">
                <MockButton
                    variant="ghost"
                    className="w-full font-normal flex items-center"
                    onClick={() => setIsModalOpen(true)}
                    size='lg'
                >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 mr-2">
                        <MockIcon type="remove" className="text-xl text-primary" />
                    </span>
                    <span >Cancel Subscription</span>
                </MockButton>
                <MockAccountClosureModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Requesting Account Closure"
                    desc1="This request will not automatically cancel your subscription service(s)."
                    desc2="An agent will follow up with you within 24-48 hours* after reviewing the terms of your agreement for eligibility."
                    requiredMessage="*excluding weekends and holidays"
                />
            </div>

            <div className="mb-6 shadow-lg bg-white invoice-history-list">
                <div className="border-b-2 border-light-smoky-white">
                    <div className="py-4 px-8 flex items-center gap-1">
                        <MockInfoText
                            label="Legal agreements, sales contracts, and order confirmation emails"
                            value="View"
                            link="/"
                        />
                        <MockSquareArrowOutUpRightIcon size={16} className='text-blue-800' />
                    </div>
                </div>
            </div>

            {/* Access Points Modal */}
            <MockAccessPointsModal
                isOpen={showAccessPointsModal}
                onClose={() => setShowAccessPointsModal(false)}
            />
        </>
    );
};


// --- Storybook Metadata (Meta) ---

export default {
    title: 'Pages/ProductsPortal',
    component: ProductsPortal,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
    },
    decorators: [(Story) => (
        <div className="max-w-6xl mx-auto p-4 sm:p-8 bg-[#f5f5f5]">
            <Story />
        </div>
    )],
};

// --- Stories (Named Exports) ---

/**
 * The default view of the Products Portal, showing active products, subscription details, and management options.
 * Both modals are closed by default.
 */
export const DefaultView = {
    render: () => <ProductsPortalWrapper />,
    args: {},
};

/**
 * Demonstrates the Products Portal when the Account Closure Modal is visible.
 * This is triggered by the "Cancel Subscription" button.
 */
export const AccountClosureModalOpen = {
    render: () => <ProductsPortalWrapper initialAccountClosureModalOpen={true} />,
    args: {},
    parameters: {
        // Hide other story content so only the modal is the focus
        docs: { source: { state: 'closed' } }
    }
};

/**
 * Demonstrates the Products Portal when the Access Points Modal is visible.
 * This is triggered by the "What are Access Points?" link.
 */
export const AccessPointsModalOpen = {
    render: () => <ProductsPortalWrapper initialAccessPointsModalOpen={true} />,
    args: {},
    parameters: {
        // Hide other story content so only the modal is the focus
        docs: { source: { state: 'closed' } }
    }
};