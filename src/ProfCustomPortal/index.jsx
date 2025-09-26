import React from 'react';
import { Tabs } from '../components/molecules/Tabs';
import { ProductInfo } from '../components/atoms/ProductInfo';
import { PriceText } from '../components/atoms/Price/PriceText';
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
