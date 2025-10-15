// Mocking the necessary dependencies for the Story
import React, { useState } from 'react';
import { Button } from '../shared/ui/Buttons/Button';

// --- MOCK ORGANISM COMPONENTS (Tab Content) ---

const MockBillSummary = () => (
    <div className="p-8 bg-green-50 border-2 border-green-300 rounded-xl shadow-xl text-gray-800 h-96 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-green-700">Bill Summary Component (Mock)</h2>
    </div>
);

const MockProductsPortal = () => (
    <div className="p-8 bg-yellow-50 border-2 border-yellow-300 rounded-xl shadow-xl text-gray-800 h-96 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-yellow-700">Products Portal Component (Mock)</h2>
    </div>
);

const MockAccountSettings = () => (
    <div className="p-8 bg-blue-50 border-2 border-blue-300 rounded-xl shadow-xl text-gray-800 h-96 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-blue-700">Account Settings Component (Mock)</h2>
    </div>
);

// --- MOCK MOLECULE COMPONENTS ---

// Mocking the AccountSidebar molecule
const MockAccountSidebar = ({ sections, onItemClick, onSectionClick, className }) => {
    // Simple state to track which sub-item is active for visual feedback
    const [activeItemId, setActiveItemId] = useState(sections[0]?.items[0]?.id || null);

    const handleItemClickInternal = (item, sectionIndex, itemIndex) => {
        setActiveItemId(item.id);
        if (onItemClick) {
            // Log the interaction for Storybook actions panel
            onItemClick(item, sectionIndex, itemIndex);
        }
    };

    return (
        <div className={`p-4 rounded-xl ${className || 'bg-white'}`}>
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Navigation</h3>
            {sections.map((section, sectionIndex) => (
                <div key={section.id} className="mb-4">
                    <Button
                        onClick={() => onSectionClick(section, sectionIndex)}
                        className="text-lg font-semibold text-gray-700 hover:text-indigo-600 block w-full text-left py-1"
                    >
                        {section.title}
                    </Button>
                    <ul className="pl-3 mt-1">
                        {section.items.map((item, itemIndex) => (
                            <li key={item.id} className="my-1">
                                <Button
                                    onClick={() => handleItemClickInternal(item, sectionIndex, itemIndex)}
                                    className={`text-sm block w-full text-left p-2 rounded-md transition duration-150 ease-in-out
                    ${activeItemId === item.id
                                            ? 'bg-indigo-100 text-indigo-700 font-medium'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {item.label}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

// Mocking the Tabs molecule component
const MockTabs = ({ tabs, className, defaultActiveTab, onTabChange }) => {
    // Use a prop or local state for control
    const initialActiveTab = defaultActiveTab || (tabs.length > 0 ? tabs[0].id : null);
    const [activeTabId, setActiveTabId] = useState(initialActiveTab);

    const activeTabContent = tabs.find(tab => tab.id === activeTabId)?.content;

    const handleTabClick = (tabId) => {
        setActiveTabId(tabId);
        if (onTabChange) {
            onTabChange(tabId);
        }
    };

    return (
        <div className={`mock-tabs-container ${className}`}>
            <div className="flex justify-center border-b border-gray-300 mb-8 max-w-7xl mx-auto">
                {tabs.map((tab) => (
                    <Button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`px-6 py-3 text-lg font-semibold transition duration-150 ease-in-out border-b-4
              ${activeTabId === tab.id
                                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
                                : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                            }`}
                    >
                        {tab.label}
                    </Button>
                ))}
            </div>
            <div className="tab-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {activeTabContent}
            </div>
        </div>
    );
};


// --- ProfCustomPortal Implementation for Storybook ---

// Re-implement the component using mocks
const ProfCustomPortal = ({ defaultActiveTab, ...args }) => {
    // Fix state initialization to use defaultActiveTab prop
    const [activeTab, setActiveTab] = useState(defaultActiveTab || 'billing');

    const handleItemClick = (item, sectionIndex, itemIndex) => {
        // Log item click to Storybook Actions panel
        args.onItemClick(item.label, sectionIndex, itemIndex);
    };

    const handleSectionClick = (section, sectionIndex) => {
        // Log section click to Storybook Actions panel
        args.onSectionClick(section.title, sectionIndex);
    };

    const getSidebarData = (tabId) => {
        const sidebarConfigs = {
            billing: [
                {
                    id: 'billing',
                    title: 'Billing',
                    items: [
                        { id: 'bill-summary', label: 'Bill summary' },
                        { id: 'invoice-history', label: 'Invoice History' },
                        { id: 'payment-history', label: 'Payment History' }
                    ]
                }
            ],
            products: [
                {
                    id: 'products',
                    title: 'Products',
                    items: [
                        { id: 'active-products', label: 'Active Products' },
                        { id: 'your-subscription', label: 'Your Subscription' }
                    ]
                }
            ],
            'account-settings': [
                {
                    id: 'account-details',
                    title: 'Account Details',
                    items: [
                        { id: 'account-info', label: 'Account Information' },
                        { id: 'contact-info', label: 'Contact Information' },
                        { id: 'legal-agreements', label: 'Legal Agreements & Contracts' }
                    ]
                },
                {
                    id: 'payments-billing',
                    title: 'Payments and Billing',
                    items: [
                        { id: 'automatic-payments', label: 'Automatic Payments' },
                        { id: 'saved-payment-methods', label: 'Saved Payment Methods' },
                        { id: 'billing-cycle', label: 'Billing Cycle' }
                    ]
                }
            ]
        };

        return sidebarConfigs[tabId] || [];
    };

    const currentSidebarData = getSidebarData(activeTab);

    // Generic layout wrapper with sidebar
    const renderWithSidebar = (content) => (
        <div className='lg:flex'>
            {/* Sidebar */}
            <div className="w-full lg:max-w-[28%] lg:mr-[1%] mb-8 lg:mb-0">
                <MockAccountSidebar
                    sections={currentSidebarData}
                    onItemClick={handleItemClick}
                    onSectionClick={handleSectionClick}
                    className="shadow-lg bg-white p-6"
                />
            </div>

            {/* Content */}
            <div className="w-full lg:max-w-[70%] lg:ml-[1%]">
                {content}
            </div>
        </div>
    );

    // tabs data
    const tabsData = [
        {
            id: 'billing',
            label: 'Billing',
            content: renderWithSidebar(<MockBillSummary />)
        },
        {
            id: 'products',
            label: 'Products',
            content: renderWithSidebar(<MockProductsPortal />)
        },
        {
            id: 'account-settings',
            label: 'Account Settings',
            content: renderWithSidebar(<MockAccountSettings />)
        }
    ];

    return (
        <div className='min-h-screen bg-gray-50 pt-10 pb-20 font-sans'>
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Professional Customer Portal</h1>
            <p className="text-center text-sm text-gray-400 mb-10">
                Main Active Tab: <span className="font-mono text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-md">{activeTab}</span>
            </p>
            <MockTabs
                tabs={tabsData}
                defaultActiveTab={defaultActiveTab || "billing"}
                onTabChange={(tabId) => {
                    // This call updates the state in the ProfCustomPortal,
                    // which is then visible in the helper text above the tabs.
                    console.log('[Storybook Log] Main tab changed to:', tabId);
                    setActiveTab(tabId);
                }}
            />
        </div>
    );
};


// --- STORYBOOK SETUP ---

export default {
    title: 'Pages/ProfCustomPortal',
    component: ProfCustomPortal,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        defaultActiveTab: {
            control: { type: 'select' },
            options: ['billing', 'products', 'account-settings'],
            description: 'The main tab that should be active by default when the component loads.'
        },
        // Adding actions to track sidebar clicks in the Storybook Actions panel
        onItemClick: { action: 'sidebarItemClicked' },
        onSectionClick: { action: 'sidebarSectionClicked' }
    }
};

const Template = (args) => <ProfCustomPortal {...args} />;

// 1. Default Story: Billing tab is active
export const BillingDefault = Template.bind({});
BillingDefault.args = {
    defaultActiveTab: 'billing',
};

// 2. Story: Products tab is active initially
export const ProductsActive = Template.bind({});
ProductsActive.args = {
    defaultActiveTab: 'products',
};

// 3. Story: Account Settings tab is active initially (shows multiple sidebar sections)
export const AccountSettingsActive = Template.bind({});
AccountSettingsActive.args = {
    defaultActiveTab: 'account-settings',
};
