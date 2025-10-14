import React, { useState } from 'react';
import DiySubscriptions from '../components/organisms/DiySubscriptions/DiySubscriptions';
import DiyPaymentInfo from '../components/organisms/DiyPaymentInfo/DiyPaymentInfo';
import DiyProfileInfo from '../components/organisms/DiyProfileInfo/DiyProfileInfo';
import { Tabs } from '../components/molecules/Tabs';
import DIYCartHome from '../Cart/diy';

const DIYCustomerAccount = () => {
  const initialSubscriptions = [
    {
      id: "1",
      vehicle: "2020 Audi A3 Sedan (8VM) L4-2.0L Turbo (CZRA)",
      expiration: "10/30/2025",
      price: "$19.99 / 1 Month",
      inCart: false,
      hasChangedVehicle: false,
      hasRequestedRefund: false,
    },
    {
      id: "2",
      vehicle: "2023 Audi A4 Quattro Sedan 45 (8WC) L4-2.0L Turbo (DPAA) MHEV",
      expiration: "09/29/2026",
      price: "$19.99 / 1 Month",
      inCart: false,
      hasChangedVehicle: false,
      hasRequestedRefund: false,
    },
    {
      id: "3",
      vehicle: "2022 Buick Truck Encore FWD L4-1.4L Turbo VIN M",
      expiration: "09/29/2026",
      price: "$19.99 / 1 Month",
      inCart: false,
      hasChangedVehicle: true,
      hasRequestedRefund: true,
    },
    {
      id: "4",
      vehicle: "2026 Cadillac Truck Escalade IQ AWD ELE-Electric Engine",
      expiration: "09/29/2028",
      price: "$19.99 / 1 Month",
      inCart: false,
      hasChangedVehicle: false,
      hasRequestedRefund: false,
    },
  ];
  const [activeTab, setActiveTab] = useState('subscriptions');
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [cartData, setCartData] = useState([])
  const cartCount = cartData.length > 0 && cartData?.length;
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [isRefundLimitModalOpen, setIsRefundLimitModalOpen] = useState(false);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);

  const handleAddToCart = (subscription) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === subscription?.id ? { ...sub, inCart: true } : sub
      )
    );

    setCartData((prev) => {
      if (!Array.isArray(prev)) prev = []; // safeguard if it became an object accidentally
      const exists = prev.some((item) => item.id === subscription.id);
      if (exists) return prev; // avoid duplicates
      return [...prev, subscription];
    });
  };

  const handleChangeVehicle = (vehicle, subscriptionId) => {
    const subscription = subscriptions.find((sub) => sub.id === subscriptionId);

    if (subscription.hasChangedVehicle) {
      setIsLimitModalOpen(true);
    } else {
      setSelectedVehicle(vehicle);
      setSelectedSubscriptionId(subscriptionId);
      setIsModalOpen(true);
      setSubscriptions(prev =>
        prev.map(sub =>
          sub.id === subscriptionId
            ? { ...sub, hasChangedVehicle: true }
            : sub
        )
      );
    }
  };

  const handleVehicleChangeComplete = () => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === selectedSubscriptionId ? { ...sub, hasChangedVehicle: true } : sub)),
    );
    setIsModalOpen(false);
  };

  const handleRefundRequest = (vehicle, subscriptionId) => {
    const subscription = subscriptions.find((sub) => sub.id === subscriptionId);

    if (subscription.hasRequestedRefund) {
      setIsRefundLimitModalOpen(true);
    } else {
      setSelectedVehicle(vehicle);
      setSelectedSubscriptionId(subscriptionId);
      setIsRefundModalOpen(true);
    }
  };

  const handleRefundComplete = () => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === selectedSubscriptionId ? { ...sub, hasRequestedRefund: true } : sub)),
    );
    setIsRefundModalOpen(false);
  };

  const tabsData = [
    {
      id: 'subscriptions',
      label: 'Subscriptions',
      content: <DiySubscriptions
        subscriptions={subscriptions}
        setSubscriptions={setSubscriptions}
        cartCount={cartCount}
        setCartData={setCartData}
        handleAddToCart={handleAddToCart}
        handleChangeVehicle={handleChangeVehicle}
        handleVehicleChangeComplete={handleVehicleChangeComplete}
        handleRefundRequest={handleRefundRequest}
        handleRefundComplete={handleRefundComplete}
        selectedVehicle={selectedVehicle}
        isRefundModalOpen={isRefundModalOpen}
        isRefundLimitModalOpen={isRefundLimitModalOpen}
        selectedSubscriptionId={selectedSubscriptionId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isLimitModalOpen={isLimitModalOpen}
        setIsLimitModalOpen={setIsLimitModalOpen}
        setIsRefundModalOpen={setIsRefundModalOpen}
      />
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
    <div className='mt-10'>
      <DIYCartHome cartData={cartData} cartCount={cartCount} />
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
    </div>
  );
};

export default DIYCustomerAccount;