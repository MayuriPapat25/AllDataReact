import React from 'react';
import DiySubscriptions from '../components/organisms/DiySubscriptions/DiySubscriptions';
import DiyPaymentInfo from '../components/organisms/DiyPaymentInfo/DiyPaymentInfo';
import DiyProfileInfo from '../components/organisms/DiyProfileInfo/DiyProfileInfo';
import { Tabs } from '../components/molecules/Tabs';

const DIYCustomerAccount = () => {

  const tabsData = [
    {
      id: 'subscriptions',
      label: 'Subscriptions',
      content: <DiySubscriptions />
    },
    {
      id: 'profile-information',
      label: 'Profile Information',
      content: <DiyProfileInfo />

    },
    {
      id: 'payment-information',
      label: 'Payment Information',
      content: <DiyPaymentInfo />
    }
  ];

  return (
    <>
      <h1 className="title text-center mt-20">
        {/* @todo: Get content from Drupal */}
        <span className="title-first-part">My Account : </span>
        <span className="title-username font-normal">TestLib TesMath</span>
      </h1>

      <Tabs
        tabs={tabsData}
        className='mt-10'
        defaultActiveTab="subscriptions"
        onTabChange={(tabId) => {
          console.log('Active tab:', tabId);
          setActiveTab(tabId);
        }}
      />
    </>
  );
};

export default DIYCustomerAccount;