// Mocking the necessary dependencies for the Story
import React, { useState } from 'react';

// --- MOCK COMPONENTS ---

// Mocking the organism components that serve as tab content
const MockDiySubscriptions = () => (
    <div className="p-6 bg-indigo-50 border-2 border-indigo-200 rounded-xl shadow-lg text-gray-700">
        <h2 className="text-xl font-semibold text-indigo-700 mb-3">Subscriptions Panel (Mock)</h2>
        <p>This panel would display detailed information about the user's active plans and renewal dates.</p>
        <div className="mt-4 p-4 bg-white border border-indigo-300 rounded-lg font-mono text-sm">
            Active Plan: Premium Plus (Next Billing: 2026-01-01)
        </div>
    </div>
);

const MockDiyProfileInfo = () => (
    <div className="p-6 bg-purple-50 border-2 border-purple-200 rounded-xl shadow-lg text-gray-700">
        <h2 className="text-xl font-semibold text-purple-700 mb-3">Profile Information Panel (Mock)</h2>
        <p>This panel allows the user to update their name, contact information, and account password.</p>
        <div className="mt-4 p-4 bg-white border border-purple-300 rounded-lg font-mono text-sm">
            User: TestLib TesMath (<button className="text-blue-600 hover:text-blue-800 underline ml-2">Edit Details</button>)
        </div>
    </div>
);

const MockDiyPaymentInfo = () => (
    <div className="p-6 bg-pink-50 border-2 border-pink-200 rounded-xl shadow-lg text-gray-700">
        <h2 className="text-xl font-semibold text-pink-700 mb-3">Payment Information Panel (Mock)</h2>
        <p>This panel is for managing saved payment methods and updating billing addresses.</p>
        <div className="mt-4 p-4 bg-white border border-pink-300 rounded-lg font-mono text-sm">
            Primary Card: MasterCard ending in 9012 (<button className="text-blue-600 hover:text-blue-800 underline ml-2">Change</button>)
        </div>
    </div>
);

// Mocking the Tabs molecule component
const MockTabs = ({ tabs, className, defaultActiveTab, onTabChange }) => {
    // Use a local state to manage which tab is active in the mock
    const [activeTabId, setActiveTabId] = useState(defaultActiveTab);

    const activeTabContent = tabs.find(tab => tab.id === activeTabId)?.content;

    const handleTabClick = (tabId) => {
        setActiveTabId(tabId);
        if (onTabChange) {
            // Call the original onTabChange handler passed from the parent component
            onTabChange(tabId);
        }
    };

    return (
        <div className={`mock-tabs-container ${className}`}>
            <div className="flex justify-center border-b border-gray-300 mb-8 max-w-4xl mx-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`px-6 py-3 text-lg font-semibold transition duration-150 ease-in-out border-b-4
              ${activeTabId === tab.id
                                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
                                : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="tab-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {activeTabContent}
            </div>
        </div>
    );
};


// --- DIYCustomerAccount Implementation for Storybook ---

// We define the component logic here, using the mock dependencies and fixing the state
// issue from the original snippet (setActiveTab was undefined).
const DIYCustomerAccount = (props) => {
    const [activeTab, setActiveTab] = useState(props.defaultActiveTab || 'subscriptions');

    const tabsData = [
        {
            id: 'subscriptions',
            label: 'Subscriptions',
            // Using the mock component instead of the actual import
            content: <MockDiySubscriptions />
        },
        {
            id: 'profile-information',
            label: 'Profile Information',
            // Using the mock component instead of the actual import
            content: <MockDiyProfileInfo />

        },
        {
            id: 'payment-information',
            label: 'Payment Information',
            // Using the mock component instead of the actual import
            content: <MockDiyPaymentInfo />
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            <h1 className="text-4xl font-extrabold text-center pt-12 pb-4 text-gray-800">
                <span className="text-indigo-600">My Account : </span>
                <span className="font-normal text-gray-700">TestLib TesMath</span>
            </h1>
            <p className="text-center text-sm text-gray-400 mb-10">
                Current Active Tab: <span className="font-mono text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-md">{activeTab}</span>
            </p>

            {/* Using the mock Tabs component */}
            <MockTabs
                tabs={tabsData}
                className='mt-10'
                defaultActiveTab={props.defaultActiveTab || "subscriptions"}
                onTabChange={(tabId) => {
                    // This call updates the state in the DIYCustomerAccount,
                    // which is then visible in the helper text above the tabs.
                    console.log('[Storybook Log] Active tab changed to:', tabId);
                    setActiveTab(tabId);
                }}
            />
        </div>
    );
};


// --- STORYBOOK SETUP ---

export default {
    title: 'Pages/DIYCustomerAccount',
    component: DIYCustomerAccount,
    parameters: {
        // Center the component on a neutral background
        layout: 'fullscreen',
    },
    argTypes: {
        defaultActiveTab: {
            control: { type: 'select' },
            options: ['subscriptions', 'profile-information', 'payment-information'],
            description: 'The tab that should be active by default when the component loads.'
        }
    }
};

const Template = (args) => <DIYCustomerAccount {...args} />;

// 1. Default Story: Subscriptions tab is active
export const Default = Template.bind({});
Default.args = {
    defaultActiveTab: 'subscriptions',
};

// 2. Story: Profile Information tab is active initially
export const ProfileInformationActive = Template.bind({});
ProfileInformationActive.args = {
    defaultActiveTab: 'profile-information',
};

// 3. Story: Payment Information tab is active initially
export const PaymentInformationActive = Template.bind({});
PaymentInformationActive.args = {
    defaultActiveTab: 'payment-information',
};
