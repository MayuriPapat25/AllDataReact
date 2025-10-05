import React, { useState } from 'react';
import ProductCard from '../../molecules/ProductCard';
import { Car, MessageSquare, Plus, SquareArrowOutUpRightIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { InfoText } from '../../atoms/Info/InfoText';
import { Icon, MessageIcon, ProductIcon } from '../../atoms/Icon/Icon';
import { Button } from '../../atoms/Buttons/Button';
import AccountClosureModal from '../../molecules/AccountClosureModal';
import { LinkButton } from '../../atoms/links/linkButton';
import { AccessPointsModal } from '../../molecules/Modal/AccessPointsModal';
import SubscriptionManager from '../../molecules/SubscriptionManager';


const ProductsPortal = () => {

  const navigate = useNavigate();

  const [showAccessPointsModal, setShowAccessPointsModal] = useState(false);


  const productCards = [
    {
      id: "repair",
      title: "REPAIR",
      icon: <Car className="w-8 h-8" />,
      iconColor: "bg-blue-600 text-white",
      onClick: () => navigate('/repair'),
    },
    {
      id: "community",
      title: "COMMUNITY",
      icon: <MessageSquare className="w-8 h-8" />,
      iconColor: "bg-orange-500 text-white",
      onClick: () => console.log("Community clicked"),
    },
    {
      id: "find-fix",
      title: "FIND A FIX",
      icon: <Plus className="w-8 h-8" />,
      iconColor: "bg-gray-600 text-white",
      onClick: () => console.log("Find a fix clicked"),
    },
    {
      id: "estimator",
      title: "ESTIMATOR",
      icon: <Plus className="w-8 h-8" />,
      iconColor: "bg-gray-600 text-white",
      onClick: () => console.log("Estimator clicked"),
    },
    {
      id: "add-products",
      title: "ADD PRODUCTS",
      subtitle: "Shop Additional Products",
      icon: <Plus className="w-6 h-6" />,
      iconColor: "bg-transparent border-2 border-gray-400",
      isDashed: true,
      onClick: () => console.log("Add products clicked"),
    },
  ];

  const [cartItems, setCartItems] = useState([
    { id: "mobile", name: "Mobile", type: "mobile", price: 39.0, accessPoints: 1 },
    { id: "basic-diagnostics", name: "Basic Diagnostics", type: "diagnostics", price: 0.0, accessPoints: 1, isIncluded: true, includedWith: "Mobile" },
    { id: "repair", name: "Repair", type: "repair", price: 179.0, accessPoints: 1 },
    { id: "community", name: "Community", type: "community", price: 0.0, accessPoints: 1, isIncluded: true, includedWith: "Repair" },
    { id: "estimator", name: "Estimator", type: "estimator", price: 0.0, accessPoints: 1, isIncluded: true, includedWith: "Repair" },
  ]);

  const handleAccessPointChange = (itemId, newValue) => {
    setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, accessPoints: newValue } : item));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <main className="bg-gray-50">
        <div className="container mx-auto">
          <h1 className="">Active Products</h1>
          <ProductCard cards={productCards} />
        </div>
      </main>
      <h1 className='text-lg tracking-wide lg:mt-[-0.4375rem] lg:mb-5'>Your Subscription</h1>
      <div className="mb-6 bg-white shadow-sm general-list">
        <div className="border-b-2 border-[#faf9f9]">
          <div className="p-4">
            <InfoText label="Subscription Term" value="1 Year" />
          </div>
          <div className="p-4">
            <InfoText label="Auto Renewal Date" value="09/23/2026" />
          </div>
          <div className="p-4">
            <InfoText label="Invoice Frequency" value="Monthly" />
          </div>
        </div>
      </div>

      {/* Access Points Info */}
      <div className="mb-4 flex justify-end">
        <LinkButton
          size="sm"
          onClick={() => setShowAccessPointsModal(true)}
          className="flex items-center gap-1 font-normal text-[#282970]"
        >
          <MessageIcon type="info" className="w-4 h-4 text-[#282970]" />
          What are Access Points?
        </LinkButton>
      </div>

      {/*  Subscription Management */}
      <div className="mb-6 bg-white shadow-sm">
        <SubscriptionManager />
      </div>

      {/* Cancel Subscription */}
      <div className="mb-6 bg-white shadow-sm general-list ">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-auto py-3 px-4 text-left font-normal hover:bg-gray-50 flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300">
            <Icon type="remove" className="text-xl text-[#1b3e6f]" size={16} />
          </div>
          <span >Cancel Subscription</span>
        </Button>
        <AccountClosureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Requesting Account Closure" desc1="This request will not automatically cancel your subscription service(s)." desc2="An agent will follow up with you within 24-48 hours* after reviewing the terms of your agreement for eligibility." requiredMessage="*excluding weekends and holidays" />
      </div>

      <div className="mb-6 bg-white shadow-sm invoice-history-list">
        <div className="border-b-2 border-[#faf9f9]">
          <div className="p-4 flex items-center gap-1">
            <InfoText
              label="Legal agreements, sales contracts, and order confirmation emails"
              value="View"
              link="/"
            />
            <SquareArrowOutUpRightIcon size={16} className='text-blue-800' />
          </div>
        </div>
      </div>

      {/* Access Points Modal */}
      <AccessPointsModal
        isOpen={showAccessPointsModal}
        onClose={() => setShowAccessPointsModal(false)}
      />
    </>
  );
};

export default ProductsPortal;;