import React from 'react';
import { Tabs } from '../components/molecules/Tabs';
import BillSummary from '../components/organisms/billSummary';
import ProductsPortal from '../components/organisms/ProductsPortal';
import AccountSettings from '../components/organisms/AccountSettings';

export const ProfCustomPortal = () => {

  // tabs data
  const tabsData = [
    {
      id: 'billing',
      label: 'Billing',
      content: (
        <>
          <BillSummary />
        </>
      )
    },
    {
      id: 'products',
      label: 'Products',
      content: (
        <>
          <ProductsPortal />
        </>
      )
    },
    {
      id: 'account-settings',
      label: 'Account Settings',
      content: (
        <>
          <AccountSettings />
        </>
      )
    }
  ];

  return (
    <div className='customer-portal-professional'>
      <Tabs
        tabs={tabsData}
        defaultActiveTab="billing"
        onTabChange={(tabId) => console.log('Active tab:', tabId)}
      />
    </div>
  );
};
