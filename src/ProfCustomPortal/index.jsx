import React from 'react'
import { Tabs } from '../components/molecules/Tabs';

export const ProfCustomPortal = () => {


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
  
  return (
    <div>
      <Tabs 
        tabs={tabsData}
        defaultActiveTab="billing"
        onTabChange={(tabId) => console.log('Active tab:', tabId)}
      />    

    </div>
  )
}
