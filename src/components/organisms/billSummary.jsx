import React from 'react';
import { PriceText } from '../atoms/Price/PriceText';
import { Button } from '../atoms/Buttons/Button';
import { InfoText } from '../atoms/Info/InfoText';
import { Icon } from '../atoms/Icon/Icon';

const BillSummary = () => {
  return (
    <>
      <div className="mb-6 bg-white shadow-sm bill-summary-list">
        <h1 className='text-3xl font-bold'>Bill Summary</h1>
        <div className="border-b-2 border-[#faf9f9]">
          <div className="p-4">
            <PriceText amount={0.00} label="Total Balance Due" />
          </div>
        </div>
        <div className="border-b-2 border-[#faf9f9]">
          <div className="p-4">
            <PriceText amount={179.00} label="Recent Payments and Credits" />
          </div>
        </div>
        <div className="border-b-2 border-[#faf9f9]">
          <div className="p-4">
            <PriceText amount={179.00} label="Monthly Payment Due September 23, 2025" />
          </div>
        </div>
        <div>
          <Button onClick={''} variant="outline" size="md"> Recent Invoice </Button>
        </div>
      </div>
      <div className="mb-6 bg-white shadow-sm general-list">
        <div className="border-b-2 border-[#faf9f9]">
          <div className="p-4">
            <Icon type="success" className="text-gray-500 hover:text-gray-700" size={20} />
            <InfoText label="Automatic Payments" value="Yes" />
          </div>
          <div className="p-4">
            <InfoText label="CREDIT OR DEBIT CARD (AUTOMATIC PAYMENT)" value="(••••1111)" />
          </div>
        </div>
      </div>
      <div className="mb-6 bg-white shadow-sm invoice-history-list">
        <h1 className='text-3xl font-bold'>Invoice History</h1>
        <div className="border-b-2 border-[#faf9f9]">
          <div className="p-4">
            <InfoText
              label="September 23, 2025"
              value="Download"
              link="/path/to/invoice.pdf"
              billStatus="Current Bill"
            />
          </div>
        </div>
      </div>
      <div className="mb-6 bg-white shadow-sm payment-history">
        <h1 className='text-3xl font-bold'>Payment History</h1>
        <div className="border-b-2 border-[#faf9f9]">
          <div className="p-4">
            <PriceText amount={179.00} label="September 23, 2025" />
          </div>
        </div>
      </div>
    </>

  );
};

export default BillSummary;
