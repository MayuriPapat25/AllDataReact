import React, { useState } from 'react';
import { Tabs } from '../components/molecules/Tabs';
import BillSummary from '../components/organisms/BillSummary/billSummary';
import ProductsPortal from '../components/organisms/ProductsPortal/ProductsPortal';
import AccountSettings from '../components/organisms/AccountSettings/AccountSettings';

export const ProfCustomPortal = () => {
  const [activeTab, setActiveTab] = useState('billing');

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

  const currentSidebarData = getSidebarData(activeTab);

  // Generic layout wrapper with sidebar
  const renderWithSidebar = (content) => (
    <div className='lg:flex'>
      {/* Sidebar */}
      <div className="w-full lg:max-w-[30%] customer-portal-sidebar-section">
        <AccountSidebar
          sections={currentSidebarData}
          onItemClick={handleItemClick}
          onSectionClick={handleSectionClick}
          className="shadow-lg"
        />
      </div>

      {/* Content */}
      <div className="w-full lg:max-w-[70%] customer-portal-summary-section">
        {content}
      </div>
    </div>
  );

  // tabs data
  const tabsData = [
    {
      id: 'billing',
      label: 'Billing',
      content: renderWithSidebar(<BillSummary />)
    },
    {
      id: 'products',
      label: 'Products',
      content: renderWithSidebar(<ProductsPortal />)
    },
    {
      id: 'account-settings',
      label: 'Account Settings',
      content: renderWithSidebar(<AccountSettings />)
    }
  ];

  return (
    <div className='customer-portal-professional'>
      <Tabs
        tabs={tabsData}
        defaultActiveTab="billing"
        onTabChange={(tabId) => {
          console.log('Active tab:', tabId);
          setActiveTab(tabId);
        }}
      />
    </div>
  );
};