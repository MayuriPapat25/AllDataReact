import React from 'react';
import { Tabs } from '../components/molecules/Tabs';
import { ProductInfo } from '../components/atoms/ProductInfo';

export const ProfCustomPortal = () => {

  // tabs data
  const tabsData = [
    {
      id: 'billing',
      label: 'Billing',
      content: (
        <div className="p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Billing Information</h3>
          <p className="text-gray-600">Manage your billing details and payment methods.</p>
        </div>
      )
    },
    {
      id: 'products',
      label: 'Products',
      content: (
        <div className="p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Products</h3>
          <p className="text-gray-600">View and manage your products and services.</p>
        </div>
      )
    },
    {
      id: 'account-settings',
      label: 'Account Settings',
      content: (
        <div className="p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
          <p className="text-gray-600">Update your account preferences and settings.</p>
        </div>
      )
    }
  ];

  const sections = [
    {
      headerText: "Viewing Shop",
      showDropdown: false,
      productInfo: {
        title: "Downtown Branch",
        description: "456 Oak Street, Nashville, Tennessee, 37201-1234",
        className: "space-y-1",
      },
    },
  ];

  return (
    <div>
      <Tabs
        tabs={tabsData}
        defaultActiveTab="billing"
        onTabChange={(tabId) => console.log('Active tab:', tabId)}
      />

      <div className="mt-12 space-y-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm w-80"
          >
            <h4>{section.headerText}</h4>
            <ProductInfo {...section.productInfo} />
          </div>
        ))}
      </div>
    </div>
  );
};
