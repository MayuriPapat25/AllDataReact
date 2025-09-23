import React, { useState } from 'react';
import { TabButton } from '../../atoms/TabButton';
import AccountSidebar from '../AccountSidebar';

export const Tabs = ({ tabs, defaultActiveTab, onTabChange, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsDropdownOpen(false); // Close dropdown when tab is selected
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  const handleItemClick = (item, sectionIndex, itemIndex) => {
    console.log('Clicked item:', item, 'in section:', sectionIndex, 'at index:', itemIndex);
  };

  const handleSectionClick = (section, sectionIndex) => {
    console.log('Clicked section:', section, 'at index:', sectionIndex);
  };

  const getSidebarData = (tabId) => {
    const sidebarConfigs = {
      billing: [
        {
          id: 'billing',
          title: 'Billing',
          items: [
            { id: 'bill-summary', label: 'Bill summary', isActive: true },
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
            { id: 'active-products', label: 'Active Products', isActive: true },
            { id: 'your-subscription', label: 'Your Subscription' }
          ]
        }
      ],
      'account-settings': [
        {
          id: 'account-details',
          title: 'Account Details',
          items: [
            { id: 'account-info', label: 'Account Information', isActive: true },
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

  const activeTabData = tabs.find(tab => tab.id === activeTab);
  const activeTabContent = activeTabData?.content;
  const currentSidebarData = getSidebarData(activeTab);

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Tabs - Hidden on mobile */}
      <div className="hidden md:block border-b border-gray-200 bg-white">
        <nav className="flex justify-center">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                variant="tab"
                isActive={activeTab === tab.id}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Dropdown - Visible only on mobile */}
      <div className="md:hidden relative">
        <TabButton
          variant="dropdown-toggle"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          isOpen={isDropdownOpen}
        >
          {activeTabData?.label || 'Select Tab'}
        </TabButton>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                variant="dropdown-item"
                isActive={activeTab === tab.id}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>
        )}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTabContent}
      </div>

      <div>
        <AccountSidebar
          sections={currentSidebarData}
          onItemClick={handleItemClick}
          onSectionClick={handleSectionClick}
          className="shadow-lg"
        />
      </div>
    </div>
  );
};